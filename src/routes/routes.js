import {
  PATH_PATIENT_PROFILE,
  PATH_PATIENT_PROFILE_USER_FORM,
  PATH_PATIENT_PROFILE_CHANGE_PASSWORD,
  PATH_PATIENT_PROFILE_APPOINTMENTS,
  PATH_PATIENT_PROFILE_MEDICAL_RECORD,
  PATH_PATIENT_PROFILE_MEDICAL_RECORD_DETAIL,
  PATH_PATIENT_PROFILE_MEDICAL_RECORD_CREATE,
  PATH_PATIENT_PROFILE_MEDICAL_RECORD_UPDATE,
} from './path';

import Profile from '../pages/profile';
import UserInfo from '../pages/profile/userInfo';
import ChangePassword from '../pages/profile/changePassword';
import Appointment from '../pages/profile/appointment';
import NoMatch from '../pages/noMatch';
import MedicalRecordPage from '../pages/profile/medicalRecord';
import MedicalRecordDetailPage from '../pages/profile/medicalRecord/detail';
import CreateMedicalRecord from '../pages/profile/medicalRecord/create';
import UpdateMedicalRecord from '../pages/profile/medicalRecord/update';

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
        path: PATH_PATIENT_PROFILE_APPOINTMENTS,
        element: <Appointment />,
      },
      {
        path: PATH_PATIENT_PROFILE_MEDICAL_RECORD,
        element: <MedicalRecordPage />,
      },
      {
        path: PATH_PATIENT_PROFILE_MEDICAL_RECORD_CREATE,
        element: <CreateMedicalRecord />,
      },
      {
        path: PATH_PATIENT_PROFILE_MEDICAL_RECORD_UPDATE,
        element: <UpdateMedicalRecord />,
      },
      {
        path: PATH_PATIENT_PROFILE_MEDICAL_RECORD_DETAIL,
        element: <MedicalRecordDetailPage />,
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
