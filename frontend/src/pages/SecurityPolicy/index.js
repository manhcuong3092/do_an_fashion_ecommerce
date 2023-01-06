import React, { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import Footer from '../../layouts/Footer';
import Header from '../../layouts/Header';
import PageTitle from '../../layouts/PageTitle';

const SecurityPolicy = () => {
  return (
    <Fragment>
      <Header />
      <PageTitle title={'Chính sách bảo mật'} />
      <Container className="mt-3">
        <div classname="page-wrapper">
          <div classname="heading-page">
            <h1>Chính sách bảo mật thông tin khách hàng</h1>
          </div>
          <div classname="wrapbox-content-page">
            <div classname="content-page ">
              <h3 classname="titlesingleNews mt-3">
                <strong>1. Mục đích và phạm vi thu thập</strong>
              </h3>
              <p>
                Dữ liệu thu thập&nbsp; của khách hàng mua hàng trên website: amandofashion.vn bao gồm các thông tin:
              </p>
              <p>Họ tên, địa chỉ, số điện thoại nhận hàng, email</p>
              <p>
                Đây là những thông tin cơ bản để đảm bảo giao dịch gửi hàng đến cho các khách hàng tại shop trên
                website. Ngoài những thông tin trên chúng tớ không lưu trữ bất kì thông tin nào liên quan đến, mật khẩu
                đăng nhập ( đối với tài khoản thành viên), thông tin, số tài khoản ngân hàng khi thanh toán qua thẻ ngân
                hàng. Các thông tin trên khách hàng vui lòng lưu giữ và bảo mật cẩn thận.
              </p>
              <p>
                Ngoài ra hãy thông báo cho chúng tớ biết nếu các các cậu gặp phải những hành vi vi phạm điều khoản bảo
                mật, lạm dụng tên đăng kí, lưu trữ bất hợp pháp dữ liệu của các bên thứ 3 để có hướng giải quyết nhanh
                nhất.
              </p>
              <h3 className="mt-3">
                <strong>2.Phạm vi sử dụng thông tin</strong>
                <br />
              </h3>
              <p>AMANDO sử dụng thông tin nhằm mục đích</p>
              <p>- Gửi hàng hóa đến với khách hàng</p>
              <p>- Gửi các thông báo về các hoạt động khuyến mãi, chương trình mới... của AMANDO.</p>
              <p>- Không sử dụng thông tin của khách hàng với các mục đích khác</p>
              <p>
                - Trong trường hợp cần hỗ trợ của pháp luật: AMANDO có trách nhiệm phối hợp điều tra làm rõ tình hình.
              </p>
              <h3 className="mt-3">
                <strong>3. Địa chỉ đơn vị thu thập và quản lý thông tin&nbsp;</strong>
              </h3>
              <p>Công ty TNHH Đầu tư và phát triển AMANDO</p>
              <p>Địa chỉ: tầng 6, số 2 ngõ 18 Phạm Hùng, Quận Nam Từ Liêm, Hà Nội</p>
              <p>Email: cskh.thoitrangmando@gmail.com</p>
              <p>Điện thoại: 0978.461.032</p>
              <h3 className="mt-3">
                <strong>4.Cam kết bảo mật thông tin cá nhân khách hàng</strong>
              </h3>
              <p>
                - Không sử dụng, chuyển giao, cung cấp thông tin khách hàng với bên thứ 3 nếu không có sự đồng ý của
                khách hàng.&nbsp;
              </p>
              <p>
                - Trong trường hợp máy chủ bị tấn công dẫn đến mất mát dữ liệu AMANDO sẽ có trách nhiệm thông với với
                các cơ quan chức năng giải quyết và báo cho khách hàng về sự việc xảy ra.
                <br />
                <br />
              </p>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </Fragment>
  );
};

export default SecurityPolicy;
