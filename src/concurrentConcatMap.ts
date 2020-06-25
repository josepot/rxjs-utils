import { ObservableInput, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import concurrentConcatAll from './concurrentConcatAll';

export default <Input, Output>(
  mapper: (x: Input) => ObservableInput<Output>,
  nConcurrent = 1
) => (source$: Observable<Input>): Observable<Output> =>
  source$.pipe(map(mapper), concurrentConcatAll(nConcurrent));
