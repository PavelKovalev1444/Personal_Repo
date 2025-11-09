import {Provider} from 'react-redux';
import {ThemeProvider} from '@gravity-ui/uikit';

import store from '../../store';
import {AppRouterProvider} from '../router';

export const AppContainer = () => {
  return (
    <Provider store={store.default}>
      <ThemeProvider theme="light">
        <AppRouterProvider />
      </ThemeProvider>
    </Provider>
  );
};
