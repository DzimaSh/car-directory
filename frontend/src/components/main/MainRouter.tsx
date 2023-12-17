import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageEnum } from '../../constants/PageEnum';
import { Cars, Home } from '../../pages';

const MainRouter: React.FC = () => (
  <Routes>
    <Route path={PageEnum.Home} element={<Home />} />
    <Route path={PageEnum.Cars} element={<Cars />} />
  </Routes>
);

export default React.memo(MainRouter);
