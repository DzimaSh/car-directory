import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './styles/App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Footer, Header, MainRouter } from './components';
import SideBar from './components/main/SideBar';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  const [sideBarOpen, setSideBarOpen] = React.useState<boolean>(false);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header onSideBarOpen={() => setSideBarOpen(true)} />
        <SideBar open={sideBarOpen} onClose={() => setSideBarOpen(false)} />
        <MainRouter />
        <Footer />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default React.memo(App);
