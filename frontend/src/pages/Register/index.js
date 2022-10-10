import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const Register = () => {
  return (
    <section className="pages login-page section-padding">
      <Container>
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <div className="main-input padding60 new-customer">
              <div className="log-title text-center">
                <h3><strong>Đăng ký tài khoản</strong></h3>
              </div>
              <div className="custom-input">
                <form action="#">
                  <input type="text" name="name" placeholder="Họ Tên.." />
                  <input type="text" name="email" placeholder="Email.." />
                  <input type="text" name="number" placeholder="Số điện thoại.." />
                  <input type="password" name="password" placeholder="Mật khẩu" />
                  <input type="password" name="confirmPassword" placeholder="Xác nhận mật khẩu" />
                  <div className="submit-text text-center">
                    <button>Đăng ký</button>
                  </div>
                </form>
              </div>
            </div>
          </Col>
        </Row>
        <Col md={3}></Col>
      </Container>
    </section>
  )
}

export default Register