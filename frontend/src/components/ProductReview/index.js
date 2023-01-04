import React, { Fragment, useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { END_POINT } from '~/config';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const ProductReview = ({ product }) => {
  const [tab, setTab] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const config = {
          headers: {
            'Content-type': 'application/json',
          },
          withCredentials: true,
        };
        const { data } = await axios.get(`${END_POINT}/api/v1/reviews?productId=${product._id}`, config);
        setReviews(data.reviews);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    getReviews();
  }, [product]);

  const reviewHandler = async (e) => {
    e.preventDefault();
    try {
      const reviewData = { rating, comment, productId: product._id };
      const config = {
        withCredentials: true,
      };
      const { data } = await axios.post(`${END_POINT}/api/v1/review`, reviewData, config);
      if (data.success) {
        setReviews(data.reviews);
        setComment('');
        toast.success('Gửi đánh giá thành công.');
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast.error('Bạn phải đăng nhập mới có thể bình luận');
      } else {
        toast.error(error.response.data.message);
      }
    }
  };

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
              <p style={{ whiteSpace: 'pre-line' }}>{product.detailDescription}</p>
              <br />
              <p>
                <img
                  alt="img"
                  src="https://file.hstatic.net/1000401164/file/bang-size-thoi-trang-mando_57eabce095c84eb09ccc04979b0b128c_grande.png"
                />
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
                <img
                  alt="img"
                  src="https://file.hstatic.net/1000401164/file/chinh-sach-khach-hang_a88ecec69cd447389252a7eb2c91e5b7_grande.png"
                />
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
              {reviews && reviews.length > 0 ? (
                reviews.map((item, index) => (
                  <Fragment key={index}>
                    <div className="about-author" key={index}>
                      <div className="autohr-text">
                        <img src={item.user.avatar && item.user.avatar.url} alt="" className="rounded-circle" />
                        <div className="author-des">
                          <h4>
                            <a href="#!">{item.user.name}</a>
                          </h4>
                          <span className="floatright ratting">
                            {(() => {
                              let stars = [];
                              for (let i = 1; i <= 5; i++) {
                                if (item.rating >= i) {
                                  stars.push(<i className="mdi mdi-star" key={i}></i>);
                                } else {
                                  stars.push(<i className="mdi mdi-star-outline" key={i}></i>);
                                }
                              }
                              return stars;
                            })()}
                          </span>
                          <span>{new Date(Date.parse(item.createdAt)).toLocaleDateString('vi-VN')}</span>
                          <p>{item.comment}</p>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </Fragment>
                ))
              ) : (
                <h6>Chưa có nhận xét</h6>
              )}
              <div className="your-rating log-title">
                <h3>Để lại bình luận của bạn</h3>
                <h6>Đánh giá</h6>
                <div className="rating clearfix">
                  <ul>
                    <li>
                      <Link className={rating === 1 ? 'rating-active' : ''} onClick={() => setRating(1)}>
                        <i className="mdi mdi-star-outline"></i>
                      </Link>
                      <span>|</span>
                    </li>
                    <li>
                      <Link className={rating === 2 ? 'rating-active' : ''} onClick={() => setRating(2)}>
                        <i className="mdi mdi-star-outline"></i>
                        <i className="mdi mdi-star-outline"></i>
                      </Link>
                      <span>|</span>
                    </li>
                    <li>
                      <Link className={rating === 3 ? 'rating-active' : ''} onClick={() => setRating(3)}>
                        <i className="mdi mdi-star-outline"></i>
                        <i className="mdi mdi-star-outline"></i>
                        <i className="mdi mdi-star-outline"></i>
                      </Link>
                      <span>|</span>
                    </li>
                    <li>
                      <Link className={rating === 4 ? 'rating-active' : ''} onClick={() => setRating(4)}>
                        <i className="mdi mdi-star-outline"></i>
                        <i className="mdi mdi-star-outline"></i>
                        <i className="mdi mdi-star-outline"></i>
                        <i className="mdi mdi-star-outline"></i>
                      </Link>
                      <span>|</span>
                    </li>
                    <li>
                      <Link className={rating === 5 ? 'rating-active' : ''} onClick={() => setRating(5)}>
                        <i className="mdi mdi-star-outline"></i>
                        <i className="mdi mdi-star-outline"></i>
                        <i className="mdi mdi-star-outline"></i>
                        <i className="mdi mdi-star-outline"></i>
                        <i className="mdi mdi-star-outline"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="custom-input">
                <form onSubmit={reviewHandler}>
                  <div className="custom-mess">
                    <textarea
                      name="message"
                      placeholder="Nhận xét"
                      rows="2"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="submit-text">
                    <button type="submit">Gửi đánh giá</button>
                  </div>
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
