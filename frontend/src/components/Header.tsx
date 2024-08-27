import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Header: React.FC = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #e0e0e0' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'text.primary' }}>
          IC Blog
        </Typography>
        <Button color="inherit" component={RouterLink} to="/" sx={{ color: 'text.primary' }}>
          Home
        </Button>
        <Button color="inherit" component={RouterLink} to="/create" sx={{ color: 'text.primary' }}>
          Create Post
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
