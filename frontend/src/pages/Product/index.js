import React, { Fragment } from 'react'
import PageTitle from '../../components/PageTitle'
import ProductDetail from '../../components/ProductDetail'
import ProductReview from '../../components/ProductReview'
import RelatedProducts from '../../components/RelatedProducts'

const Product = () => {
  return (
    <Fragment>
      <PageTitle title={"Sản phẩm"} />
      <div class="product-details pages section-padding-top">
        <div class="container">
          <ProductDetail />
          <ProductReview />
          <RelatedProducts />
        </div>
      </div>
    </Fragment>
  )
}

export default Product