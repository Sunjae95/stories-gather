import React from 'react';
import { ThemeProvider } from '@emotion/react';
import GlobalStyles from 'styles/globalStyle';
import theme from 'styles/theme';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewStories from 'pages/NewStories';
import TopStories from 'pages/TopStories';
import AskStories from 'pages/AskStories';
import ShowStories from 'pages/ShowStories';
import JobStories from 'pages/JobStories';
import Navbar from 'components/Navbar';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/newstories" element={<NewStories />} />
          <Route path="/topstories" element={<TopStories />} />
          <Route path="/askstories" element={<AskStories />} />
          <Route path="/showstories" element={<ShowStories />} />
          <Route path="/jobstories" element={<JobStories />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
