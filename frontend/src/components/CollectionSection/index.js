import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

const CollectionSection = () => {
  return (
    <section className="collection-area collection-area2 section-padding">
      <Container>
        <Row>
          <Col md={4}>
            <div className="single-colect banner collect-one">
              <Link><img src="img/collect/4.jpg" alt="" /></Link>
            </div>
          </Col>
          <Col md={4}>
            <div className="colect-text ">
              <h4><Link>Sưu tập thời trang 2022</Link></h4>
              <h5>Giảm giá sản phẩm <br /> Lên tới 30%!</h5>
              <Link>Mua ngay <i className="mdi mdi-arrow-right"></i></Link>
            </div>
            <div className="collect-img banner margin single-colect">
              <Link><img src="img/collect/5.jpg" alt="" /></Link>
            </div>
          </Col>
          <Col md={4}>
            <div className="collect-img banner single-colect">
              <Link><img src="img/collect/6.jpg" alt="" /></Link>
            </div>
            <div className="colect-text ">
              <h4><Link>Sưu tập thời trang 2022</Link></h4>
              <p>AMANDO là thương hiệu thời trang nam dành cho giới trẻ theo phong cách Hàn Quốc.</p>
              <Link>Mua ngay <i className="mdi mdi-arrow-right"></i></Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default CollectionSection