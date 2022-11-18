import { message } from 'antd';
import { Navigate } from 'react-router-dom';
import { isLogin } from '../helpers/isLogin';

const PrivateRoute = ({ children, roles }) => {
  // const currentDoctor = JSON.parse(localStorage.getItem('currentDoctor'));

  // Note logged in so redirect to login page
  if (!isLogin()) {
    message.warning('You must login first!', 3);
    return <Navigate to="/signin" replace={true} />;
  }

  // Authorised role will return the children route
  return children;
};

export default PrivateRoute;
