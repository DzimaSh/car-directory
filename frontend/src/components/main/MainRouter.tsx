import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ActionEnum, PageEnum } from '../../constants/PageEnum';
import {
  CarCreate,
  CarDetails,
  Cars,
  Home,
  ManufacturerCreate,
  ManufacturerDetails,
  Manufacturers,
} from '../../pages';

const MainRouter: React.FC = () => (
  <Routes>
    <Route path={PageEnum.Home} element={<Home />} />
    <Route path={PageEnum.Manufacturers} element={<Manufacturers />} />
    <Route
      path={`${PageEnum.Manufacturers}/${ActionEnum.Edit}/:id`}
      element={<ManufacturerDetails />}
    />
    <Route
      path={`${PageEnum.Manufacturers}/${ActionEnum.Create}`}
      element={<ManufacturerCreate />}
    />
    <Route path={PageEnum.Cars} element={<Cars />} />
    <Route
      path={`${PageEnum.Cars}/${ActionEnum.Edit}/:id`}
      element={<CarDetails />}
    />
    <Route
      path={`${PageEnum.Cars}/${ActionEnum.Create}`}
      element={<CarCreate />}
    />
  </Routes>
);

export default React.memo(MainRouter);
