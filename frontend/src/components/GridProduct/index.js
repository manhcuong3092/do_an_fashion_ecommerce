import React, { Fragment } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

const GridProduct = ({ products, resPerPage, filteredProductsCount, currentPage }) => {
  return (
    <Fragment>
      <Row>
        <div className="col-12">
          <div className="section-title clearfix">
            <ul>
              <li>
                <ul className="nav-view nav">
                  <li className="sort-by floatright">
                    Hiện thị {resPerPage * (currentPage - 1) + 1} - {resPerPage * currentPage} của{' '}
                    {filteredProductsCount} sản phẩm tìm thấy
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </Row>
      <Row>
        <div className="tab-content grid-content">
          <div className="tab-pane fade show active text-center" id="grid">
            <Row>
              {products &&
                products.map((product) => (
                  <Col md={6} lg={4} className="mb-4" key={product._id}>
                    <div className="single-product">
                      <div className="product-img">
                        <div className="pro-type">
                          <span>new</span>
                        </div>
                        <Link to={product.slug}>
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
                          {product.isSale
                            ? product.salePrice.toLocaleString('vi-VN')
                            : product.price.toLocaleString('vi-VN')}
                          ₫
                        </span>
                      </div>
                    </div>
                  </Col>
                ))}
            </Row>
          </div>
        </div>
      </Row>
    </Fragment>
  );
};

export default GridProduct;
