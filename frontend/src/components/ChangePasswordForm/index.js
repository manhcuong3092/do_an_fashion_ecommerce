import axios from 'axios';
import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Loader from '~/layouts/Loader';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.warn('Nhập lại mật khẩu không khớp');
      return;
    }
    const formData = new FormData();
    formData.set('oldPassword', oldPassword);
    formData.set('password', password);
    formData.set('confirmPassword', confirmPassword);
    setLoading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axios.put('/api/v1/password/update', formData, config);
      if (data.success) {
        toast.success('Đổi mật khẩu thành công.');
        setOldPassword('');
        setPassword('');
        setConfirmPassword('');
        setOpen(!open);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setLoading(false);
  };

  return (
    <li className="panel panelimg">
      {loading && <Loader />}
      <div
        className="account-title"
        data-bs-toggle="collapse"
        data-bs-parent="#accordion"
        data-bs-target="#collapse2"
        onClick={() => setOpen(!open)}
      >
        <label>
          <span> Đổi mật khẩu</span>
        </label>
      </div>
      <Collapse id="collapse2" className="panel-collapse" in={open}>
        <div className="single-log-info">
          <h5>Đổi mật khẩu.</h5>
          <div className="custom-input">
            <form onSubmit={submitHandler}>
              <label>Mật khẩu cũ</label>
              <input
                type="password"
                name="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Mật khẩu cũ"
              />
              <label>Mật khẩu mới</label>
              <input
                type="password"
                name="password"
                placeholder="Mật khẩu mới"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Nhập lại mật khẩu</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Nhập lại mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className="submit-text">
                <button>Lưu</button>
              </div>
            </form>
          </div>
        </div>
      </Collapse>
    </li>
  );
};

export default ChangePassword;
