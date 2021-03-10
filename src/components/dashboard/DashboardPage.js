import Heading from '../layout/Heading';
import { Link } from 'react-router-dom';

export default function DashboardPage({ children }) {
  return (
    <>
      <Heading content='Dashboard' />
      <nav>
        Sections: <Link to='/dashboard/products'>Products</Link>
      </nav>
      {children ? children : <p>Select a page</p>}
    </>
  );
}
