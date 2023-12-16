import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageEnum } from '../../constants/PageEnum';
import { Home } from '../index';

const MainRouter: React.FC = () => (
  <Routes>
    <Route path={PageEnum.Home} element={<Home />} />
  </Routes>
);

export default React.memo(MainRouter);
