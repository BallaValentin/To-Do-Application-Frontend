import { ArrowDropDown, ArrowDropUp, Logout } from '@mui/icons-material';
import { AppBar, Avatar, Box, IconButton, ListItemIcon, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CommonHeader() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('Guest');
  const [initials, setInitials] = useState<string>('G');
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    navigate('/login');
  };

  const handleMenuClose = () => {
    setAnchor(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      const subject = decodedToken.sub;
      setUsername(subject?.split('-')[0] || 'Guest');
      const fullname = subject?.split('-')[1] || 'Guest';
      const fullnameInitials = fullname
        .split(' ')
        .map((word) => word[0])
        .join('');
      setInitials(fullnameInitials);
    }
  });
  return (
    <AppBar position="fixed" sx={{ bgcolor: 'primary.main' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ bgColor: 'grey.500', mr: 1 }}>{initials}</Avatar>
          <Typography variant="h6">{username}</Typography>
          <IconButton onClick={handleMenuOpen}>{anchor ? <ArrowDropUp /> : <ArrowDropDown />}</IconButton>
          <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={handleMenuClose}>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default CommonHeader;
