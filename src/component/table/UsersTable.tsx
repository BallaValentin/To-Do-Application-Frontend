import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import { UserAdminResp } from '../../interface/UserAdminResp';

interface UsersTableProps {
  users: UserAdminResp[];
  adminName: string;
  onDelete: (id: number) => void;
}

function UsersTable(userTableProps: UsersTableProps) {
  const { t } = useTranslation();
  const handleDelete = (id: number) => {
    userTableProps.onDelete(id);
  };

  const admin = userTableProps.users.filter((user) => user.username === userTableProps.adminName)[0];
  const otherUsers = userTableProps.users.filter((user) => user.username !== userTableProps.adminName);

  return (
    <TableContainer component={Paper} sx={{ m: '0 16px', maxWidth: 'calc(100% - 32px)' }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">{t('usersTableUsername')}</TableCell>
            <TableCell align="right">{t('usersTableFullname')}</TableCell>
            <TableCell align="right">{t('usersTableAddress')}</TableCell>
            <TableCell align="right">{t('usersTableRole')}</TableCell>
            <TableCell align="center">{t('usersTableActions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {admin && (
            <TableRow key={admin.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                <strong>{admin.id}</strong>
              </TableCell>
              <TableCell align="right">
                <strong>{admin.username}</strong>
              </TableCell>
              <TableCell align="right">
                <strong>{admin.fullname}</strong>
              </TableCell>
              <TableCell align="right">
                <strong>{admin.email}</strong>
              </TableCell>
              <TableCell align="right">
                <strong>{admin.role}</strong>
              </TableCell>
              <TableCell align="center">{}</TableCell>
            </TableRow>
          )}
          {otherUsers.map((user) => (
            <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {user.id}
              </TableCell>
              <TableCell align="right">{user.username}</TableCell>
              <TableCell align="right">{user.fullname}</TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">{user.role}</TableCell>
              <TableCell align="center">
                <IconButton color="error" onClick={() => handleDelete(user.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UsersTable;
