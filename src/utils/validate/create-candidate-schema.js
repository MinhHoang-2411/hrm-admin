import * as Yup from 'yup';

export const CreateCandidateSchema = (type) => {
  return Yup.object().shape({
    firstName: Yup.string().required('Please enter First Name.'),
    lastName: Yup.string().required('Please enter Last Name.'),
    email: Yup.string().email('Please enter correct Email format.').required('Please enter Email.'),
  });
};
