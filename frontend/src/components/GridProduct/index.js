import React, { Fragment } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const GridProduct = ({ products }) => {
  return (
    <Fragment>
      <Row>
        <div className="col-12">
          <div className="section-title clearfix">
            <ul>
              <li>
                <ul className="nav-view nav">
                  <li>
                    <a className="active" data-bs-toggle="tab" href="#grid">
                      {' '}
                      <i className="mdi mdi-view-module"></i>{' '}
                    </a>
                  </li>
                  <li>
                    <a data-bs-toggle="tab" href="#list">
                      {' '}
                      <i className="mdi mdi-view-list"></i>{' '}
                    </a>
                  </li>
                  <li className="sort-by floatright">Showing 1-9 of 89 Results</li>
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
                  <Col md={6} lg={4} className="mb-4">
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
                          <Link to={product.slug}>{product.name}</Link>
                        </p>
                        <span>{product.price}đ</span>
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
