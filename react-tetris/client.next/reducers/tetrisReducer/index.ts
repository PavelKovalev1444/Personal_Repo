import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

export type TetrisDirection = 'up' | 'down' | 'left' | 'right';

export type TetrisState = {
  lastDirection: TetrisDirection | null;
};

const initialState: TetrisState = {
  lastDirection: null,
};

const tetrisSlice = createSlice({
  name: 'tetris',
  initialState,
  reducers: {
    keyboardListenStart: state => state,
    keyboardListenStop: state => state,
    keyDown: (state, action: PayloadAction<TetrisDirection>) => {
      state.lastDirection = action.payload;
    },
  },
});

export const {keyboardListenStart, keyboardListenStop, keyDown} = tetrisSlice.actions;

export default tetrisSlice.reducer;
