import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';

import Navigation from './src/screens';
import store from './src/store';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PaperProvider>
        <Navigation />
      </PaperProvider>
    </Provider>
  );
}

export default App;
