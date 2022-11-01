import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Divider, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

function DrawerComponent() {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <Drawer anchor="top" sx={{ width: 250, color: '#fff' }} open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <Toolbar sx={{ backgroundColor: 'error.main', flexGrow: 1 }}>
          <Typography variant="h5" sx={{ color: '#fff', flexGrow: 1 }}>
            Menu
          </Typography>
          <CloseIcon sx={{ cursor: 'pointer', color: '#fff' }} onClick={() => setOpenDrawer(false)} />
        </Toolbar>
        <box sx={{ backgroundColor: 'error.main' }} height="100vh">
          <List height="100vh">
            <ListItem onClick={() => setOpenDrawer(false)}>
              <ListItemText>
                <Link to="/shop">Shop</Link>
              </ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText>
                <Link to="/cart">Giỏ hàng</Link>
              </ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText>
                <Link to="/blog">Blog</Link>
              </ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText>
                <Link to="/about-us">Giới thiệu</Link>
              </ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText>
                <Link to="/about-us">Giới thiệu</Link>
              </ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText>
                <Link to="/profile">Tài khoản</Link>
              </ListItemText>
            </ListItem>
          </List>
        </box>
      </Drawer>
      <IconButton sx={{ color: 'white' }} onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon />
      </IconButton>
    </>
  );
}

export default DrawerComponent;
