import {ReactNode} from 'react';
import {Navigate} from 'react-router-dom';
import Cookies from 'js-cookie';

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({children}: ProtectedRouteProps) {
  const tokenExists = Cookies.get('accessToken');

  return tokenExists ? <>{children}</> : <Navigate to='/login' />;
}

export default ProtectedRoute;
