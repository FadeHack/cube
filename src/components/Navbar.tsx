// src/components/Navbar.tsx

import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import theme from '../styles';

const Navbar: React.FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => {

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="static" sx={{ backgroundColor: 'primary.dark' }}>
      <Toolbar>
        {isMobile && ( // Only show MenuIcon on mobile
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onMenuClick}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Cube
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
