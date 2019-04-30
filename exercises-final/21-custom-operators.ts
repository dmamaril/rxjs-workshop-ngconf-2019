import { movieCharacters$, theSongThatNeverEnds$, MovieCharacter } from "./fixtures";
import { share, filter, mergeMap, map } from "rxjs/operators";
import { Observable } from "rxjs";

/**
 * **Custom operators**
 *
 * One of the most overlooked innovations of pipeable operators is how
 * easy it is to create a custom operator to suit your needs.
 *
 * Reasons to create a custom operator:
 *
 * 1. Reusability - you do the same things over and over with RxJS.
 * 2. Code readability - giant operator chains get mind-numbing
 * 3. You need some functionality that RxJS doesn't provide OOTB - Really, though?
 *    There are already 60+ operators! :P
 *
 * Custom operators are best created with existing operators and higher-order
 * functions.
 *
 * **TODO**
 *
 * The movie characters all want to sing together, they all join in at different
 * times, and the Star Trek folks seem to be a little more timid about their singing.
 *
 * Create some operators below to make the code cleaner.
 */

const sharedMovieCharacters$ = movieCharacters$.pipe(
  share()
);

const sharedSong = theSongThatNeverEnds$.pipe(
  share(),
);

function inUniverse(universe: string) {
  return filter((character: MovieCharacter) => character.universe === universe);
}

function joinInSong(song$: Observable<string>) {
  return mergeMap((character: MovieCharacter) => {
    return song$.pipe(
      map(lyrics => ({ character, lyrics })),
    );
  })
}

function toSingingStatement({ quiet } = { quiet: false }) {
  return map(({ character, lyrics }) => `${formatName(character.name)}: ${lyrics}${quiet ? ' (quietly)' : ''}`);
}

const choir1$ = sharedMovieCharacters$.pipe(
  inUniverse('Star Wars'),
  joinInSong(sharedSong),
  toSingingStatement(),
);

const choir2$ = sharedMovieCharacters$.pipe(
  inUniverse('Star Trek'),
  joinInSong(sharedSong),
  toSingingStatement({ quiet: true }),
);

function formatName(name: string) {
  while (name.length < 20) {
    name += ' ';
  }
  return name;
}

choir1$.subscribe(x => console.log(x));
choir2$.subscribe(x => console.log(x));
