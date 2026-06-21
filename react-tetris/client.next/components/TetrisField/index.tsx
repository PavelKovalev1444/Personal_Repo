import type {FC} from 'react';
import React from 'react';

import './TetrisField.scss';

export const TETRIS_COLS = 10;
export const TETRIS_ROWS = 20;
export const TETRIS_CELL_SIZE = 24;

const TetrisField: FC = () => {
  const cells = Array.from({length: TETRIS_COLS * TETRIS_ROWS});

  return (
    <div className="tetris-field-wrapper">
      <div className="tetris-field" style={{'--cell-size': `${TETRIS_CELL_SIZE}px`} as React.CSSProperties}>
        {cells.map((_, index) => (
          <div key={index} className="tetris-field__cell" />
        ))}
      </div>
    </div>
  );
};

export default TetrisField;
