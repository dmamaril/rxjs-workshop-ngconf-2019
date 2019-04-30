import { from } from "rxjs";

/**
 * Conversions with `from`
 *
 * The history behind the name of `from` is identical to the history you learned
 * in the exercise about `of`. It used to be `Observable.from`, and its use
 * really wasn't too different from `Array.from`. The idea was to take types
 * that could be converted into an observable, and convert them into an observable.
 *
 * **What can be converted with `from`?**
 *
 * - Arrays
 * - Promises
 * - Other observables
 * - Iterables
 * - (and soon) AsyncIterable
 *
 * It's pretty straight forward. Pass any of these types to `from` and get an
 * observable of values from that type.
 *
 * **NOTE**
 * - It cannot make a `Promise` lazy! Promises are eager, by the time you
 * have a reference to one, the work is already underway.
 * - The returned observable will process values as quickly as it can. That
 * means for an Array or an Iterable, it will loop and next all of those
 * synchronously, as fast as it can. In the case of promises (and eventually
 * AsyncIterator), those forks scheduling until the next tick.
 *
 * **TODO**
 * - Try using `from` with a variety of sources.
 * - What happens if the promise rejects? Or when the iterable throws?
 */


const happyPromise = Promise.resolve('Hi!');
const sadPromise = Promise.reject(':(');

const numbersIterable = (function*() {
  for (let i = 0; i < 10; i++) {
    yield i;
  }
}());

const fruityArray = ['apples', 'oranges', 'bananas'];

// TODO: Try it out below.
from(happyPromise).subscribe(console.log);

from(sadPromise).subscribe({
    error: console.error
});

from(fruityArray).subscribe(console.log);

from(numbersIterable).subscribe(console.log);