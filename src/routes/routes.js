import {
  PATH_PATIENT_PROFILE,
  PATH_PATIENT_PROFILE_USER_FORM,
  PATH_PATIENT_PROFILE_PAYMENTS,
  PATH_PATIENT_PROFILE_CHANGE_PASSWORD,
  PATH_PATIENT_PROFILE_APPOINTMENTS,
} from './path';

import Profile from '../pages/profile';
import UserInfo from '../pages/profile/userInfo';
import Payment from '../pages/profile/payment';
import ChangePassword from '../pages/profile/changePassword';
import Appointment from '../pages/profile/appointment';
import NoMatch from '../pages/noMatch';

const appRoutes = [
  {
    path: PATH_PATIENT_PROFILE,
    element: <Profile />,
    subnavs: [
      {
        path: PATH_PATIENT_PROFILE_USER_FORM,
        element: <UserInfo />,
      },
      {
        path: PATH_PATIENT_PROFILE_PAYMENTS,
        element: <Payment />,
      },
      {
        path: PATH_PATIENT_PROFILE_APPOINTMENTS,
        element: <Appointment />,
      },
      {
        path: PATH_PATIENT_PROFILE_CHANGE_PASSWORD,
        element: <ChangePassword />,
      },
      {
        path: '*',
        element: <NoMatch />,
      },
    ],
  },
];

export default appRoutes;
