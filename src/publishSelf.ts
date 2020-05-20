import { Observable, Subject } from 'rxjs';

const publishSelf = <T>(
  creator: (self$: Observable<T>) => Observable<T>
): Observable<T> =>
  new Observable<T>(subscriber => {
    const self = new Subject<T>();

    let queue: T[] = [];
    let scheduleToken: NodeJS.Timeout | null = null;
    const flashValues = () => {
      scheduleToken = null;
      const toFlash = queue;
      queue = [];
      for (let i = 0; i < toFlash.length; i++) {
        const value = toFlash[i];
        subscriber.next(value);
        self.next(value);
      }
    };

    return creator(self)
      .subscribe({
        next(value) {
          queue.push(value);
          if (scheduleToken === null) {
            scheduleToken = setTimeout(flashValues, 0);
          }
        },
        error(e) {
          subscriber.error(e);
          self.error(e);
        },
        complete() {
          subscriber.complete();
          self.complete();
        },
      })
      .add(() => {
        self.complete();
      });
  });

export default publishSelf;
