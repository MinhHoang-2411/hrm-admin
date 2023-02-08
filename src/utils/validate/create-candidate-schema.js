import * as Yup from 'yup';

export const CreateCandidateSchema = (type) => {
  return Yup.object().shape({
    firstName: Yup.string()
      .max(50, 'Please enter no more than 50 characters')
      .trim()
      .required('Please enter First Name.'),
    lastName: Yup.string()
      .max(50, 'Please enter no more than 50 characters')
      .trim()
      .required('Please enter Last Name.'),
    email: Yup.string()
      .max(191, 'Please enter no more than 191 characters')
      .trim()
      .email('Please enter correct Email format.')
      .required('Please enter Email.'),
    phoneNumber: Yup.string()
      .max(15, 'Please enter no more than 15 numbers')
      .trim()
      .nullable('Please enter Phone Number')
      .required('Please enter Phone Number'),
    status: Yup.string().nullable('Please select Status').required('Please select Status'),
    note: Yup.string().max(255, 'Please enter no more than 255 characters'),
    resumeUrl: Yup.string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Please enter a valid URL'
      )
      .required('Please enter Resume URL'),
  });
};
