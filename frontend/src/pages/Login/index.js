import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const Login = () => {
  return (
    <section className="pages login-page section-padding">
      <Container>
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <div className="main-input padding60">
              <div className="log-title text-center">
                <h3><strong>Đăng nhập</strong></h3>
              </div>
              <div className="login-text">
                <div className="custom-input">
                  <form action="#">
                    <input type="text" name="email" placeholder="Email" />
                    <input type="password" name="password" placeholder="Mật khẩu" />
                    <a className="forget" href="#">Quên mật khẩu?</a>
                    <div className="submit-text text-center">
                      <button>Đăng nhập</button>
                    </div>
                    <br/>
                  </form>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Col md={3}></Col>
      </Container>
    </section>
  )
}

export default Login