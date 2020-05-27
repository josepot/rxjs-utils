import { defer, Observable, Subject } from 'rxjs';
import { delay, finalize, publish, takeUntil } from 'rxjs/operators';

const mirror = <T>(
  creator: () => Observable<T>,
  enhancer?: (source: Observable<T>) => Observable<T>
): [Observable<T>, Observable<T>] => {
  const mirrored$ = new Subject<T>();
  const done$ = new Subject();
  const result$ = defer(creator).pipe(
    publish(multicasted$ => {
      multicasted$.pipe(takeUntil(done$), delay(0)).subscribe(mirrored$);
      return multicasted$;
    }),
    finalize(() => done$.next())
  );

  return [enhancer ? enhancer(result$) : result$, mirrored$.asObservable()];
};

export default mirror;
