import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import { PageEnum } from './constants/PageEnum';
import { Footer, Header, Home } from './components';

const App: React.FC = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path={PageEnum.Home} element={<Home />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);

export default React.memo(App);
