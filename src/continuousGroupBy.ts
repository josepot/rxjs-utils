import { Observable, Subject, GroupedObservable } from 'rxjs';

const continuousGroupBy = <I, O>(mapper: (x: I) => O) => (
  stream: Observable<I>
) =>
  new Observable<GroupedObservable<O, I>>(subscriber => {
    const groups: Map<O, Subject<I>> = new Map();
    return stream.subscribe(x => {
      const key = mapper(x);
      if (!groups.has(key)) {
        const innerSubject = new Subject<I>();
        const innerStream = new Observable<I>(innerSubscriber => {
          innerSubscriber.next(x);
          return innerSubject
            .subscribe(innerSubscriber)
            .add(() => groups.delete(key));
        }) as GroupedObservable<O, I>;
        groups.set(key, innerSubject);
        innerStream.key = key;
        subscriber.next(innerStream);
      } else {
        groups.get(key)!.next(x);
      }
    });
  });

export default continuousGroupBy;
