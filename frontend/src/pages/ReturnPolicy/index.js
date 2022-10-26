import React, { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import Footer from '../../layouts/Footer';
import Header from '../../layouts/Header';
import PageTitle from '../../layouts/PageTitle';

const ReturnPolicy = () => {
  return (
    <Fragment>
      <Header />
      <PageTitle title={'Chính sách đổi trả'} />
      <Container className="mt-3">
        <div classname="page-wrapper">
          <div classname="heading-page">
            <h1>Chính sách đổi hàng và bảo hành</h1>
          </div>
          <div classname="wrapbox-content-page">
            <div classname="content-page ">
              <p></p>
              <div classname="guarantee_content">
                <p>
                  <img
                    src="https://file.hstatic.net/1000401164/file/chinh-sach-khach-hang_a88ecec69cd447389252a7eb2c91e5b7_1024x1024.png"
                    alt="Chính sách bảo hành của AMANDO"
                    data-mce-src="https://file.hstatic.net/1000401164/file/chinh-sach-khach-hang_a88ecec69cd447389252a7eb2c91e5b7_1024x1024.png"
                  />
                </p>
                <h3 className="mt-3">I. ĐIỀU KIỆN ĐỔI HÀNG</h3>
                <ul>
                  <li>Sản phẩm phải còn nguyên vẹn, nguyên tem mác, chưa qua sử dụng và sửa chữa, không có mùi lạ.</li>
                  <li>
                    Thời gian kể từ khi nhận sản phẩm đối với mua hàng mua tại cửa hàng và online: không quá 7 ngày.
                  </li>
                </ul>
                <h3 className="mt-3">II. CHÍNH SÁCH ĐỔI SẢN PHẨM</h3>
                <ul>
                  <li>Hỗ trợ đổi size và mẫu tất cả sản phẩm</li>
                  <li>
                    Giá sản phẩm đổi mới được tính theo giá tại thời điểm khách mua hàng. Giá trị sản phẩm đổi mới phải
                    bằng hoặc cao hơn sản phẩm đã mua. Trường hợp khách hàng đổi sang sản phẩm có giá trị thấp hơn,
                    AMANDO không hoàn trả lại phí chênh lệch.
                  </li>
                  <li>Mỗi đơn hàng chỉ hỗ trợ đổi 1 lần.</li>
                  <li>Đối với sản phẩm giày: thời gian bảo hành keo đế là 3 tháng</li>
                  <li>Đối với đơn hàng mua tại cửa hàng không hỗ trợ đổi hàng nếu không vừa size</li>
                  <li>
                    AMANDO chỉ hỗ trợ phí đổi hàng online 2 chiều đối với các trường hợp: hàng bị lỗi, không đúng mẫu
                    hoặc không đúng size khách yêu cầu.
                    <br />
                  </li>
                </ul>
                <h6 className="mt-2">
                  <strong>LIÊN HỆ CHĂM SÓC KHÁCH HÀNG</strong>
                </h6>
                <ul>
                  <li>Email: cskh.thoitrangmando@gmail.com</li>
                  <li>Hotline : 097 8461 032 Hoặc 0978 419 935</li>
                  <li>
                    Fanpage:
                    <a href="https://www.facebook.com/MandoShop1" data-mce-href="https://www.facebook.com/MandoShop1">
                      {' '}
                      https://www.facebook.com/MandoShop1
                    </a>
                  </li>
                </ul>
                <h2 className="mt-2">Lưu ý</h2>
                <p>
                  Các cậu vui lòng không tự ý gửi hàng lại cho chúng tớ chưa thông qua xác nhận của bộ phận CSKH của
                  AMANDO. Nếu xảy ra tình trạng thất lạc hàng khi vận chuyển AMANDO không chịu trách nhiệm
                </p>
                <p>
                  Hãy liên hệ với bộ phận chăm sóc khách hàng qua website hoặc facebook hotline để được hướng dãn cách
                  đổi hàng
                </p>
                <p>Chúng tớ sẽ gửi lại sản phẩm sau khi nhận được sản phẩm gửi lại của các cậu.</p>
              </div>
              <p></p>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </Fragment>
  );
};

export default ReturnPolicy;
