import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import brand1 from '../../assets/img/brand/1.png';
import brand2 from '../../assets/img/brand/2.png';
import brand3 from '../../assets/img/brand/3.png';
import brand4 from '../../assets/img/brand/4.png';
import brand5 from '../../assets/img/brand/5.png';
import { Link } from 'react-router-dom';

const BrandLogo = () => {
  return (
    <div className="brand-logo">
      <Container>
        <Row>
          <Col>
            <div className="barnd-bg">
              <Link><img src={brand1} alt="Brand Logo" /></Link>
              <Link><img src={brand2} alt="Brand Logo" /></Link>
              <Link><img src={brand3} alt="Brand Logo" /></Link>
              <Link><img src={brand4} alt="Brand Logo" /></Link>
              <Link><img src={brand5} alt="Brand Logo" /></Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default BrandLogo