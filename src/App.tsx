import React from 'react';
import { ThemeProvider } from '@emotion/react';
import GlobalStyles from 'styles/globalStyle';
import theme from 'styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div className="App"></div>
    </ThemeProvider>
  );
}

export default App;
