import React, { useState } from 'react';
import {
  Button, Container, IconButton, Box, Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Cancel } from '@mui/icons-material';
import { IEntity } from '../interfaces/entity';

export type EditorContext<T extends IEntity> =
  {
    key: keyof T,
    header: string,
    renderComponent: (
      editMode: boolean,
      objCopy: T,
      handleEdit: (key: keyof T) => void,
      handleChange: (newObject: Partial<T>) => void,
    ) => React.ReactNode
    notEditable?: boolean,
  };

interface IDetails<T extends IEntity> {
  header: string;
  object: T;
  onSave: (obj: T) => void;
  context: EditorContext<T>[];
}

const Details = <T extends IEntity, >({
  header,
  object,
  onSave,
  context,
}: IDetails<T>): React.ReactElement<IDetails<T>> => {
  const [editingKey, setEditingKey] = useState<keyof T | null>(null);
  const [objCopy, setObjCopy] = React.useState<T>(object);

  React.useEffect(() => {
    setObjCopy(object);
  }, [object]);

  const handleEdit = (key: keyof T): void => {
    setEditingKey(key);
  };

  const handleSave = (): void => {
    onSave(objCopy);
    setEditingKey(null);
  };

  const handleCancel = (): void => {
    setEditingKey(null);
    setObjCopy(object);
  };

  const handleChange = (newObject: Partial<T>): void => {
    if (editingKey !== null) {
      setObjCopy({ ...objCopy, ...newObject });
    }
  };

  return (
    <Container className="car-details">
      <Typography variant="h3" sx={{ mb: 2 }}>{header}</Typography>
      {context.map((fieldContext) => {
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
                    <Button variant="contained" color="primary" onClick={handleSave} className="button">
                      Save
                    </Button>
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
    </Container>
  );
};

export default Details;
