import React from 'react'
import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const PageTitle = ({title}) => {
  return (
    <div className="pages-title section-padding">
      <Container>
        <Row>
          <Col>
            <div className="pages-title-text text-center">
              <h2>{title}</h2>
              <ul className="text-left">
                <li><Link to="/">Trang chủ </Link></li>
                <li><span> // </span>{title}</li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default PageTitle