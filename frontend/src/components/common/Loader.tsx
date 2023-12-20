import { CircularProgress } from '@mui/material';
import React from 'react';

interface ILoaderProps {
  bigger?: boolean;
  standalone?: boolean;
}

const Loader: React.FC<ILoaderProps> = ({ bigger = false, standalone = false }) => {
  const size = bigger ? '3rem' : '1rem';

  return (
    <div className={`loader${standalone ? ' centered' : ''}`}>
      <CircularProgress color="inherit" size={size} />
    </div>
  );
};

export default React.memo(Loader);
