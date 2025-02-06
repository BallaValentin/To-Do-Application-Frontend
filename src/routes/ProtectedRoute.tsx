import { Navigate, Outlet } from 'react-router-dom';
import ProgressCircle from '../component/progress/ProgressCircle';
import useNullTokenChecker from '../hooks/UseNullTokenChecker';

function ProtectedRoute() {
  const isTokenNull = useNullTokenChecker();
  if (isTokenNull == null) {
    return <ProgressCircle loadingMessage="Loading..." />;
  }
  if (isTokenNull) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
