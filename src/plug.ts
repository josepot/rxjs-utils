import { Subject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const plug = <T>(subject: Subject<T>) => {
  const next = subject.next.bind(subject) as any;
  const error = subject.error.bind(subject);
  const complete = subject.complete.bind(subject);
  return (source: Observable<T>): Observable<T> =>
    source.pipe(tap(next, error, complete));
};

export default plug;
