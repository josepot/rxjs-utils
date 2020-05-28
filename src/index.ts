import { Observable } from 'rxjs';

export { default as mergeWithKey } from './mergeWithKey';
export { default as concatUntilData } from './concatUntilData';
export { default as concatMapUntilData } from './concatMapUntilData';
export { default as continuousGroupBy } from './continuousGroupBy';
export { default as scanWithStartingValue } from './scanWithStartingValue';
export { default as filterNonFalsy } from './filterNonFalsy';
export { default as plug } from './plug';
export { default as mergeWhileActive } from './mergeWhileActive';
export { default as mapDistinct } from './mapDistinct';
export { default as recursiveObservable } from './recursive-observable';
export * from './mergeWithReducers';

export type ObservableType<T> = T extends Observable<infer R> ? R : never;
