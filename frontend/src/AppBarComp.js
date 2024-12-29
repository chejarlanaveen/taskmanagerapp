import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Container } from '@mui/material';

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSwitchUser = () => {
    // Clear session and redirect to login
    localStorage.removeItem('token'); // Remove token from local storage
    sessionStorage.clear(); // Clear session storage
    alert('Switching user: Session expired.');
    navigate('/login'); // Navigate to the login page
  };

  const handleLogout = () => {
    // Clear session and redirect to login
    localStorage.removeItem('token'); // Remove token from local storage
    sessionStorage.clear(); // Clear session storage
    alert('Logging out: Session expired.');
    navigate('/login'); // Navigate to the login page
  };

  return (
    <Container maxWidth={'lg'}>
      <Box sx={{ }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                letterSpacing: 10,
                fontWeight: 'bold',
                fontSize: 26,
              }}
            >
              Task Manager
            </Typography>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleSwitchUser}>Switch User</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </Container>
  );
}
