import { useState, useEffect } from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import { BASE_URL } from '../../constants/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const http = useAxios();

  useEffect(() => {
    async function getAllProducts() {
      try {
        const response = await http.get(`${BASE_URL}/products`);

        if (response.status !== 200) {
          setError(error);
        } else {
          setProducts(response.data);
        }
      } catch (error) {
        console.log(error);
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getAllProducts();
  }, [error, http]);

  if (loading) return <div>Loading..</div>;
  if (error) return <div>An error happened..</div>;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <Link to={`/dasboard/products/edit/${product.id}`}>EDIT PRODUCT</Link>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
