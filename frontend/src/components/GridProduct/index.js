import React, { Fragment } from 'react';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

const GridProduct = ({ products }) => {
  return (
    <Fragment>
      {products &&
        products.map((product) => (
          <Col md={6} lg={4} className="mb-4" key={product._id}>
            <div className="single-product">
              <div className="product-img">
                {product.isSale && (
                  <div className="pro-type">
                    <span>sale</span>
                  </div>
                )}
                <Link to={`/product/${product.slug}`}>
                  <img src={product.images[0] && product.images[0].url} alt="Product Title" />
                </Link>
              </div>
              <div className="product-dsc">
                <p>
                  <Link to={`/product/${product.slug}`}>{product.name}</Link>
                </p>
                <p className="text-decoration-line-through">
                  {product.isSale && `${product.price.toLocaleString('vi-VN')}₫`}
                </p>
                <span>
                  {product.isSale ? product.salePrice.toLocaleString('vi-VN') : product.price.toLocaleString('vi-VN')}₫
                </span>
              </div>
            </div>
          </Col>
        ))}
      {products && products.length === 0 && <h5>Không tìm thấy sản phẩm nào</h5>}
    </Fragment>
  );
};

export default GridProduct;
