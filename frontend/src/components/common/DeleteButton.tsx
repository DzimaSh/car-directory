import { Button } from '@mui/material';
import React from 'react';

interface IDeleteButton {
  onDelete: () => void;
  children: React.ReactNode | React.ReactNode[];
}

const DeleteButton: React.FC<IDeleteButton> = ({
  onDelete,
  children,
}) => (
  <Button variant="contained" onClick={onDelete}>
    {typeof children !== 'undefined' ? children : 'Delete item'}
  </Button>
);

export default React.memo(DeleteButton);
