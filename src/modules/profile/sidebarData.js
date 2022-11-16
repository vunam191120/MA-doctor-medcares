import {
  BsFillFileEarmarkPersonFill,
  BsJournalMedical,
  BsCreditCard2BackFill,
} from 'react-icons/bs';
import { AiOutlineSchedule } from 'react-icons/ai';
import { RiLockPasswordFill } from 'react-icons/ri';

// 1. Personal Information
// 2. Medical Record
// 3. Change password
// 4. Payment

const sidebarData = [
  {
    icon: <BsFillFileEarmarkPersonFill className="icon" />,
    text: 'Personal Information',
    path: '/profile/user-form',
  },
  {
    icon: <BsJournalMedical className="icon" />,
    text: 'Medical record',
    path: '/profile/medical-record',
  },
  {
    icon: <BsCreditCard2BackFill className="icon" />,
    text: 'Payments',
    path: '/profile/payments',
  },
  {
    icon: <AiOutlineSchedule className="icon" />,
    text: 'Appointments',
    path: '/profile/appointments',
  },
  {
    icon: <RiLockPasswordFill className="icon" />,
    text: 'Change password',
    path: '/profile/change-password',
  },
];

export default sidebarData;
