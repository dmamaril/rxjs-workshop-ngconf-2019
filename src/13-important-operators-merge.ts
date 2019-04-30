import { of, merge } from "rxjs";
import { a$, b$, c$, consoleMarbles } from "./fixtures";
import { mergeAll, mergeMap } from "rxjs/operators";

/**
 * Flattening with merge
 *
 * Observables are sets of values, and like many other types of sets (such as Arrays),
 * they can "contain" themselves. Consider an array: `[[1, 2], [3, 4]]`. We could
 * "flatten" that array to `[1, 2, 3, 4]`. An observable can similarly be "flattened".
 *
 * The tricky part is, unlike arrays, observables have the dimension of time passing,
 * that means that there are more ways to flatten than just one or two.
 *
 * **Merge**
 *
 * Merging is the simplest form of flattening. You're subscribing to all observables,
 * as soon as you can, and merging their values into one result stream.
 *
 * - `mergeAll`
 *    An operator that takes each observable emitted from the source, and subscribes to
 *    it, merging the values from each subscription into the resulting observable stream.
 * - `mergeMap(fn)`
 *    Effectively just `map(fn), mergeAll()`. Maps values to an observable,
 *    then "merges them".
 *
 * (related)
 * - `merge`
 *    A static function for creating an observable by merging more than one observable
 *    together. (Basically `of(...observables).pipe(mergeAll())`)
 *
 *
 * **TODO**
 *
 * - Flatten the observables `a$`, `b$`, and `c$` together!
 * - Try different approaches.
 */

// FINAL_START
of(a$, b$, c$).pipe(
  mergeAll(),
)
.subscribe(consoleMarbles());
// FINAL_END


