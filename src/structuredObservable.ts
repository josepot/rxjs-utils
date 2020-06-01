import { Observable, ObservableInput, SchedulerLike } from 'rxjs';
import mergeWithKey from './mergeWithKey';
import scanWithStartingValue from './scanWithStartingValue';

const structuredObservable: <
  O extends { [P in keyof any]: ObservableInput<any> },
  OT extends {
    [K in keyof O]: O[K] extends ObservableInput<infer V> ? V : unknown;
  }
>(
  x: O,
  concurrent?: number,
  scheduler?: SchedulerLike
) => Observable<Partial<OT>> = (x, concurrent, scheduler) =>
  mergeWithKey(x, concurrent, scheduler).pipe(
    scanWithStartingValue<any, any>(
      (acc, { type, payload }) => ({ ...acc, [type]: payload }),
      {}
    )
  );

export default structuredObservable;
