import { Observable } from 'rxjs';

export { default as mergeWithKey } from './mergeWithKey';
export { default as concatUntilData } from './concatUntilData';
export { default as concatMapUntilData } from './concatMapUntilData';
export { default as continuousGroupBy } from './continuousGroupBy';
export { default as scanWithStartingValue } from './scanWithStartingValue';
export { default as filterNonFalsy } from './filterNonFalsy';

export type ObservableType<T> = T extends Observable<infer R> ? R : never;
