import { threeMenAndAnError$, threeAmigos$ } from "./fixtures";

/**
 * RxJS provides another way to subscribe that is specifically designed for
 * consumption within `async/await`. The `Observable` class has a `forEach`
 * method that takes a `nextHandler`, just like the one in `subscribe`,
 * but instead of returning a `Subscription`, it returns a `Promise<void>` that
 * will resolve with the Observable completes successfully, and will reject
 * if any error occurs. Even if in the `nextHandler`.
 *
 * **NOTE**
 *
 * - `forEach` is a non-cancellable way to subscribe to Observable (for now) ;)
 * - All errors that occur in a `forEach` subscription are forwarded down the
 *  Promise chain, and can be caught with `Promise`'s `catch` method.
 *
 * **TODO**
 *
 * See the TODOs inline below
 */

async function execute() {
  console.log('Listing amazing 80s trio members...');

  try {
    await threeMenAndAnError$.forEach(x => console.log(x));
  } catch (err) {
    console.log(err.message);
  }

  await threeAmigos$.forEach(x => console.log(x));

  console.log('All done. Much better.');
}

execute();
