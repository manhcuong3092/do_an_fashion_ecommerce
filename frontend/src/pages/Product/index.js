import React, { Fragment, useEffect, useState } from 'react';
import PageTitle from '../../layouts/PageTitle';
import ProductDetail from '../../components/ProductDetail';
import ProductReview from '../../components/ProductReview';
import RelatedProducts from '../../components/RelatedProducts';
import Container from 'react-bootstrap/Container';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import axios from 'axios';
import { END_POINT } from '~/config';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Product = () => {
  const [product, setProduct] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate('navigate');

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await axios.get(`${END_POINT}/api/v1/product/${slug}`);
        if (data.product) {
          setProduct(data.product);
        } else {
          toast.error('Không tìm thấy sản phẩm này.');
          navigate('/shop');
        }
      } catch (error) {
        toast.error(error.response.data.message);
        navigate('/shop');
      }
    };
    getProduct();
  }, [navigate, slug]);

  return (
    <Fragment>
      <Header />
      <PageTitle title={'Sản phẩm'} />
      <div className="product-details pages section-padding-top">
        <Container>
          {product && (
            <Fragment>
              <ProductDetail product={product} />
              <ProductReview product={product} />
            </Fragment>
          )}
          <RelatedProducts />
        </Container>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Product;
