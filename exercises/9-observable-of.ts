import { of } from "rxjs";

/**
 * Congratulations! In the previous exercise, you basically implemented
 * RxJS's `of` function.
 *
 * `of()` is an `Observable` creation function. It's primary purpose is a
 * convenience method for making a value into an `Observable`. Very similar to
 * `Promise.resolve()`.
 *
 * `of` returns an observable that will synchronously emit the values passed in,
 * then complete.
 *
 * **TODO**
 * Try it out. Emit a few values with `of()`. Be sure to log when it completes
 * so you can see how it behaves.
 */

 console.log('start');
 // TODO: Create an observable of values here and log it out, including completion.
 console.log('end');

 /**
  * **FUN FACT**: The name `of` is sort of annoying to people, but where does it
  * come from? It used to be a static method on `Observable`, called
  * `Observable.of`. In RxJS version 5, it was implemented in such a way that
  * it could be patched on and off of `Observable` in order to help keep size
  * down. But it was later discovered that this sort of patching wasn't
  * compatible with tree-shaking bundlers like Rollup and Webpack. It was also
  * shown to be a bad practice for other reasons (trampling, etc). So we started
  * recommending people use `of` directly from the module was created it.
  *
  * It remains `of` to this day despite some very split debate on the matter.
  *
  * A common alias for `of` is `import { of as observableOf } from 'rxjs';`
  */
