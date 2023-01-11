import * as Yup from 'yup';

export const CreateEmployeeSchema = (type) => {
  return Yup.object().shape({
    firstName: Yup.string().required('Please enter First Name.'),
    lastName: Yup.string().required('Please enter Last Name.'),
    login: Yup.string().required('Please enter Last Name.'),
    email: Yup.string().email('Please enter correct Email format.').required('Please enter Email.'),
    gender: Yup.string().nullable('Please select Gender.').required('Please select Gender.'),
    address: Yup.string().required('Please enter Address.'),
    branchId: Yup.number().nullable('Please select Branch.').required('Please select Branch.'),
  });
};
