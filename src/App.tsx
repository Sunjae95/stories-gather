import React from 'react';
import { ThemeProvider } from '@emotion/react';
import GlobalStyles from 'styles/globalStyle';
import theme from 'styles/theme';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from 'components/Navbar';
import StoriesPage from 'pages/StoriesPage';
import DetailPage from 'pages/DetailPage';
import { RecoilRoot } from 'recoil';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <RecoilRoot>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/stories/:title" element={<StoriesPage />} />
            <Route path="/stories/:title/:id" element={<DetailPage />} />
          </Routes>
        </Router>
      </RecoilRoot>
    </ThemeProvider>
  );
};

export default App;
