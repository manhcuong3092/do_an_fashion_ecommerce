import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { toast } from 'react-toastify';
import { END_POINT } from '../../config'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from '../../redux/actions/authActions';
import Loader from '../../layouts/Loader';
import Metadata from '../../layouts/Metadata';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  
  const { error, message, loading } = useSelector(state => state.forgotPassword);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      console.log(message);
      toast.success(message)
    }
  }, [dispatch, error, message])

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('email', email);
    dispatch(forgotPassword(formData));
  }


  return (
    <section className="pages login-page section-padding">
      <Metadata title={'Quên mật khẩu'} />
      { loading && (<Loader />)}
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