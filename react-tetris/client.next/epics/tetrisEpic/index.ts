import {ofType} from 'redux-observable';
import {fromEvent} from 'rxjs';
import {filter, map, switchMap, takeUntil, tap} from 'rxjs/operators';

import {keyboardListenStart, keyboardListenStop, keyDown, type TetrisDirection} from '../../reducers/tetrisReducer';

const ARROW_KEY_TO_DIRECTION: Record<string, TetrisDirection> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
};

export const tetrisKeyboardEpic = (action$: any) =>
  action$.pipe(
    ofType(keyboardListenStart.type),
    switchMap(() =>
      fromEvent<KeyboardEvent>(document, 'keydown').pipe(
        filter(event => event.key in ARROW_KEY_TO_DIRECTION),
        tap(event => event.preventDefault()),
        map(event => keyDown(ARROW_KEY_TO_DIRECTION[event.key]!)),
        takeUntil(action$.pipe(ofType(keyboardListenStop.type)))
      )
    )
  );
