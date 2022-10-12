import React, { Fragment } from 'react'
import PageTitle from '../../layouts/PageTitle'
import ProductDetail from '../../components/ProductDetail'
import ProductReview from '../../components/ProductReview'
import RelatedProducts from '../../components/RelatedProducts'
import Container from 'react-bootstrap/Container';
import Header from '../../layouts/Header'
import Footer from '../../layouts/Footer'

const Product = () => {
  return (
    <Fragment>
      <Header />
      <PageTitle title={"Sản phẩm"} />
      <div class="product-details pages section-padding-top">
        <Container>
          <ProductDetail />
          <ProductReview />
          <RelatedProducts />
        </Container>
      </div>
      <Footer />
    </Fragment>
  )
}

export default Product