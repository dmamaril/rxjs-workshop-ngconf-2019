import { Subject, ConnectableObservable } from "rxjs";
import { MovieCharacter, starWarsObserver, starTrekObserver, movieCharacters$ } from "./fixtures";
import { filter, multicast, refCount, publish } from "rxjs/operators";

/**
 * **Multicasting - Part 2**
 *
 * Well, actually, maybe using `multicast` there made the code a little harder to
 * follow. That `connect` business is a little cumbersome, we like it when
 * observables just start when you `subscribe`!
 *
 * **Operators**
 *
 * - `publish`
 *   Really just an alias for `multicast(new Subject())`. Makes things a little
 *   shorter.
 *
 * - `refCount`
 *   You can only really use this operator on a `ConnectableObservable`. It keeps
 *   an internal count of the number of subscriptions to it. If the number goes
 *   up to `1`, it calls `connect()` for you automatically. If the number drops
 *   back down to `0`, it disconnects for you.
 *
 * NOTE:
 *
 * Since it's using the same `subject` instance forever, once it's completed or
 * errored, it can never be repeated or retried, because that subject is dead.
 *
 * **TODO**
 *
 * - Use `publish` and `refCount` to clean up the code below even more
 */

// WORKSHOP_START
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
// WORKSHOP_END

// FINAL_START
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
// FINAL_END
