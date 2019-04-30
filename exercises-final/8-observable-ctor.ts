import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

/**
 * Creating a new observable
 *
 * Another common task people can have is they need to create an observable from
 * some new information source. To do this we use `new Observable()` aka the
 * `Observable` constructor. This takes one argument, which is a function that
 * is _executed when `subscribe` is called_. We refer to this as the initialization
 * function. When it's called, it gives you a type of `Observer`, the same
 * interface we talked about earlier, called a `Subscriber`.
 *
 * `Subscriber` is interesting, because besides having the same `next`, `error`,
 * and `complete` methods on it that `Observer` does, it also has a `closed`
 * property. This is a property that is linked to the state of the underlying
 * `Subscription`. The same `Subscription` that is returned when you call
 * `subscribe` on the observable instance.
 *
 * When consuming code calls `subscribe`, the callbacks or observer passed in
 * are wrapped in this `Subscriber` instance. Calling `next` on this instance
 * will forward the value along to your next callback or observer next method.
 * Same for `error` and `complete` forwarding to their counterparts.
 *
 * `Subscriber` is effectively the union point of `Observer` and `Subscription`.
 *
 * **Subscriber guarantees**
 * 1. Calling `next`, `error`, or `complete` on a `closed` subscriber is a _noop_.
 * 2. Calling `error` will mark the subscriber `closed`.
 * 3. Calling `complete` will mark the subscriber `closed`.
 * 4. Calling `unsubscribe` on the related `Subscription` will mark the subscriber
 *  `closed`.
 *
 * Effectively, a subscriber that has errored, completed, or been unsubscribed by
 * consuming code is _dead_ and can never be used again.
 *
 * **TODO**
 *
 * Create a function that takes a series of values and returns an `Observable`
 * that emits them, then completes.
 *
 * **BONUS**
 *
 * What do you think you'd need to do if you passed 100,000 arguments to it, but
 * you had a `take(5)` operator on it? How do you stop if from trying to next?
 */


function emitSomeValues<T>(...values: T[]): Observable<T> {
  return new Observable<T>(subscriber => {
    for (let i = 0; i < values.length && !subscriber.closed; i++) {
      subscriber.next(values[i]);
    }
    subscriber.complete();
  });
}


const source$ =
  emitSomeValues('dogs', 'and', 'cats', 'living together', 'mass hysteria!');

source$.subscribe({
  next: x => console.log(x),
  complete: () => console.log('done'),
});
