import { Observable, ObservableInput } from 'rxjs';
import { map } from 'rxjs/operators';
import concatUntilData from './concatUntilData';

const concatMapUntilData = <I, O>(
  mapFn: (x: I, i: number) => ObservableInput<O>
) => (source: Observable<I>): Observable<O> =>
  source.pipe(map(mapFn), concatUntilData());

export default concatMapUntilData;
