import { Observable, from, ObservableInput } from 'rxjs';
import { concatMap, mergeAll, takeWhile, toArray } from 'rxjs/operators';

const concatUntilData = <T>() => (source: Observable<ObservableInput<T>>) =>
  source.pipe(
    concatMap(x => from(x).pipe(toArray())),
    takeWhile(x => x.length === 0, true),
    mergeAll()
  );

export default concatUntilData;
