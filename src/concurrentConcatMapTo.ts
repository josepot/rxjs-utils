import { ObservableInput, Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import concurrentConcatAll from './concurrentConcatAll';

export default <Input, Output>(
  output: ObservableInput<Output>,
  nConcurrent = 1
) => (source$: Observable<Input>): Observable<Output> =>
  source$.pipe(mapTo(output), concurrentConcatAll(nConcurrent));
