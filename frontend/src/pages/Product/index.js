import React from 'react'
import ProductDetail from '../../components/ProductDetail'
import ProductReview from '../../components/ProductReview'
import RelatedProducts from '../../components/RelatedProducts'

const Product = () => {
  return (
    <div class="product-details pages section-padding-top">
      <div class="container">
        <ProductDetail />
        <ProductReview />
        <RelatedProducts />
      </div>
    </div>
  )
}

export default Product