import { ArrowDropDown, ArrowDropUp, Logout } from '@mui/icons-material';
import { Avatar, Box, IconButton, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import { useTranslation } from 'react-i18next';

interface UserMenuProps {
  initials: string;
  username: string;
  hasToken: boolean;
  isAdmin: boolean;
  anchor: HTMLElement | null;
  handleMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  handleMenuClose: () => void;
  handleUsers: () => void;
  handleLogin: () => void;
  handleLogout: () => void;
}

function UserMenu(userMenuProps: UserMenuProps) {
  const { t } = useTranslation();

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
          <>
            <MenuItem onClick={userMenuProps.handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              {t('userMenuLogout')}
            </MenuItem>
            {userMenuProps.isAdmin && (
              <MenuItem onClick={userMenuProps.handleUsers}>
                <ListItemIcon>
                  <PeopleIcon fontSize="small" />
                </ListItemIcon>
                {t('userMenuUsers')}
              </MenuItem>
            )}
          </>
        ) : (
          <MenuItem onClick={userMenuProps.handleLogin}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            {t('userMenuLogin')}
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
}

export default UserMenu;
