import { Subject, ConnectableObservable } from "rxjs";
import { MovieCharacter, starWarsObserver, starTrekObserver, movieCharacters$ } from "./fixtures";
import { filter, multicast, refCount, publish, share } from "rxjs/operators";

/**
 * **Multicasting - share**
 *
 * Using `publish(), refCount()` does clean things up considerably. But there are
 * still two problems:
 *
 * 1. It's still not *that* readable
 * 2. You can't retry or repeat because of the single, underlying subject instance.
 *
 * **Operators**
 *
 * - `share`
 *   A specialized multicast operator that is just like `publish(), refCount()`,
 *   except it will recycle the underlying subject in the event of an error or
 *   a completion, so it can be retried or repeated.
 *
 * NOTE:
 *
 * Do NOT use `share` or any sort of `refCount` with a synchronous source. It
 * doesn't do what you'd think, since it completes before the next subscription
 * can even be made.
 *
 * **TODO**
 *
 * - Use `share` to clean up the code below even more
 */

// WORKSHOP_START
const shared = movieCharacters$.pipe(
  publish(),
  refCount(),
);

shared.pipe(
  filter(character => character.universe === 'Star Wars')
).subscribe(starWarsObserver);

shared.pipe(
  filter(character => character.universe === 'Star Trek')
).subscribe(starTrekObserver);
// WORKSHOP_END

// FINAL_START
const shared = movieCharacters$.pipe(
  share(),
);

shared.pipe(
  filter(character => character.universe === 'Star Wars')
).subscribe(starWarsObserver);

shared.pipe(
  filter(character => character.universe === 'Star Trek')
).subscribe(starTrekObserver);
// FINAL_END
