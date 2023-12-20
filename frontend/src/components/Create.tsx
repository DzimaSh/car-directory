import React from 'react';
import {
  Container, Box, Typography, Grid, Button,
} from '@mui/material';
import { IEntity } from '../interfaces/entity';
import { Loader } from './index';
import { ICreate } from '../interfaces/components';

const Create = <T extends IEntity, >({
  header,
  object,
  onSave,
  context,
  isLoading,
  disabled,
}: ICreate<T>): React.ReactElement<ICreate<T>> => {
  const [objCopy, setObjCopy] = React.useState<T>(object);

  React.useEffect(() => {
    setObjCopy(object);
  }, [object]);

  const handleSave = (): void => {
    onSave(objCopy);
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
      {isLoading ? <Loader /> : context.map((fieldContext) => (
        <Box key={fieldContext.key as string} className="detail">
          <strong className="field">
            {fieldContext.header}
            :
            {' '}
          </strong>
          {fieldContext.renderComponent(
            objCopy,
            handleChange,
          )}
        </Box>
      ))}
      <Grid className="save-button-container" container justifyContent="flex-end">
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={disabled && disabled(objCopy)}
        >
          Save
        </Button>
      </Grid>
    </Container>
  );
};

export default Create;
