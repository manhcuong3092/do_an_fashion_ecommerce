import React, { Fragment, useEffect, useState } from 'react';
import validator from 'validator';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearErrors, register, googleLogin } from '../../redux/actions/authActions';
import { REGISTER_USER_RESET } from '../../redux/types/authActionTypes';
import Loader from '../../layouts/Loader';
import Metadata from '../../layouts/Metadata';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import { GoogleLogin } from '@react-oauth/google';

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phoneNo: '',
    password: '',
  });

  const { name, email, password, phoneNo } = user;
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { registed, error, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (registed) {
      toast.success('Đăng ký tài khoản thành công.');
      dispatch({ type: REGISTER_USER_RESET });
      navigate('/');
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, registed, error, navigate]);

  const onChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          // 0 == just created, 1 == processing, 2 == ready
          // setAvatarPreview(reader.result);
          // setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    dispatch(googleLogin(credentialResponse));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name) {
      toast.error('Hãy nhập họ tên');
      return;
    }
    if (!password || password.length < 6) {
      toast.error('Hãy nhập mật khẩu chứa ít nhất 6 ký tự');
      return;
    }
    if (!validator.isEmail(email)) {
      toast.error('Hãy nhập đúng email');
      return;
    }
    if (!validator.isNumeric(phoneNo) || phoneNo.length < 10) {
      toast.error('Hãy nhập đúng số điện thoại');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Nhập lại mật khẩu không khớp');
      return;
    }
    const formData = new FormData();
    formData.set('name', name);
    formData.set('email', email);
    formData.set('password', password);
    formData.set('phoneNo', phoneNo);
    dispatch(register(formData));
  };

  return (
    <Fragment>
      <Header />
      <section className="pages login-page section-padding">
        <Metadata title={'Đăng ký'} />
        {loading && <Loader />}
        <Container>
          <Row>
            <Col md={3}></Col>
            <Col md={6}>
              <div className="main-input padding60 new-customer">
                <div className="log-title text-center">
                  <h3>
                    <strong>Đăng ký tài khoản</strong>
                  </h3>
                </div>
                <div className="custom-input">
                  <form onSubmit={submitHandler}>
                    <label>
                      Họ tên <span className="text-danger">(*)</span>
                    </label>
                    <input type="text" name="name" placeholder="Họ Tên.." value={name} onChange={onChange} />
                    <label>
                      Email <span className="text-danger">(*)</span>
                    </label>
                    <input type="text" name="email" placeholder="Email.." value={email} onChange={onChange} />
                    <label>
                      Số điện thoại <span className="text-danger">(*)</span>
                    </label>
                    <input
                      type="text"
                      name="phoneNo"
                      placeholder="Số điện thoại.."
                      value={phoneNo}
                      onChange={onChange}
                    />
                    <label>
                      Mật khẩu <span className="text-danger">(*)</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Mật khẩu"
                      value={password}
                      onChange={onChange}
                    />
                    <label>
                      Nhập lại mật khẩu <span className="text-danger">(*)</span>
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Xác nhận mật khẩu"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <div className="submit-text text-center">
                      <button>Đăng ký</button>
                    </div>
                  </form>

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

export default Register;
