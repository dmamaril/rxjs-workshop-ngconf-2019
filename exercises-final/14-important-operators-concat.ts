import { of, concat } from "rxjs";
import { a$, b$, c$, consoleMarbles } from "./fixtures";
import { concatAll, concatMap } from "rxjs/operators";

/**
 * **Concat**
 *
 * Concatenating observables! Observables are sets that have an end. Basically,
 * "complete" is the same as the closing bracket `]` of an Array. We know that's
 * where the stream stops. You can concat observables by playing them one at a time,
 * back to back.
 *
 * - `concatAll`
 *    An operator that takes each observable emitted from the source, saves it, and
 *    subscribes to each one, one at a time, waiting for each one to complete before
 *    moving to the next.
 * - `concatMap(fn)`
 *    Effectively just `map(fn), concatAll()`. Maps values to an observable,
 *    then concatenate them.
 *
 * (related)
 * - `concat`
 *    A static function for creating an observable by concatenating more than one
 *    observable together. (Basically `of(...observables).pipe(concatAll())`)
 *
 *
 * **TODO**
 *
 * - Play the observables `a$`, `b$`, and `c$` back to back!
 * - Try different approaches.
 *
 */

of(a$, b$, c$).pipe(
  concatAll(),
)
.subscribe(consoleMarbles());



