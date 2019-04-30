import { threeAmigos$ } from "./fixtures";

// `data$` is an observable stream of 10 numbers.


/**
 * The first thing that happens to every new RxJS user is they encounter some
 * API that gives them an `Observable`, and they need to know how to consume it.
 *
 * I know this seems boring, but there's a little bit of nuance here. First off,
 * let's start by subscribing to an observable the most common way you'll find
 * subscriptions in the wild: With a single callback. This callback can be referred
 * to as the `nextHandler`.
 *
 * TODO: Subscribe to the `threeAmigos$` observable using a single callback.
 *
 * This is the most common way that people subscribe to an observable.
 *
 * You should see the following output:
 *
 * ```sh
 * Lucky Day
 * Ned Nederlander
 * Dusty Bottoms
 * ```
 * 
 * **TODO**
 * Subscribe to `$threeAmigos` with a single callback.
 */

// Subscribe using a callback
threeAmigos$.subscribe(
  x => console.log(x),
);
