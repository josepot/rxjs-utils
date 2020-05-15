import { Observable, SchedulerLike } from 'rxjs';
import mergeWithKey from './mergeWithKey';
import scanWithStartingValue from './scanWithStartingValue';

type ObservableReducer<A, C> = [Observable<C>, (acc: A, current: C) => A];

export interface MergeWithReducers {
  <A, T1>(
    seedValue: A,
    a: ObservableReducer<A, T1>,
    concurrent?: number,
    scheduler?: SchedulerLike
  ): Observable<A>;
  <A, T1, T2>(
    seedValue: A,
    a: ObservableReducer<A, T1>,
    b: ObservableReducer<A, T2>,
    concurrent?: number,
    scheduler?: SchedulerLike
  ): Observable<A>;
  <A, T1, T2, T3>(
    seedValue: A,
    a: ObservableReducer<A, T1>,
    b: ObservableReducer<A, T2>,
    c: ObservableReducer<A, T3>,
    concurrent?: number,
    scheduler?: SchedulerLike
  ): Observable<A>;
  <A, T1, T2, T3, T4>(
    seedValue: A,
    a: ObservableReducer<A, T1>,
    b: ObservableReducer<A, T2>,
    c: ObservableReducer<A, T3>,
    d: ObservableReducer<A, T4>,
    concurrent?: number,
    scheduler?: SchedulerLike
  ): Observable<A>;
  <A, T1, T2, T3, T4, T5>(
    seedValue: A,
    a: ObservableReducer<A, T1>,
    b: ObservableReducer<A, T2>,
    c: ObservableReducer<A, T3>,
    d: ObservableReducer<A, T4>,
    e: ObservableReducer<A, T5>,
    concurrent?: number,
    scheduler?: SchedulerLike
  ): Observable<A>;
  <A, T1, T2, T3, T4, T5, T6>(
    seedValue: A,
    a: ObservableReducer<A, T1>,
    b: ObservableReducer<A, T2>,
    c: ObservableReducer<A, T3>,
    d: ObservableReducer<A, T4>,
    e: ObservableReducer<A, T5>,
    f: ObservableReducer<A, T6>,
    concurrent?: number,
    scheduler?: SchedulerLike
  ): Observable<A>;
  <A, T1, T2, T3, T4, T5, T6, T7>(
    seedValue: A,
    a: ObservableReducer<A, T1>,
    b: ObservableReducer<A, T2>,
    c: ObservableReducer<A, T3>,
    d: ObservableReducer<A, T4>,
    e: ObservableReducer<A, T5>,
    f: ObservableReducer<A, T6>,
    g: ObservableReducer<A, T7>,
    concurrent?: number,
    scheduler?: SchedulerLike
  ): Observable<A>;
}

export const mergeWithReducers: MergeWithReducers = <A>(
  seed: A,
  ...args: any[]
) => {
  const nOptionalArgs = Array.isArray(args[args.length - 1])
    ? 0
    : Array.isArray(args[args.length - 2])
    ? 1
    : 2;
  const nTuples = args.length - nOptionalArgs;

  const tuples: ObservableReducer<A, any>[] = args.slice(0, nTuples);
  const optionalArgs = args.slice(nTuples);

  return mergeWithKey(
    tuples.map(([source]) => source) as Record<number, Observable<any>>,
    ...optionalArgs
  ).pipe(
    scanWithStartingValue(
      (acc, { type, payload }) => tuples[type][1](acc, payload),
      seed
    )
  );
};
