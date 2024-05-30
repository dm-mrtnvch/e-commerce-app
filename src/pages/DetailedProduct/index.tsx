import { useParams } from 'react-router-dom';
import { Page } from '../../components';

const DetailedProduct = () => {
  const { key } = useParams();

  return (
    <Page title={key ?? ''}>
      <h1>{key} Detailed Product Page</h1>
    </Page>
  );
};

export default DetailedProduct;
