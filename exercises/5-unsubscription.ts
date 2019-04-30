import { theSongThatNeverEnds$ } from "./fixtures";

/**
 * Make it stop!
 *
 * Oh no! You've gotten an observable that will _never end_! If we leave this
 * thing running it will use precious resources forever and ever!
 *
 * Let's stop our subscription to this observable by notifying it that we no
 * longer are interested in its output, telling it to tear down any resources
 * it is consuming.
 *
 * We can do this by calling `unsubscribe` on the `Subscription` that is returned
 * when we subscribe to our observable.
 *
 * **NOTE**
 * - The complete handler below is _not_ being called. This is by design.
 *   Completion is only signalled when whatever is producing the data decides
 *   on its own that it is done producing values without error.
 *
 * **TODO**
 * 
 * Use a `setTimeout` and stop this observable when you've had enough. Maybe after 5 seconds?
 * 
 */


theSongThatNeverEnds$.subscribe({
  next: x => console.log(x),
  complete: () => console.log('The song ended on its own.'),
});

