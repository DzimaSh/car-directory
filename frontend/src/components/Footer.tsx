import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => (
  <Box sx={{
    bgcolor: 'lightgrey', p: 2, position: 'fixed', bottom: 0, width: '100%',
  }}
  >
    <Typography variant="body2" color="text.secondary" align="center">
      © 2023 Car Directory. All rights reserved.
    </Typography>
    <Typography variant="body2" color="text.secondary" align="center">
      Шушкевич Дмитрий, 12 группа, 3 курс.
    </Typography>
  </Box>
);

export default React.memo(Footer);
