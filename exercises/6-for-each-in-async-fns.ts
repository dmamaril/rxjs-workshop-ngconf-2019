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

  // TODO: log out `threeMenAndAnError$` here, but handle the
  // error by logging the error message.
    try {

      await threeMenAndAnError$.forEach(console.log);

    } catch(err) {
      console.log(err.message);
    }

  // TODO: log the `threeAmigos$` here.
  await threeAmigos$.forEach(console.log);

  console.log('All done. Much better.');
}

execute();
