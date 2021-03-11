import { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import { BASE_URL } from '../../constants/api';

const DeleteProductsButton = ({ id, title }) => {
  const [error, setError] = useState(null);
  const http = useAxios();
  const history = useHistory();

  const url = `${BASE_URL}/products/${id}`;

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this product? ${title}`
    );
    if (confirmDelete) {
      try {
        await http.delete(url);
        history.push('/dashboard/products');
      } catch (err) {
        setError(error);
      }
    }
  };
  const styles = {
    width: '100%',
    padding: '8px 0',
    background: 'red',
    color: 'black',
  };

  return (
    <button type='button' style={styles} onClick={handleDelete}>
      Delete Product
    </button>
  );
};

DeleteProductsButton.prototype = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default DeleteProductsButton;
