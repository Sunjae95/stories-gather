import React from 'react';
import { ThemeProvider } from '@emotion/react';
import GlobalStyles from 'styles/globalStyle';
import theme from 'styles/theme';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from 'components/Navbar';
import StoriesPage from 'pages/StoriesPage';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/stories/:title" element={<StoriesPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
