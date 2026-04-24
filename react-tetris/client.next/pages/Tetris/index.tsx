import type {FC} from 'react';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import PageLayout from '../../components/PageLayout';
import TetrisField from '../../components/TetrisField';
import {keyboardListenStart, keyboardListenStop} from '../../reducers/tetrisReducer';

const Tetris: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(keyboardListenStart());

    return () => {
      dispatch(keyboardListenStop());
    };
  }, [dispatch]);

  return (
    <PageLayout title="Tetris" breadcrumbs={[]}>
      <TetrisField />
    </PageLayout>
  );
};

export default Tetris;
