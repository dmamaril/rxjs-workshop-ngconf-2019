import { Observable } from "rxjs";

/**
 * Teardown
 *
 * A key semantic in RxJS is guaranteed teardown of resources. Whenever a
 * subscription completes, errors, or is unsubscribed, RxJS will execute the
 * teardown that was provided when the subscription was initialized.
 *
 * The initialization function passed to the `new Observable` constructor has
 * an optional return value. In there you can return a function, `() => void`,
 * that will be called whenever the subscription ends, no matter how it ends.
 * Optionally, you can return a `Subscription` instance as a convenience.
 *
 * **TODO**
 *
 * Write a function that creates an `Observable<number>` that emits a counter
 * starting at `0` each specified period in milliseconds, like `0...1...2...etc`.
 *
 * (You're about to implement RxJS's `interval` function)
 */


 /**
  * Creates an observable of incrementing numbers, starting at 0, and emitted
  * every `t` milliseconds.
  * @param t The delay between emissions, in milliseconds
  */
 function myInterval(t: number) {
   // WORKSHOP_START
   // TODO: Implement.
   // WORKSHOP_END
   // FINAL_START
   return new Observable<number>(subscriber => {
     let i = 0;
     const id = setInterval(() => subscriber.next(i++), t);
     return () => clearInterval(id);
   })
   // FINAL_END
 }

 myInterval(1000).subscribe(x => console.log(x));
