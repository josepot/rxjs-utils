import { Observable, merge } from 'rxjs';
import { takeLast, takeUntil, publish } from 'rxjs/operators';

export const mergeWhileActive = <S, E>(input$: Observable<E>) => (
  source$: Observable<S>
) =>
  source$.pipe(
    publish(multicasted$ =>
      merge(
        multicasted$,
        input$.pipe(takeUntil(multicasted$.pipe(takeLast(1))))
      )
    )
  );

export default mergeWhileActive;
