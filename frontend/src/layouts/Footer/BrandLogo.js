import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const BrandLogo = () => {
  return (
    <div className="brand-logo">
      <Container>
        <Row>
          <Col>
            <div className="barnd-bg">
              <a href="#"><img src="img/brand/1.png" alt="Brand Logo" /></a>
              <a href="#"><img src="img/brand/2.png" alt="Brand Logo" /></a>
              <a href="#"><img src="img/brand/3.png" alt="Brand Logo" /></a>
              <a href="#"><img src="img/brand/4.png" alt="Brand Logo" /></a>
              <a href="#"><img src="img/brand/5.png" alt="Brand Logo" /></a>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default BrandLogo