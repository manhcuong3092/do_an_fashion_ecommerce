import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { toast } from 'react-toastify';
import { clearErrors, login, googleLogin } from '../../redux/actions/authActions';
import Loader from '../../layouts/Loader';
import Metadata from '../../layouts/Metadata';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, error, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
      toast.success('Đăng nhập thành công.');
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const handleGoogleLogin = async (credentialResponse) => {
    dispatch(googleLogin(credentialResponse));
  };

  return (
    <Fragment>
      <Header />
      <section className="pages login-page section-padding">
        <Metadata title={'Đăng nhập'} />
        {loading && <Loader />}
        <Container>
          <Row>
            <Col md={3}></Col>
            <Col md={6}>
              <div className="main-input padding60">
                <div className="log-title text-center">
                  <h3>
                    <strong>Đăng nhập</strong>
                  </h3>
                </div>
                <div className="login-text">
                  <div className="custom-input">
                    <form onSubmit={submitHandler}>
                      <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <input
                        type="password"
                        name="password"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <Link className="forget" to="/password/forgot">
                        Quên mật khẩu?
                      </Link>
                      <div className="submit-text text-center">
                        <button>Đăng nhập</button>
                      </div>
                      <br />
                      <br />
                      <GoogleLogin
                        onSuccess={(credentialResponse) => {
                          handleGoogleLogin(credentialResponse);
                        }}
                        onError={() => {
                          console.log('Login Failed');
                        }}
                      />
                    </form>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          <Col md={3}></Col>
        </Container>
      </section>
      <Footer />
    </Fragment>
  );
};

export default Login;
