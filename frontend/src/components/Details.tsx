import React, { useState } from 'react';
import {
  Button, Container, IconButton, Box, Typography, Grid,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Cancel } from '@mui/icons-material';
import { IEntity } from '../interfaces/entity';
import { Loader } from './index';
import DeleteButton from './common/DeleteButton';
import { IDetails } from '../interfaces/components';

const Details = <T extends IEntity, >({
  header,
  object,
  onUpdate,
  onDelete,
  context,
  isLoading,
}: IDetails<T>): React.ReactElement<IDetails<T>> => {
  const [editingKey, setEditingKey] = useState<keyof T | null>(null);
  const [objCopy, setObjCopy] = React.useState<T>(object);

  React.useEffect(() => {
    setObjCopy(object);
  }, [object]);

  const handleEdit = (key: keyof T): void => {
    setEditingKey(key);
  };

  const handleUpdate = (): void => {
    onUpdate(objCopy);
    setEditingKey(null);
  };

  const handleCancel = (): void => {
    setEditingKey(null);
    setObjCopy(object);
  };

  const handleChange = (newObject: Partial<T>): void => {
    setObjCopy({ ...objCopy, ...newObject });
  };

  return (
    <Container className="details">
      <Typography
        variant="h3"
        sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}
      >
        {header}
      </Typography>
      {isLoading ? <Loader /> : context.map((fieldContext) => {
        const editMode = editingKey === fieldContext.key as string;

        return (
          <Box key={fieldContext.key as string} className="detail">
            <strong className="field">
              {fieldContext.header}
              :
              {' '}
            </strong>
            {fieldContext.renderComponent(
              editMode,
              objCopy,
              handleEdit,
              handleChange,
            )}

            {!fieldContext?.notEditable && (
              <>
                {editMode ? (
                  <>
                    <Grid className="update-button-container">
                      <Button variant="contained" color="primary" onClick={handleUpdate} className="button">
                        Update
                      </Button>
                    </Grid>
                    <IconButton onClick={handleCancel}>
                      <Cancel />
                    </IconButton>
                  </>
                ) : (
                  <IconButton onClick={() => handleEdit(fieldContext.key as keyof T)}>
                    <EditIcon />
                  </IconButton>
                )}
              </>
            )}
          </Box>
        );
      })}
      <Grid container justifyContent="flex-end">
        <Grid className="update-button-container" mr={2}>
          <Button
            variant="contained"
            onClick={handleUpdate}
          >
            Update
          </Button>
        </Grid>
        <Grid className="delete-button-container">
          <DeleteButton onDelete={() => onDelete(object.id)}>
            Delete
          </DeleteButton>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Details;
