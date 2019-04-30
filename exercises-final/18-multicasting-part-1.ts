import { Subject, ConnectableObservable } from "rxjs";
import { MovieCharacter, starWarsObserver, starTrekObserver, movieCharacters$ } from "./fixtures";
import { filter, multicast } from "rxjs/operators";

/**
 * **Multicasting**
 *
 * There are many ways to accomplish multicasting in RxJS, but they all use
 * `Subject` or its brethren, `BehaviorSubject`, `ReplaySubject`, or `AsyncSubject`
 * under the hood.
 *
 * **Operators**
 *
 * - `multicast(subject)`
 *   Effectively the same as what we did in the last exercise. All subscriptions
 *   to the result actually subscribe to the `subject` passed in. Returns a
 *   `ConnectableObservable`. When you call `ConnectableObservable.connect()`,
 *   it subscribes the source observable to that subject, and returns the
 *   subscription.
 *
 * NOTE:
 *
 * Using `ConnectableObservable` with `pipe` is a little gross in TypeScript.
 * You will need to cast `source$.pipe(multicast(subject)) as ConnectableObservable<T>`
 * in order to call `connect`. It's a quirk of the type system. Hopefully improvements
 * are coming soon. :)
 *
 * **TODO**
 *
 * - Use `multicast` to clean up the code below
 */


const subject = new Subject<MovieCharacter>();

const shared = movieCharacters$.pipe(
  multicast(subject)
) as ConnectableObservable<MovieCharacter>;

shared.pipe(
  filter(character => character.universe === 'Star Wars')
).subscribe(starWarsObserver);

shared.pipe(
  filter(character => character.universe === 'Star Trek')
).subscribe(starTrekObserver);

shared.connect();
