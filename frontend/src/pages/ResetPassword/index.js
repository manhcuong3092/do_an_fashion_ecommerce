import React, { Fragment, useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearErrors, resetPassword } from '../../redux/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../layouts/Loader';
import Metadata from '../../layouts/Metadata';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, loading, success } = useSelector(state => state.forgotPassword);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success("Đặt lại mật khẩu thành công");
      navigate('/login')
    }
  }, [dispatch, navigate, error, success])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('password', password);
    formData.set('confirmPassword', confirmPassword);
    dispatch(resetPassword(token, formData));
  }
  return (
    <Fragment>
      <Header />
      <section className="pages login-page section-padding">
        <Metadata title={'Đặt lại mật khẩu'} />
        {loading && (<Loader />)}
        <Container>
          <Row>
            <Col md={3}></Col>
            <Col md={6}>
              <div className="main-input padding60">
                <div className="log-title text-center">
                  <h3><strong>Đặt lại mật khẩu</strong></h3>
                </div>
                <div className="login-text">
                  <div className="custom-input">
                    <form onSubmit={handleSubmit}>
                      <input type="password" name="password" placeholder="Mật khẩu"
                        value={password} onChange={e => setPassword(e.target.value)} />
                      <input type="password" name="confirmPassword" placeholder="Nhập lại mật khẩu"
                        value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
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
      <Footer />
    </Fragment>
  )
}

export default ResetPassword