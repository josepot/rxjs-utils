import { Observable } from 'rxjs';

export { default as mergeWithKey } from './mergeWithKey';
export { default as concatUntilData } from './concatUntilData';
export { default as concatMapUntilData } from './concatMapUntilData';
export { default as continuousGroupBy } from './continuousGroupBy';
export { default as scanWithStartingValue } from './scanWithStartingValue';
export { default as filterNonFalsy } from './filterNonFalsy';
export { default as mergeWhileActive } from './mergeWhileActive';
export { default as mapDistinct } from './mapDistinct';
export { default as recursiveObservable } from './recursive-observable';
export { default as groupInMap } from './group-in-map';
export { default as concurrentConcatAll } from './concurrentConcatAll';
export { default as concurrentConcatMap } from './concurrentConcatMap';
export * from './mergeWithReducers';

export type ObservableType<T> = T extends Observable<infer R> ? R : never;
