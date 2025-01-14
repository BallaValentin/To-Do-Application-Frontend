import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { UserAdminResp } from '../../interface/UserAdminResp';

interface UsersTableProps {
  users: UserAdminResp[];
}

function UsersTable(userTableProps: UsersTableProps) {
  return (
    <TableContainer component={Paper} sx={{ m: '0 16px', maxWidth: 'calc(100% - 32px)' }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Username</TableCell>
            <TableCell align="right">Fullname</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userTableProps.users.map((user) => (
            <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {user.id}
              </TableCell>
              <TableCell align="right">{user.username}</TableCell>
              <TableCell align="right">{user.fullname}</TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UsersTable;
