import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const GridProduct = () => {
  return (
    <div className="right-products">
      <Row>
        <div className="col-12">
          <div className="section-title clearfix">
            <ul>
              <li>
                <ul className="nav-view nav">
                  <li><a className="active" data-bs-toggle="tab" href="#grid"> <i className="mdi mdi-view-module"></i> </a></li>
                  <li><a data-bs-toggle="tab" href="#list"> <i className="mdi mdi-view-list"></i> </a></li>
                </ul>
              </li>
              <li className="sort-by floatright">
                Showing 1-9 of 89 Results
              </li>
            </ul>
          </div>
        </div>
      </Row>
      <Row>
        <div className="tab-content grid-content">
          <div className="tab-pane fade show active text-center" id="grid">
            <Row>
              <Col md={6} lg={4} className="mb-4">
                <div className="single-product">
                  <div className="product-img">
                    <div className="pro-type">
                      <span>new</span>
                    </div>
                    <a href="#"><img src="img/products/9.jpg" alt="Product Title" /></a>
                    <div className="actions-btn">
                      <a href="#"><i className="mdi mdi-cart"></i></a>
                      <a href="#" data-bs-toggle="modal" data-bs-target="#quick-view"><i className="mdi mdi-eye"></i></a>
                      <a href="#"><i className="mdi mdi-heart"></i></a>
                    </div>
                  </div>
                  <div className="product-dsc">
                    <p><a href="#">men’s Black t-shirt</a></p>
                    <div className="ratting">
                      <i className="mdi mdi-star"></i>
                      <i className="mdi mdi-star"></i>
                      <i className="mdi mdi-star"></i>
                      <i className="mdi mdi-star-half"></i>
                      <i className="mdi mdi-star-outline"></i>
                    </div>
                    <span>$65.20</span>
                  </div>
                </div>
              </Col>

              <Col md={6} lg={4} className="mb-4">
                <div className="single-product">
                  <div className="product-img">
                    <div className="pro-type sell">
                      <span>sell</span>
                    </div>
                    <a href="#"><img src="img/products/2.jpg" alt="Product Title" /></a>
                    <div className="actions-btn">
                      <a href="#"><i className="mdi mdi-cart"></i></a>
                      <a href="#" data-bs-toggle="modal" data-bs-target="#quick-view"><i className="mdi mdi-eye"></i></a>
                      <a href="#"><i className="mdi mdi-heart"></i></a>
                    </div>
                  </div>
                  <div className="product-dsc">
                    <p><a href="#">men’s White t-shirt</a></p>
                    <div className="ratting">
                      <i className="mdi mdi-star"></i>
                      <i className="mdi mdi-star"></i>
                      <i className="mdi mdi-star"></i>
                      <i className="mdi mdi-star-half"></i>
                      <i className="mdi mdi-star-outline"></i>
                    </div>
                    <span>$65.20</span>
                  </div>
                </div>
              </Col>

              <Col md={6} lg={4} className="mb-4">
                <div className="single-product">
                  <div className="product-img">
                    <div className="pro-type">
                      <span>-15</span>
                    </div>
                    <a href="#"><img src="img/products/8.jpg" alt="Product Title" /></a>
                    <div className="actions-btn">
                      <a href="#"><i className="mdi mdi-cart"></i></a>
                      <a href="#" data-bs-toggle="modal" data-bs-target="#quick-view"><i className="mdi mdi-eye"></i></a>
                      <a href="#"><i className="mdi mdi-heart"></i></a>
                    </div>
                  </div>
                  <div className="product-dsc">
                    <p><a href="#">men’s Black t-shirt</a></p>
                    <div className="ratting">
                      <i className="mdi mdi-star"></i>
                      <i className="mdi mdi-star"></i>
                      <i className="mdi mdi-star"></i>
                      <i className="mdi mdi-star-half"></i>
                      <i className="mdi mdi-star-outline"></i>
                    </div>
                    <span>$65.20</span>
                  </div>
                </div>
              </Col>
              
            </Row>
          </div>
        </div>
      </Row>
      <Row>
        <Col>
          <div className="pagnation-ul">
            <ul className="clearfix">
              <li><a href="#"><i className="mdi mdi-menu-left"></i></a></li>
              <li><a href="#">1</a></li>
              <li><a href="#">2</a></li>
              <li><a href="#">3</a></li>
              <li><a href="#">4</a></li>
              <li><a href="#">5</a></li>
              <li><a href="#">...</a></li>
              <li><a href="#">10</a></li>
              <li><a href="#"><i className="mdi mdi-menu-right"></i></a></li>
            </ul>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default GridProduct