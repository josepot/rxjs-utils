import { Observable, Subscription } from 'rxjs';
import { toArray } from 'rxjs/operators';

export default (nConcurrent = 1) => <T>(source$: Observable<Observable<T>>) =>
  new Observable<T>(subscriber => {
    const queue = new Map<number, Observable<T>>();
    const innerSubscriptions = new Map<number, Subscription>();
    const results = new Map<number, T[]>();

    let nextIdx = 0;
    let nextToDeliver = 0;
    let nextSubscriptionIdx = 0;

    const deliver = () => {
      while (results.has(nextToDeliver)) {
        results.get(nextToDeliver)!.forEach(x => subscriber.next(x));
        results.delete(nextToDeliver++);
      }
    };

    const pop = () => {
      const inner$ = queue.get(nextSubscriptionIdx);
      if (!inner$) return;
      const idx = nextSubscriptionIdx++;
      queue.delete(idx);
      innerSubscriptions.set(
        idx,
        inner$.pipe(toArray()).subscribe({
          next(x) {
            innerSubscriptions.delete(idx);
            results.set(idx, x);
            pop();
            deliver();
          },
          error(e) {
            subscriber.error(e);
          },
        })
      );
    };

    return source$
      .subscribe(inner$ => {
        const idx = nextIdx++;
        queue.set(idx, inner$);
        if (innerSubscriptions.size < nConcurrent) {
          pop();
        }
      })
      .add(() => {
        innerSubscriptions.forEach(subscription => subscription.unsubscribe());
      });
  });
