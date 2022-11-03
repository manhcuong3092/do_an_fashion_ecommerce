import React, { Fragment, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { SORT_ASC, SORT_DESC } from '~/constants/filterPrice';

const GridProduct = ({ products, resPerPage, filteredProductsCount, currentPage }) => {
  const [sort, setSort] = useState('Không');

  if (sort === SORT_ASC) {
    products = products.sort((a, b) => {
      if (a.price > b.price) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  if (sort === SORT_DESC) {
    products = products.sort((a, b) => {
      if (a.price < b.price) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  return (
    <Fragment>
      <Row>
        <div className="col-12">
          <div className="section-title clearfix">
            <ul>
              <li>
                <ul className="d-flex bd-highlight">
                  <li className="sort-by flex-grow-1 bd-highlight">
                    Hiện thị {resPerPage * (currentPage - 1) + 1} - {resPerPage * currentPage} của{' '}
                    {filteredProductsCount} sản phẩm tìm thấy
                  </li>
                  <li className="sort-by bd-highlight" style={{ marginRight: '5px' }}>
                    Sắp xếp: {sort}{' '}
                  </li>
                  <li className="bd-highlight ml-5 mt-2">
                    <Dropdown>
                      <Dropdown.Toggle variant="light" id="dropdown-basic">
                        <i className="fa-solid fa-sort"></i>
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item style={{ textTransform: 'none' }} onClick={() => setSort(SORT_ASC)}>
                          Giá tăng dần
                        </Dropdown.Item>
                        <Dropdown.Item style={{ textTransform: 'none' }} onClick={() => setSort(SORT_DESC)}>
                          Giá giảm dần
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
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
