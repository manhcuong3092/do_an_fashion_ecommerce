import React from 'react'
import QuickImages from './QuickImages'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ProductDetail = () => {
  return (
    <Row className="single-list-view">
      <QuickImages />
      <Col md={7} lg={8}>
        <div className="quick-right">
          <div className="list-text">
            <h3>men’s White t-shirt</h3>
            <span>Summer men’s fashion</span>
            <div className="ratting floatright">
              <p>( 27 Rating )</p>
              <i className="mdi mdi-star"></i>
              <i className="mdi mdi-star"></i>
              <i className="mdi mdi-star"></i>
              <i className="mdi mdi-star-half"></i>
              <i className="mdi mdi-star-outline"></i>
            </div>
            <h5><del>$79.30</del> $69.30</h5>
            <p>There are many variations of passages of Lorem Ipsum available, but the majority have be suffered alteration in some form, by injected humour, or randomised words which donot look even slightly believable. If you are going to use a passage of Lorem Ipsum, you neede be sure there isn't anything embarrassing hidden in the middle of text. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <div className="all-choose">
              <div className="s-shoose">
                <h5>Color</h5>
                <div className="color-select clearfix">
                  <span></span>
                  <span className="outline"></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className="s-shoose">
                <h5>size</h5>
                <div className="size-drop">
                  <div className="btn-group">
                    <button type="button" className="btn">XL</button>
                    <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    </button>
                    <ul className="dropdown-menu">
                      <li><a href="#">Xl</a></li>
                      <li><a href="#">SL</a></li>
                      <li><a href="#">S</a></li>
                      <li><a href="#">L</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="s-shoose">
                <h5>qty</h5>
                <form action="#">
                  <div className="plus-minus">
                    <a className="dec qtybutton">-</a>
                    <input type="text" value="02" name="qtybutton" className="plus-minus-box"/>
                      <a className="inc qtybutton">+</a>
                  </div>
                </form>
              </div>
            </div>
            <div className="list-btn">
              <a href="#">add to cart</a>
              <a href="#">wishlist</a>
              <a href="#" data-bs-toggle="modal" data-bs-target="#quick-view">zoom</a>
            </div>
            <div className="share-tag clearfix">
              <ul className="blog-share floatleft">
                <li><h5>share </h5></li>
                <li><a href="#"><i className="mdi mdi-facebook"></i></a></li>
                <li><a href="#"><i className="mdi mdi-twitter"></i></a></li>
                <li><a href="#"><i className="mdi mdi-linkedin"></i></a></li>
                <li><a href="#"><i className="mdi mdi-vimeo"></i></a></li>
                <li><a href="#"><i className="mdi mdi-dribbble"></i></a></li>
                <li><a href="#"><i className="mdi mdi-instagram"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default ProductDetail