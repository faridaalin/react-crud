// import { Link } from 'react-router-dom';
import Heading from '../layout/Heading';
import DashboardPage from '../dashboard/DashboardPage';
import ProductList from './ProductList';

const ProductPage = () => {
  return (
    <DashboardPage>
      <Heading size='3' content='Products' />
      <ProductList />
    </DashboardPage>
  );
};

export default ProductPage;
