import { validStarWarsFilms$ } from "./fixtures";

/**
 * Okay, let's subscribe with the 4th, 5th, and 6th function arguments!
 *
 * Just kidding. More than a couple of arguments gets pretty gross.
 *
 * The RxJS Core Team recommends when you're subscribing with callbacks, you
 * only really use a single `nextHandler` callback, or `subscribe(nextHandler)`.
 * The other signatures get a little busy and hard to read.
 *
 * Fortunately, there's an API that makes this much better. `Observer`!
 *
 * Actually, `Observer` is the original, expected API. When you pass three
 * callbacks into `subscribe`, they are wrapped in an `Observer` for use
 * internally (also for other reasons and we'll get to that in a minute).
 *
 * This is the shape of an Observer:
 *
 * ```ts
 * interface Observer<T> {
 *  next?: (value: T) => void;
 *  error?: (err: any) => void;
 *  complete?: () => void;
 * }
 * ```
 * And you can subscribe like so:
 *
 * ```ts
 * someObservable$.subscribe(observer);
 * ```
 *
 * **NOTE**
 *
 * 1. Notice that _all of the methods are optional_. This means that if you just
 * want to pass a `nextHandler` and a `completeHandler` you can do so.
 * 2. Not providing an error method on the observer is the same as passing `null`
 * or undefined to as the `errorHandler` callback.
 *
 * **TODO:** 
 * Let's clean up our Star Wars code a bit:
 *
 * - Get rid of the useless `errorHandler`, we don't need it
 * - Use an observer to make the code more readable.
 */

validStarWarsFilms$.subscribe(
  x => console.log(x),
  err => console.log(err), // This isn't going to error, no worries.
  () => console.log('THE END'),
)

