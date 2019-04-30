import { intergalacticPhoneCall } from "./fixtures";

/**
 * If you are dealing with an API that expects a promise, and you want to
 * narrow down your observable to a single value, or you perhaps have an
 * observable of a single value, such as an HTTP request, you can use
 * `Observable.toPromise`.
 *
 * The most common API you might see that expects a promise is `async/await`.
 *
 * **NOTES**
 * - Promises cannot be cancelled, therefore `toPromise` cannot be cancelled
 *  (yet*) ;)
 * - Causes subscription.
 *
 * **WARNING**
 * - Do NOT use `toPromise` with a never-ending observable. This will result in
 *  no values, and a promise that never resolves.
 * - Do NOT use this as a crutch for subscribing to HTTP-based observables, you
 *  will gain little in doing so, but forgo cancellation.
 *
 * **TODO**
 * Help E.T. phone home, use the `intergalacticPhoneCall` function to make a
 * call back to his mom and dad.
 */


async function execute() {
  console.log('E.T. phone home...');

  // FINAL_START
  const message = await intergalacticPhoneCall('Hello there!').toPromise();
  // FINAL_END

  console.log(message);
}

execute();
