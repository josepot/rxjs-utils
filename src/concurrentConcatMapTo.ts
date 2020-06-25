import { ObservableInput, Observable } from 'rxjs';
import sortedMergeMap from './concurrentConcatMap';

export default <Input, Output>(
  output: ObservableInput<Output>,
  nConcurrent = 1
) => (source$: Observable<Input>): Observable<Output> =>
  source$.pipe(sortedMergeMap(() => output, nConcurrent));
