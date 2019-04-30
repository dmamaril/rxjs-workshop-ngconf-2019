import { theSongThatNeverEnds$ } from "./fixtures";
import { timer } from "rxjs";
import { takeUntil } from "rxjs/operators";

/**
 * **takeUntil**
 *
 * Earlier we discussed `Subscription` and how consuming code can call
 * `unsubscribe()` in order to tell an observable stream to stop sending
 * values and tear down its resources. There is another way to give
 * consumers this control that its more declarative by using `takeUntil`.
 *
 * `a$.takeUntil(b$)`
 * takes all values from `a$` until it gets _one_ value from `b$`.
 * https://rxjs.dev/api/operators/takeUntil
 *
 * **TODO**
 * - Stop the stream of values after 2 seconds
 *
 * NOTE: As opposed to calling unsubscribe(), in the case of takeUntil,
 *       the complete handler is called. (You'll see "done").
 *
 * This can be used as an alternative to keeping subscription references.
 */


theSongThatNeverEnds$
// FINAL_START
.pipe(takeUntil(timer(2000)))
// FINAL_END
.subscribe({
  next: x => console.log(x),
  complete: () => console.log('done'),
});
