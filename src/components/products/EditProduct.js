import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormError from '../common/formError/FormError';
import Heading from '../layout/Heading';
import DashboardPage from '../dashboard/DashboardPage';
import { BASE_URL } from '../../constants/api';
import useAxios from '../../hooks/useAxios';
import productSchema from '../../schema/productSchema';
import DeleteProductsButton from './DeleteProductsButton';

const EditProduct = () => {
  const [product, setProduct] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [updateError, setÚpdateError] = useState(null);
  const [fetchingProduct, setFetchingProduct] = useState(true);
  const [fetchError, serFetchError] = useState(null);
  const [updatingProduct, setUpdatingProduct] = useState(false);

  const http = useAxios();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(productSchema),
  });
  let { id } = useParams();
  const url = `${BASE_URL}/products/${id}`;

  useEffect(() => {
    const getProduct = async () => {
      try {
        const product = await http.get(url);

        setProduct(product.data);
      } catch (err) {
        serFetchError(err.toString());
      } finally {
        setFetchingProduct(false);
      }
    };

    getProduct();
  }, [http, url]);

  const onSubmit = async (data) => {
    setUpdatingProduct(true);
    setÚpdateError(null);
    setUpdated(false);

    try {
      await http.put(url, data);
    } catch (err) {
      setÚpdateError(err.toString());
    } finally {
      setFetchingProduct(false);
    }
  };

  if (fetchingProduct) return <div>Loading..</div>;

  if (fetchError) return <div>Error happened..</div>;

  return (
    <DashboardPage>
      <Heading content='Edit Product' />
      <h3>{product.title}</h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        {updated && <div className='success'>The product was updated</div>}

        {updateError && <FormError>{updateError}</FormError>}
        <div>
          <img src={product.image_url} width='100%' alt={product.title} />
        </div>
        <fieldset disabled={updatingProduct}>
          <div className='product-row'>
            <label>Title</label>
            <input
              name='title'
              defaultValue={product.title}
              placeholder='Title'
              ref={register}
            />
            {errors.title && <FormError>{errors.title}</FormError>}
          </div>

          <div className='product-row'>
            <label>Image URL</label>
            <input
              name='image_url'
              defaultValue={product.image_url}
              placeholder='Image url'
              ref={register}
            />
            {errors.image_url && <FormError>{errors.image_url}</FormError>}
          </div>

          <div className='product-row'>
            <label>Price</label>
            <input
              name='price'
              defaultValue={product.price}
              placeholder='Price'
              ref={register}
            />
            {errors.price && <FormError>{errors.price}</FormError>}
          </div>
          <div className='product-row'>
            <label>Description</label>
            <input
              name='description'
              defaultValue={product.description}
              placeholder='Description'
              ref={register}
            />
            {errors.price && <FormError>{errors.price}</FormError>}
          </div>

          <input type='submit' />
          <hr />
          <DeleteProductsButton id={product.id} title={product.title} />
        </fieldset>
      </form>
    </DashboardPage>
  );
};

export default EditProduct;
