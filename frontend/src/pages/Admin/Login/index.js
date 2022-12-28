import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { Col, Container, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Metadata from '~/layouts/Metadata';
import { clearErrors, login, logout } from '~/redux/actions/authActions';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, error, loading, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      if (user && user.role === 'admin') {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
          ? `Bearer ${localStorage.getItem('jwtToken')}`
          : '';
        toast.success('Đăng nhập thành công.');
        navigate('/admin/dashboard');
      }
      if (user && user.role !== 'admin') {
        toast.error('Tài khoản không có quyền truy cập vào trang quản trị');
        dispatch(logout());
      }
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, navigate, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Fragment>
      <Metadata title={'Đăng nhập quản trị'} />
      <div class="container-fluid" style={{ height: '1000px', background: '#ccc' }}>
        <Container>
          <div class="row justify-content-center">
            <Col lg={5}>
              <div class="card shadow-lg border-0 rounded-lg mt-5">
                <div class="card-header">
                  <h3 class="text-center font-weight-light my-4">Đăng nhập quản trị</h3>
                </div>
                <div class="card-body">
                  <Form onSubmit={submitHandler}>
                    <div class="form-floating mb-3">
                      <input
                        class="form-control"
                        id="inputEmail"
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label htmlFor="inputEmail">Email</label>
                    </div>
                    <div class="form-floating mb-3">
                      <input
                        class="form-control"
                        id="inputPassword"
                        type="password"
                        name="password"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label htmlFor="inputPassword">Mật khẩu</label>
                    </div>
                    <div class="d-flex align-items-center justify-content-center mt-4 mb-0">
                      <button class="btn btn-primary">Đăng nhập</button>
                    </div>
                  </Form>
                </div>
              </div>
            </Col>
          </div>
        </Container>
      </div>
    </Fragment>
  );
};

export default AdminLogin;
