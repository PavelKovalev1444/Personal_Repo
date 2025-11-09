import React from 'react';
import {createRoot} from 'react-dom/client';

import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';

import {AppContainer} from './app/AppContainer';

import './index.scss';

const entry = document.getElementById('root');

if (entry) {
  const root = createRoot(entry);

  root.render(<AppContainer />);
}
