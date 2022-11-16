import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, roles }) => {
  // const currentDoctor = JSON.parse(localStorage.getItem('currentDoctor'));

  // Note logged in so redirect to login page
  if (!Boolean(localStorage.getItem('currentDoctor'))) {
    return <Navigate to="/signin" replace={true} />;
  }

  // Authorised role will return the children route
  return children;
};

export default PrivateRoute;
