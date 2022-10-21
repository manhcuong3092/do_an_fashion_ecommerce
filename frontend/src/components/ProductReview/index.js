import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ProductReview = ({ product }) => {
  const [tab, setTab] = useState(1);

  return (
    <Row>
      <Col>
        <div className="reviews padding60 margin-top">
          <ul className="reviews-tab clearfix nav">
            <li>
              <a className={tab === 1 ? 'active' : ''} data-bs-toggle="tab" href="#moreinfo" onClick={() => setTab(1)}>
                Xem thêm thông tin
              </a>
            </li>
            <li>
              <a className={tab !== 1 ? 'active' : ''} data-bs-toggle="tab" href="#reviews" onClick={() => setTab(2)}>
                Đánh giá
              </a>
            </li>
          </ul>
          <div className="tab-content">
            <div className={`info-reviews moreinfo tab-pane fade ${tab === 1 ? 'show active' : ''}`} id="moreinfo">
              <p>{product.detailDescription}</p>
              <br />
              <p>
                <img src="https://file.hstatic.net/1000401164/file/bang-size-thoi-trang-mando_57eabce095c84eb09ccc04979b0b128c_grande.png" />
              </p>
              <br />
              Thiết kế basic cho bạn nhiều lựa chọn phối đồ với nhiều phong cách khác nhau. Các cậu có thể mix cùng một
              chiếc âu khi đi làm đi học. Với một buổi đi chơi thì một chiếc quần short là một lựa chọn hợp lý nha.
              Hướng dẫn đặt hàng Để đặt hàng sản phẩm trên website cậu làm theo hướng dẫn sau nha <br /> Bước 1: Chọn
              màu và size phù hợp với bạn, thêm vào giỏ hàng <br />
              Bước 2: Tiến hành thanh toán - Điền đẩy đủ thông tin: tên người nhận, số điện thoại, địa chỉ cụ thể khi
              nhận hàng <br /> Bước 3: Chọn hình thức thanh toán và bấm hoàn thành <br />
              <p>
                <br />
                <img src="https://file.hstatic.net/1000401164/file/chinh-sach-khach-hang_a88ecec69cd447389252a7eb2c91e5b7_grande.png" />
              </p>
              <p>
                <br />
                <b>
                  Khi nhận sản phẩm bạn hãy kiểm tra thật kĩ sản phẩm các bạn nhé, nếu có vấn đề gì với sản phẩm hãy
                  liên hệ lại với chúng mình ngay nha
                </b>
              </p>
            </div>
            <div className={`info-reviews moreinfo tab-pane fade ${tab !== 1 ? 'show active' : ''}`} id="reviews">
              <div className="about-author">
                <div className="autohr-text">
                  <img src="img/blog/author1.png" alt="" />
                  <div className="author-des">
                    <h4>
                      <a href="#">Nam Trần</a>
                    </h4>
                    <span className="floatright ratting">
                      <i className="mdi mdi-star"></i>
                      <i className="mdi mdi-star"></i>
                      <i className="mdi mdi-star"></i>
                      <i className="mdi mdi-star-half"></i>
                      <i className="mdi mdi-star-outline"></i>
                    </span>
                    <span>27 Jun, 2021 at 2:30pm</span>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer accumsan egestas eleifend.
                      Phasellus a felis at est bibenes dum feugiat ut eget eni Praesent et messages in consectetur.
                    </p>
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
  );
};

export default ProductReview;
