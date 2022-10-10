import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const FooterBottom = () => {
  return (
    <div className="footer-bottom">
      <Container>
        <Row>
          <Col md={6}>
            <p className="copy-text"> © 2022 <strong>Amado</strong> Made With <i className="mdi mdi-heart" style={{'color': 'red'}} aria-hidden="true"></i> By <a className="company-name" href="https://themeforest.net/user/codecarnival/portfolio">
              <strong> ManhCuong</strong></a>.</p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <a href="#"><img src="img/footer/payment.png" alt="" /></a>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default FooterBottom