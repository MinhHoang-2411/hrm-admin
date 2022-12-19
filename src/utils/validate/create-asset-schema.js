import * as Yup from 'yup';

export const CreateAssetSchema = (type) => {
  return Yup.object().shape({
    description: Yup.string().required('Please enter Description.'),
    status: Yup.string().required('Please enter Status.'),
    serialNumber: Yup.string().required('Please enter Seria Number.'),
    assetModel: Yup.number()
      .nullable('Please select Asset Model.')
      .required('Please select Asset Model.'),
  });
};
