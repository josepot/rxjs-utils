import { Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

const mapDistinct = <I, O>(
  mapper: (input: I) => O,
  compare?: (a: O, b: O) => boolean
) => (source: Observable<I>): Observable<O> =>
  source.pipe(map(mapper), distinctUntilChanged(compare));

export default mapDistinct;
