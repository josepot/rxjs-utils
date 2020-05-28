import {
  SchedulerLike,
  Observable,
  Subject,
  asapScheduler,
  MonoTypeOperatorFunction,
} from 'rxjs';
import { observeOn, share, tap } from 'rxjs/operators';

const recursiveObservable = <T>(
  scheduler: SchedulerLike = asapScheduler
): [Observable<T>, () => MonoTypeOperatorFunction<T>] => {
  const mirrored$ = new Subject<T>();
  return [
    mirrored$.pipe(observeOn(scheduler), share()),
    () => tap(mirrored$) as MonoTypeOperatorFunction<T>,
  ];
};

export default recursiveObservable;
