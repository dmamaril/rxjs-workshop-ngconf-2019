import { interval, zip, concat, throwError, timer, Observable, merge, combineLatest, of, Subject, defer } from "rxjs";
import { map, repeat, publish, takeUntil, last, scan, endWith, catchError } from "rxjs/operators";

export const threeAmigos$ = emitValues(100, 'Lucky Day', 'Ned Nederlander', 'Dusty Bottoms');

export const threeMenAndAnError$ = concat(
  emitValues(500, 'Tom Selleck', 'Steve Guttenberg', 'Ted Danson'),
  throwError(new Error('Magnum P.I. was too cool for this film!')),
);

export const validStarWarsFilms$ = emitValues(500, 'A New Hope', 'The Empire Strikes Back', 'Return Of The Jedi');

export const theSongThatNeverEnds$ = emitValues(1000,
  '..this is the song that never ends!',
  'It just goes on and on, my friend.',
  'Some people started singing it not knowing what it was,',
  'and they\'ll go on and on forever just because...',
).pipe(
  repeat()
);

/**
 * Sets up an observable that will phone E.T.'s home with the message of your
 * choosing, then returns their response.
 * @param msg The message you want to send
 * @returns An observable that sends the message and emits a single response.
 */
export function intergalacticPhoneCall(msg: string) {
  return timer(2000).pipe(
    map(() => `We got your message little guy. It said, "${msg}". Nice scouting! We'll be there shortly with our planet-destroying armada.`)
  )
}

function emitValues<T>(everyMs: number, ...values: T[]): Observable<T> {
  return zip(
    values,
    interval(everyMs),
  ).pipe(
    map(([value]) => value),
  );
}

function marbleize(source: Observable<string|number>, tick: number) {
  return source.pipe(
    toMarbleFrame(),
    publish(source =>
      merge(
        interval(tick).pipe(map(() => '-'), takeUntil(source.pipe(last()))),
        source
      )
    ),
  )
}

const printObserver = {
  next: m => process.stdout.write(m),
  error: err => {
    console.log();
    console.log(err);
  },
  complete: () => {
    console.log();
  },
};

export function consoleMarbles(tick = 20) {
  const subject = new Subject<string | number>();
  marbleize(subject, tick).subscribe(printObserver);
  return subject;
}

const RESOLVED = Promise.resolve();
export function toMarbleFrame() {
  return (source: Observable<string>) => new Observable<string>(subscriber => {

    let scheduled = false;
    let complete = false;
    let hasError = false;
    let error: any;
    const buffer: string[] = [];

    const flush = () => {
      scheduled = false;
      let result = '';
      if (buffer.length === 1) {
        result = buffer[0];
      } else if (buffer.length > 1) {
        result = `(${buffer.join('')})`;
      }
      buffer.length = 0;
      subscriber.next(result);
      if (hasError) {
        subscriber.error(error);
      }
      if (complete) {
        subscriber.complete();
      }
    };

    const schedule = () => {
      if (!scheduled) {
        scheduled = true;
        RESOLVED.then(flush);
      }
    };

    return source.subscribe({
      next: x => {
        buffer.push(x);
        schedule();
      },
      error: err => {
        hasError = true;
        error = err;
        buffer.push('#');
        schedule();
      },
      complete: () => {
        complete = true;
        buffer.push('|');
        schedule();
      }
    })
  });
}

const defaultDelays = () => Math.round(Math.random() * 400);

function charEmitter(c: string, endTime = 1000, getDelays = defaultDelays) {
  return defer(() => timer(getDelays()).pipe(
    map(() => c),
  )).pipe(
    repeat(),
    takeUntil(timer(endTime))
  )
}


export const a$ = charEmitter('a');
export const b$ = charEmitter('b');
export const c$ = charEmitter('c');

let movieCharacterSubs = 0;

export interface MovieCharacter {
  universe: string;
  name: string;
}

export const movieCharacters$ = defer(() => {
  if (movieCharacterSubs > 0) {
    throw new Error('You cannot subscribe twice!')
  }
  movieCharacterSubs++;
  return emitValues(500,
    { universe: 'Star Wars', name: 'Chewbacca' },
    { universe: 'Star Trek', name: 'Capt. Picard' },
    { universe: 'Star Wars', name: 'Han Solo' },
    { universe: 'Star Trek', name: 'Spock' },
    { universe: 'Star Wars', name: 'Princess Leia' },
    { universe: 'Star Wars', name: 'Rey' },
    { universe: 'Star Trek', name: 'Data' },
    { universe: 'Star Trek', name: 'Capt. Janeway' },
    { universe: 'Star Wars', name: 'Bib Fortuna' },
    { universe: 'Star Trek', name: 'Q' },
  );
});

export const starWarsObserver = namedObserver('Star Wars');
export const starTrekObserver = namedObserver('Star Trek');

function namedObserver(name: string) {
  return {
    next: value => console.log(`${name}: ${stringify(value)}`),
    error: err => console.log(`${name}: ERROR: ${err.message}`),
    complete: () => console.log(`${name}: DONE`),
  };
}

function stringify(value: any) {
  switch (typeof value) {
    case 'string':
      return value;
    case 'number':
      return '' + value;
    case 'object':
      return JSON.stringify(value);
    case 'function':
      return value.name;
    default:
      return value.toString();
  }
}
