import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const ProductReview = () => {
  return (
    <Row>
      <Col>
        <div className="reviews padding60 margin-top">
          <ul className="reviews-tab clearfix nav">
            <li><a data-bs-toggle="tab" href="#moreinfo">Xem thêm thông tin</a></li>
            <li><a className="active" data-bs-toggle="tab" href="#reviews">Đánh giá</a></li>
          </ul>
          <div className="tab-content">
            <div className="info-reviews moreinfo tab-pane fade" id="moreinfo">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla augue nec est tristique auctor. Donec non est at libero vulputate rutrum. Morbi ornare lectus quis justo gravida semper. Nulla tellus mi, vulputate adipiscing cursus eu, suscipit id nulla. Donec a neque libero. Pellentesque aliquet, sem eget laoreet ultrices, ipsum metus feugiat sem, quis fermentum turpis eros eget velit. Donec ac tempus ante. Fusce ultricies massa massa. Fusce aliquam, purus eget sagittis vulputate, sapien libero hendrerit est, sed commodo augue nisi non neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor, lorem et placerat vestibulum, metus nisi posuere nisl, in accumsan elit odio quis mi. Cras neque metus, consequat et blandit et, luctus a nunc. Etiam gravida vehicula tellus, in imperdiet ligula euismod eget. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam erat mi, rutrum at sollicitudin rhoncus, ultricies posuere erat. Duis convallis, arcu nec aliquam consequat, purus felis vehicula felis, a dapibus enim lorem nec augue.</p>
            </div>
            <div className="info-reviews review-text tab-pane fade show active" id="reviews">
              <div className="about-author">
                <div className="autohr-text">
                  <img src="img/blog/author1.png" alt="" />
                  <div className="author-des">
                    <h4><a href="#">Nam Trần</a></h4>
                    <span className="floatright ratting">
                      <i className="mdi mdi-star"></i>
                      <i className="mdi mdi-star"></i>
                      <i className="mdi mdi-star"></i>
                      <i className="mdi mdi-star-half"></i>
                      <i className="mdi mdi-star-outline"></i>
                    </span>
                    <span>27 Jun, 2021 at 2:30pm</span>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer accumsan egestas eleifend. Phasellus a felis at est bibenes dum feugiat ut eget eni Praesent et messages in consectetur.</p>
                  </div>
                </div>
              </div>
              <hr />
              <div className="your-rating log-title">
                <h3>leave your review</h3>
                <h5>Your rating</h5>
                <div className="rating clearfix">
                  <ul>
                    <li>
                      <a href="#">
                        <i className="mdi mdi-star-outline"></i>
                      </a>
                      <span>|</span>
                    </li>
                    <li>
                      <a href="#">
                        <i className="mdi mdi-star-outline"></i>
                        <i className="mdi mdi-star-outline"></i>
                      </a>
                      <span>|</span>
                    </li>
                    <li>
                      <a href="#">
                        <i className="mdi mdi-star-outline"></i>
                        <i className="mdi mdi-star-outline"></i>
                        <i className="mdi mdi-star-outline"></i>
                      </a>
                      <span>|</span>
                    </li>
                    <li>
                      <a href="#">
                        <i className="mdi mdi-star-outline"></i>
                        <i className="mdi mdi-star-outline"></i>
                        <i className="mdi mdi-star-outline"></i>
                        <i className="mdi mdi-star-outline"></i>
                      </a>
                      <span>|</span>
                    </li>
                    <li>
                      <a href="#">
                        <i className="mdi mdi-star-outline"></i>
                        <i className="mdi mdi-star-outline"></i>
                        <i className="mdi mdi-star-outline"></i>
                        <i className="mdi mdi-star-outline"></i>
                        <i className="mdi mdi-star-outline"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="custom-input">
                <form action="#">
                  <Row>
                    <Col md={6}>
                      <div className="input-mail">
                        <input type="text" name="name" placeholder="Your Name" />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="input-mail">
                        <input type="text" name="email" placeholder="Your Email" />
                      </div>
                    </Col>
                    <Col>
                      <div className="custom-mess">
                        <textarea name="message" placeholder="Your Review" rows="2"></textarea>
                      </div>
                    </Col>
                    <Col>
                      <div className="submit-text">
                        <button type="submit">submit review</button>
                      </div>
                    </Col>
                  </Row>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default ProductReview