import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageEnum } from '../../constants/PageEnum';
import { Cars, Home } from '../../pages';
import CarDetails from '../../pages/CarDetails/index';

const MainRouter: React.FC = () => (
  <Routes>
    <Route path={PageEnum.Home} element={<Home />} />
    <Route path={PageEnum.Cars} element={<Cars />} />
    <Route path={`${PageEnum.Cars}/:id`} element={<CarDetails />} />
  </Routes>
);

export default React.memo(MainRouter);
