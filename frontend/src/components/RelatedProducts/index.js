import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const RelatedProducts = () => {
  return (
    <section className="single-products section-padding">
      <Container>
        <Row>
          <Col>
            <div className="section-title text-center">
              <h2>related Products</h2>
            </div>
          </Col>
        </Row>
        <Row className="text-center">
          <Col md={6} lg={3}>
            <div className="single-product">
              <div className="product-img">
                <div className="pro-type">
                  <span>new</span>
                </div>
                <a href="#"><img src="img/products/1.jpg" alt="Product Title" /></a>
                <div className="actions-btn">
                  <a href="#"><i className="mdi mdi-cart"></i></a>
                  <a href="#" data-bs-toggle="modal" data-bs-target="#quick-view"><i className="mdi mdi-eye"></i></a>
                  <a href="#"><i className="mdi mdi-heart"></i></a>
                </div>
              </div>
              <div className="product-dsc">
                <p><a href="#">men’s Black t-shirt</a></p>
                <span>$65.20</span>
              </div>
            </div>
          </Col>

          <Col md={6} lg={3}>
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
                <span>$57.00</span>
              </div>
            </div>
          </Col>

          <Col md={6} lg={3} className="r-margin-top">
            <div className="single-product">
              <div className="product-img">
                <div className="pro-type">
                  <span>-15%</span>
                </div>
                <a href="#"><img src="img/products/3.jpg" alt="Product Title" /></a>
                <div className="actions-btn">
                  <a href="#"><i className="mdi mdi-cart"></i></a>
                  <a href="#" data-bs-toggle="modal" data-bs-target="#quick-view"><i className="mdi mdi-eye"></i></a>
                  <a href="#"><i className="mdi mdi-heart"></i></a>
                </div>
              </div>
              <div className="product-dsc">
                <p><a href="#">men’s Blue t-shirt</a></p>
                <span>$56.00</span>
              </div>
            </div>
          </Col>

          <Col md={6} lg={3} className="r-margin-top">
            <div className="single-product">
              <div className="product-img">
                <a href="#"><img src="img/products/4.jpg" alt="Product Title" /></a>
                <div className="actions-btn">
                  <a href="#"><i className="mdi mdi-cart"></i></a>
                  <a href="#" data-bs-toggle="modal" data-bs-target="#quick-view"><i className="mdi mdi-eye"></i></a>
                  <a href="#"><i className="mdi mdi-heart"></i></a>
                </div>
              </div>
              <div className="product-dsc">
                <p><a href="#">men’s White t-shirt</a></p>
                <span>$96.20</span>
              </div>
            </div>
          </Col>

        </Row>
      </Container>
    </section>
  )
}

export default RelatedProducts