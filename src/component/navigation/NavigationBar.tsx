import { AppBar, Box, IconButton, Toolbar, Tooltip, tooltipClasses } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import UserMenu from '../menu-item/UserMenu';
import ToggleThemeButton from '../button/ToggleThemeButton';

function CommonHeader() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('Guest');
  const [initials, setInitials] = useState<string>('G');
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [hasToken, setHasToken] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleMenuClose = () => {
    setAnchor(null);
  };

  const handleUsers = () => {
    navigate('/users');
  };

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setHasToken(true);
      const decodedToken = jwtDecode(token);
      const subject = decodedToken.sub;
      setUsername(subject?.split('|')[0] || 'Guest');
      const fullname = subject?.split('|')[1] || 'Guest';
      const role = subject?.split('|')[2] || 'guest';
      setIsAdmin(Boolean(role === 'admin'));
      const fullnameInitials = fullname
        .split(' ')
        .map((word) => word[0])
        .join('');
      setInitials(fullnameInitials);
    } else {
      setHasToken(false);
      setIsAdmin(false);
    }
  });

  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <Tooltip
              arrow
              title="Go to Main Page"
              slotProps={{
                popper: {
                  sx: {
                    [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]: {
                      marginTop: '0px',
                    },
                    [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]: {
                      marginBottom: '0px',
                    },
                    [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]: {
                      marginLeft: '0px',
                    },
                    [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]: {
                      marginRight: '0px',
                    },
                  },
                },
              }}
            >
              <IconButton onClick={() => navigate('/')}>
                <HomeIcon />
              </IconButton>
            </Tooltip>
            <UserMenu
              initials={initials}
              username={username}
              hasToken={hasToken}
              isAdmin={isAdmin}
              anchor={anchor}
              handleMenuOpen={handleMenuOpen}
              handleMenuClose={handleMenuClose}
              handleLogin={handleLogin}
              handleLogout={handleLogout}
              handleUsers={handleUsers}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <ToggleThemeButton />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default CommonHeader;
