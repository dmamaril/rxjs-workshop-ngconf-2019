import {interval} from "rxjs";
import {switchMap} from "rxjs/operators";

/**
 * **Switching**
 *
 * The idea of switching is to "flatten" one observable at a time, but when you get
 * a new observable to flatten, you interrupt the previous one, even if it's not done.
 * This interruption is done via an internal unsubscribe.
 *
 * This is useful when you want teardown resources and start a new stream.
 *
 * - `switchAll`
 *    An operator that waits for new observables, subscribes to each one immediately,
 *    and unsubscribes from whatever previous one it had running if any.
 * - `switchMap(fn)`
 *    Effectively just `map(fn), switchAll()`. Maps values to an observable,
 *    then switches to it.
 *
 * NOTE: There is no static version of switching. It doesn't make sense, if you
 * synchronously switched a series of observables, you'd just take the last one.
 *
 * **TODO**
 *
 * Create an `interval` that emits ~3 times a second, and interrupt it with a
 * new interval every second.
 *
 * Output should look like:
 *
 * 0
 * 1
 * 2
 * 0
 * 1
 * 2
 * ...
 *
 */

interval(1000)
    .pipe(switchMap(() => interval(333)))
    .subscribe(console.log);
