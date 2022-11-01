import React from 'react';
import { AppBar, Toolbar, CssBaseline, Typography, useTheme, useMediaQuery } from '@mui/material';
import DrawerComponent from './drawer';

function MobileNavbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return isMobile ? (
    <AppBar position="static" sx={{ backgroundColor: 'error.main' }}>
      <CssBaseline />
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Menu
        </Typography>
        {isMobile && <DrawerComponent />}
      </Toolbar>
    </AppBar>
  ) : (
    <></>
  );
}

export default MobileNavbar;
