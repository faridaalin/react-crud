import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormError from '../common/formError/FormError';
import Heading from '../layout/Heading';
import DashboardPage from '../dashboard/DashboardPage';
import { BASE_URL } from '../../constants/api';
import useAxios from '../../hooks/useAxios';
import productSchema from '../../schema/productSchema';

const AddProducts = () => {
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const history = useHistory();
  const http = useAxios();

  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(productSchema),
  });

  const url = `${BASE_URL}/products`;

  const onSubmit = async (data) => {
    setSubmitting(true);
    setServerError(null);

    console.log(data);

    try {
      const response = await http.post(url, data);
      console.log(response);
      history.push('/dashboard/products');
    } catch (err) {
      console.error(err);
      serverError(err.toString());
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardPage>
      <Heading content='Add product' />
      <form onSubmit={handleSubmit(onSubmit)}>
        {serverError && (
          <FormError>
            <p>{serverError}</p>
          </FormError>
        )}
        <fieldset disabled={submitting}>
          <div className='product-row'>
            <label>Title</label>
            <input name='title' placeholder='Title' ref={register} />
            {errors.title && (
              <FormError>
                {' '}
                <p>{errors.title}</p>
              </FormError>
            )}
          </div>

          <div className='product-row'>
            <label>Price</label>
            <input name='price' placeholder='Price' ref={register} />
            {errors.price && (
              <FormError>
                <p>{errors.price}</p>
              </FormError>
            )}
          </div>

          <div className='product-row'>
            <label>Description</label>
            <input
              name='description'
              placeholder='Description'
              ref={register}
            />
            {errors.description && (
              <FormError>
                <p>{errors.description}</p>
              </FormError>
            )}
          </div>

          <div className='product-row'>
            <label>Image URL</label>
            <input name='image_url' placeholder='Image url' ref={register} />
            {errors.image_url && (
              <FormError>
                <p>{errors.image_url}</p>
              </FormError>
            )}
          </div>

          <button>{submitting ? 'Submitting...' : 'Submit'}</button>
        </fieldset>
      </form>
    </DashboardPage>
  );
};

export default AddProducts;
