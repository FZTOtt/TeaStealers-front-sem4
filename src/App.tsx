import React from 'react';
import MainPage from '@pages/mainPage/mainPage';
import StatisticsPage from '@pages/statisticsPage/statisticsPage';
import Message from '@components/message/message';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
      </Routes>
      <Message />
    </Router>
  );
};

export default App;
