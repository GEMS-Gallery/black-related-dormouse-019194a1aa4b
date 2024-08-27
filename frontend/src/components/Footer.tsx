import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6, borderTop: '1px solid #e0e0e0' }}>
      <Typography variant="body2" color="text.secondary" align="center">
        © {new Date().getFullYear()} IC Blog. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
