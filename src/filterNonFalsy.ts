import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

type Diff<T, U> = T extends U ? never : T;
export default function filterNonFalsy<T>(): (
  x: Observable<T>
) => Observable<Diff<T, null | undefined | false | 0 | 0n | ''>> {
  return filter(Boolean as any);
}
