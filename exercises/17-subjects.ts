import { movieCharacters$, starWarsObserver, starTrekObserver, MovieCharacter } from "./fixtures";
import { Subject } from "rxjs";
import {filter, switchMap} from "rxjs/operators";

/**
 * **Subjects**
 *
 * The primary purpose of subjects in RxJS is multicasting. That is, taking
 * individual values and sending them to many observers.
 *
 * In general, there are two roles in the observable pipeline:
 *
 * 1. Producer - the thing that is creating values and is calling `next` on the
 *               observer it was provided.
 * 2. Consumer - the code that set up the observer (or callbacks) and passed it
 *               to `subscribe` triggering the producer to connect to the observer.
 *
 * In most observables that relationships is 1:1, or "unicast". Meaning for every
 * consumer subscription there is one producer dedicated to sending values to it.
 *
 * Problems arise when the producer is an "expensive" resource. Perhaps it is an
 * HTTP request, or a WebSocket, etc. Perhaps subscribing to the observable creates
 * side-effects and you only want them to happen once, no matter how many subscriptions
 * there are. Either way, what you want to do is "multicast".
 *
 * This is what Subjects are for. Subjects are observables, but when you subscribe
 * to them, they take your subscriber and add it to an internal list of subscribers.
 * Subjects are _also_ Observers, but when you call `Subject.next(value)`, it will
 * forward that nexted value along to all subscribers in it's internal list. This
 * is true for `Subject.error` and `Subject.complete` as well.
 *
 * Subjects themselves provide the same guarantees as subscribers. You can't
 * call `next` after `complete` or `error` have been called. Which means that
 * a Subject that has been errored is effectively "dead".
 *
 * **NOTE**:
 *
 * There is an additional use case for subjects in Angular, React, et al. Subjects
 * provide an method for imperatively creating an Observable. Many frameworks, like
 * React and Angular, only allow one handler to be applied to an event. Subjects can
 * be used to push events into an Observable.
 *
 * Angular:
 * ```html
 * <button (click)="subject.next($event)">click me</button>
 * ```
 *
 * React:
 * ```js
 * <button onClick={(e) => subject.next(e)}>click me</button>
 * ```
 *
 * **TODO**
 *
 * Fix the code below!
 *
 * - Take the stream of `movieCharacters$` and notify both `starWarsObserver` and
 *   `starTrekObserver` of the appropriate characters.
 * - DO NOT subscribe to `movieCharacters$` twice, or it will error. :)
 *
 * HINTS:
 *
 * - There is a `MovieCharacter` type you can use to properly type your `Subject`.
 */

// movieCharacters$.subscribe(starWarsObserver);
// movieCharacters$.subscribe(starTrekObserver);

const subject = new Subject<MovieCharacter>();

// subject
//     .pipe(filter(character => character.universe === 'Star Wars'))
//     .subscribe(starWarsObserver);
//
// subject
//     .pipe(filter(character => character.universe === 'Star Trek'))
//     .subscribe(starTrekObserver);

subject.subscribe(character => {
    character.universe === "Star Wars"
        ? starWarsObserver.next(character)
        : starTrekObserver.next(character);
});

movieCharacters$.subscribe(subject);
