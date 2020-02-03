import { merge, Observable, ObservableInput, from } from 'rxjs';
import { map } from 'rxjs/operators';

const mergeWithKey: <
  O extends { [P in keyof any]: ObservableInput<any> },
  OT extends {
    [K in keyof O]: O[K] extends ObservableInput<infer V>
      ? { key: K; value: V }
      : unknown;
  }
>(
  x: O
) => Observable<OT[keyof O]> = input =>
  merge(
    ...Object.entries(input).map(([key, stream]) =>
      from(stream).pipe(map(value => ({ key, value } as any)))
    )
  );

export default mergeWithKey;
