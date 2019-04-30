import { threeMenAndAnError$ } from "./fixtures";


/**
 * Oh no! An error is ruining a strange and beloved 80's film!
 *
 * How can we handle this error? `try/catch`?
 *
 * Well, they're arriving asynchronously, so no. But `RxJS` does provide a
 * second argument you can use to handle the error. This argument is called the
 * `errorHandler`. It gives you the error that terminated the `Observable`.
 *
 * **NOTE**: When an observable emits an error, it's done. It cannot emit any
 * more values. More on that in a bit.
 *
 * **NOTE**: Any error that reaches the `subscribe` call in RxJS, when there is
 * _not_ an `errorHandler` is treated as an "unhandled error". An unhandled error
 * in RxJS 6 and higher will be rethrown on its own callstack so they can
 * be handled in `window.onerror` in the browser or `process.on('error')` in
 * node.
 * 
 * **TODO**
 * Add error handling to this subscription. Log the error message.
 */

threeMenAndAnError$.subscribe(
  x => console.log(x),
  err => console.log(err.message),
)
