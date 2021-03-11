import * as yup from 'yup';
const productSchema = yup.object().shape({
  title: yup.string().required('Please enter a name'),
  price: yup.number().required('Please enter a number or price'),
  description: yup.string().required('Please priovide product description.'),
  image_url: yup.string().required('Please provide an image url'),
});

export default productSchema;
