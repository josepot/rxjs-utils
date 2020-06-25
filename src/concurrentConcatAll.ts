import { Observable, ObservableInput } from 'rxjs';
import sortedMergeMap from './concurrentConcatMap';

const identity = <T>(x: T): T => x;
export default (nConcurrent = 1) => <T>(
  source$: Observable<ObservableInput<T>>
) => source$.pipe(sortedMergeMap(identity, nConcurrent));
