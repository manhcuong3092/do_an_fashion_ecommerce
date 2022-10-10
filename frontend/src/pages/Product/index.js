import React, { Fragment } from 'react'
import PageTitle from '../../layouts/PageTitle'
import ProductDetail from '../../components/ProductDetail'
import ProductReview from '../../components/ProductReview'
import RelatedProducts from '../../components/RelatedProducts'
import Container from 'react-bootstrap/Container';

const Product = () => {
  return (
    <Fragment>
      <PageTitle title={"Sản phẩm"} />
      <div class="product-details pages section-padding-top">
        <Container>
          <ProductDetail />
          <ProductReview />
          <RelatedProducts />
        </Container>
      </div>
    </Fragment>
  )
}

export default Product