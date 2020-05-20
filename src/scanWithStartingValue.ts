import { Observable } from 'rxjs';
import { scan, startWith, distinctUntilChanged } from 'rxjs/operators';

const scanWithStartingValue = <I, O>(
  accumulator: (acc: O, current: I) => O,
  seed: O
) => (source: Observable<I>) =>
  source.pipe(scan(accumulator, seed), startWith(seed), distinctUntilChanged());

export default scanWithStartingValue;
