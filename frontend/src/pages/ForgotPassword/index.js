import React, { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { toast } from 'react-toastify';
import { END_POINT } from '../../config'

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const { data } = await axios.post(`${END_POINT}/api/v1/password/forgot`, { email }, config);
      toast.success(data.message);
      setEmail('');
    } catch (error) {
      toast.error(error.response.data.message);
    }

  }

  return (
    <section className="pages login-page section-padding">
      <Container>
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <div className="main-input padding60">
              <div className="log-title text-center">
                <h3><strong>Quên mật khẩu</strong></h3>
              </div>
              <div className="login-text">
                <div className="custom-input">
                  <form onSubmit={handleSubmit}>
                    <input type="text" name="email" placeholder="Email"
                      value={email}
                      onChange={e => setEmail(e.target.value)} />
                    <div className="submit-text text-center">
                      <button>Đặt lại</button>
                    </div>
                    <br />
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

export default ForgotPassword