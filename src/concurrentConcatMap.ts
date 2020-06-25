import { defer, ObservableInput, Observable, Subscription } from 'rxjs';

const sortedMergeMap = <I, O>(
  mapper: (outterValue: I, index: number) => ObservableInput<O>,
  concurrent = 1
) => (source$: Observable<I>) =>
  new Observable<O>(observer => {
    const queues = new Map<number, Observable<O>>();
    const innerSubscriptions = new Map<number, Subscription>();
    const results = new Map<number, O[]>();

    let mapperIdx = 0;
    let subscriptionIdx = 0;
    let observerIdx = 0;

    const nextSubscription = () => {
      const inner$ = queues.get(subscriptionIdx);
      if (!inner$) return;
      const idx = subscriptionIdx++;
      queues.delete(idx);
      if (observerIdx !== idx) {
        results.set(idx, []);
      }
      innerSubscriptions.set(
        idx,
        inner$.subscribe({
          next(x) {
            if (observerIdx === idx) {
              observer.next(x);
            } else {
              results.get(idx)!.push(x);
            }
          },
          complete() {
            innerSubscriptions.delete(idx);
            if (idx === observerIdx) {
              observerIdx++;
              while (results.has(observerIdx)) {
                results.get(observerIdx)!.forEach(x => observer.next(x));
                results.delete(observerIdx);
                if (innerSubscriptions.has(observerIdx)) {
                  break;
                }
                observerIdx++;
              }
            }
            nextSubscription();
          },
          error(e) {
            observer.error(e);
          },
        })
      );
    };

    const topSubscription = source$.subscribe(outterValue => {
      const idx = mapperIdx++;
      queues.set(
        idx,
        defer(() => mapper(outterValue, idx))
      );
      if (innerSubscriptions.size < concurrent) {
        nextSubscription();
      }
    });

    return () => {
      topSubscription.unsubscribe();
      innerSubscriptions.forEach(subscription => subscription.unsubscribe());
      queues.clear();
      results.clear();
    };
  });

export default sortedMergeMap;
