import { CircularProgress } from '@mui/material';
import React from 'react';

interface ILoaderProps {
  bigger?: boolean;
}

const Loader: React.FC<ILoaderProps> = ({ bigger = false }) => {
  const size = bigger ? '3rem' : '1rem';

  return (
    <div className="loader">
      <CircularProgress color="inherit" size={size} />
    </div>
  );
};

export default React.memo(Loader);
