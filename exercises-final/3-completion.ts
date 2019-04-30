import { validStarWarsFilms$ } from "./fixtures";

/**
 * All good things must (okay, will probably) come to an end.
 *
 * Errors are the only thing that will stop an `Observable`, observables can
 * also notify the consuming code that they are done.
 *
 * Below we're logging all of the names of good Star Wars films, your task is
 * to punctuate that list. Maybe you think there are more? Log those (manually).
 * Maybe you think the first three and that's it? Log "THE END".
 *
 * Lucky for you, the API provides a `completeCallback` that you can use to
 * handle the event emitted to tell you that the observable is done sending
 * values without error. It's the third argument to `subscribe`.
 *
 * **NOTE** If you pass `null` or `undefined` to `errorHandler`, it will treat
 * any emitted error as an unhandled error, which we mentioned in the previous
 * exercise.
 * 
 * **TODO**
 * Add a complete handler and log whatever you like.
 */

validStarWarsFilms$.subscribe(
  x => console.log(x),
  err => console.log(err), // This isn't going to error, no worries.
  () => console.log('THE END'),
)
