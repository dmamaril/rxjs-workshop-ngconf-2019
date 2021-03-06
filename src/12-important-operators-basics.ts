import { interval } from "rxjs";
import { map, filter, scan, take } from "rxjs/operators";

/**
 * map, filter, and scan
 *
 * RxJS has a LOT of operators. More than 60 currently. And this causes some
 * confusion. There are reasons they all exist, some are technical, some are
 * historical. But there are a few operators that are more commonly used, and
 * arguably more important than others.
 *
 * **But what is an operator?**
 *
 * We'll get to that in another exercise, but first let's try a few basic and
 * very important operators:
 *
 * `map`        Transforms the values of an observable
 *              https://rxjs.dev/api/operators/map
 *
 * `filter`     Selects specific values from an observable
 *              https://rxjs.dev/api/operators/filter
 *
 * `scan`       Holds state it accumulates as it gets new values and emits that
 *              state each time
 *              https://rxjs.dev/api/operators/scan
 *
 * `take`       Takes a certain number of values, then completes.
 *              https://rxjs.dev/api/operators/take
 *
 *
 * **TODO**
 * - Create an interval of incrementing numbers using `interval` from rxjs.
 * - Convert values divisible by `3` to `"fizz"`
 * - Convert values divisible by `5` to `"buzz"`
 * - Convert values divisible by `3` and `5` to `"fizzbuzz"`
 * - Accumulate a count of how many of each `"fizz"`, `"buzz"`, or `"fizzbuzz"`
 *   you have generated.
 * - Only take the first 12 updates.
 *
 * (Information about `interval` can be found here: https://rxjs.dev/api/index/function/interval)
 */

// FINAL_START
interval(500).pipe(
  map(n => {
    if (n % 15 === 0) {
      return 'fizzbuzz';
    }
    if (n % 5 === 0) {
      return 'buzz';
    }
    if (n % 3 === 0) {
      return 'fizz';
    }
    return null;
  }),
  filter(x => x !== null),
  scan((state: any, word) => {
    state[word]++;
    return state;
  }, {
    fizz: 0,
    buzz: 0,
    fizzbuzz: 0,
  }),
  take(12),
)
.subscribe(x => console.log(x));
// FINAL_END
