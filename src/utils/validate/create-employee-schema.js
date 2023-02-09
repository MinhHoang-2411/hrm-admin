import * as Yup from 'yup';
import {currentDate} from 'utils/date/currentDate';

export const CreateEmployeeSchema = (type) => {
  return Yup.object().shape({
    firstName: Yup.string()
      .max(50, 'Please enter no more than 50 characters')
      .trim()
      .required('Please enter First Name'),
    lastName: Yup.string()
      .max(50, 'Please enter no more than 50 characters')
      .trim()
      .required('Please enter Last Name'),
    login: Yup.string()
      .max(50, 'Please enter no more than 50 characters')
      .trim()
      .required('Please enter Username'),
    email: Yup.string()
      .max(191, 'Please enter no more than 191 characters')
      .trim()
      .email('Please enter correct Email format')
      .required('Please enter Email'),
    phoneNumber: Yup.string()
      .max(15, 'Please enter no more than 15 numbers')
      .trim()
      .nullable('Please enter Phone Number')
      .required('Please enter Phone Number'),
    address: Yup.string()
      .max(255, 'Please enter no more than 255 characters')
      .trim()
      .required('Please enter Address'),
    department: Yup.string()
      .nullable('Please select Department')
      .required('Please select Department'),
    nationality: Yup.string()
      .max(20, 'Please enter no more than 20 characters')
      .trim()
      .nullable('Please select Department.'),
    teamId: Yup.number().nullable('Please select Team.').required('Please select Team.'),
    position: Yup.string().nullable('Please select Position.').required('Please select Position.'),
    branchId: Yup.number().nullable('Please select Branch.').required('Please select Branch.'),
    dateOfBirth: Yup.date().max(currentDate, 'Invalid Time'),
    joinedDate: Yup.date().max(currentDate, 'Invalid Time'),
    resume: Yup.string().url('Please enter valid Resume URL'),
  });
};
