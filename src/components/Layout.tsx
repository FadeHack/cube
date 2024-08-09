// src/components/Layout.tsx

import React, { useState } from 'react';
import {
  Box,
  Grid,
  Drawer,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import CustomerList from './CustomerList';
import CustomerDetails from './CustomerDetails';
import Navbar from './Navbar';

const Layout: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Box>
      <Navbar onMenuClick={handleDrawerToggle} /> {/* Pass handleDrawerToggle to Navbar */}
      {isMobile ? (
        <>
          <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={handleDrawerToggle}
            sx={{
              '& .MuiDrawer-paper': {
                width: '80%', // Adjust as needed
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: theme.spacing(2),
              }}
            >
              <Typography variant="h6">Customers</Typography>
              {/* Only show close icon inside the drawer */}
              <IconButton onClick={handleDrawerToggle}>
                  <Close />
              </IconButton>
            </Box>
            <CustomerList />
          </Drawer>
          <Box sx={{ padding: 2, marginTop: 8 }}>
            <CustomerDetails />
          </Box>
        </>
      ) : (
        <Grid container sx={{ height: 'calc(100vh - 64px)' }}>
          <Grid item xs={3} sx={{ overflowY: 'auto', height: '100%' }}>
            <Box sx={{ padding: 2 }}>
              <CustomerList />
            </Box>
          </Grid>
          <Grid item xs={9} sx={{ overflowY: 'auto', height: '100%' }}>
            <Box sx={{ padding: 2 }}>
              <CustomerDetails />
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Layout;