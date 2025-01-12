import { ArrowDropDown, ArrowDropUp, Logout } from '@mui/icons-material';
import { Avatar, Box, IconButton, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';

interface UserMenuProps {
  initials: string;
  username: string;
  hasToken: boolean;
  anchor: HTMLElement | null;
  handleMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  handleMenuClose: () => void;
  handleLogin: () => void;
  handleLogout: () => void;
}

function UserMenu(userMenuProps: UserMenuProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Avatar sx={{ bgColor: 'grey.500', mr: 1 }}>{userMenuProps.initials}</Avatar>
      <Typography variant="h6">{userMenuProps.username}</Typography>
      <IconButton onClick={userMenuProps.handleMenuOpen}>
        {userMenuProps.anchor ? <ArrowDropUp /> : <ArrowDropDown />}
      </IconButton>
      <Menu
        anchorEl={userMenuProps.anchor}
        open={Boolean(userMenuProps.anchor)}
        onClose={userMenuProps.handleMenuClose}
      >
        {userMenuProps.hasToken ? (
          <MenuItem onClick={userMenuProps.handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        ) : (
          <MenuItem onClick={userMenuProps.handleLogin}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Login
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
}

export default UserMenu;
