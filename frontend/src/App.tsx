import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './styles/App.css';
import { Footer, Header, MainRouter } from './components';
import SideBar from './components/main/SideBar';

const App: React.FC = () => {
  const [sideBarOpen, setSideBarOpen] = React.useState<boolean>(false);

  return (
    <BrowserRouter>
      <Header onSideBarOpen={() => setSideBarOpen(true)} />
      <SideBar open={sideBarOpen} onClose={() => setSideBarOpen(false)} />
      <MainRouter />
      <Footer />
    </BrowserRouter>
  );
};

export default React.memo(App);
