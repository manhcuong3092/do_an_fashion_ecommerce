import { Avatar } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import validator from 'validator';
import Loader from '~/layouts/Loader';

const ProfileForm = () => {
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [avatar, setAvatar] = useState('');
  const [curentAvatar, setCurentAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAddress(user.address);
      setPhoneNo(user.phoneNo);
      setCity(user.city);
      setCurentAvatar(user.avatar);
    }
  }, [user]);

  const onChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          // 0 == just created, 1 == processing, 2 == ready
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const validateData = () => {
    if (!name) {
      toast.warn('Vui lòng nhập họ tên');
      return false;
    }
    if (!phoneNo) {
      toast.warn('Vui lòng nhập số điện thoại');
      return false;
    } else if (!phoneNo.match(/\d{10,11}/)) {
      toast.warn('Số điện thoại gồm 10 - 11 số');
      return false;
    }
    if (!city) {
      toast.warn('Vui lòng nhập tỉnh/thành phố');
      return false;
    }
    if (!address) {
      toast.warn('Vui lòng nhập địa chỉ');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateData) {
      return;
    }
    const formData = new FormData();
    formData.set('name', name);
    formData.set('phoneNo', phoneNo);
    formData.set('address', address);
    formData.set('city', city);
    formData.set('avatar', avatar);

    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      await axios.put('/api/v1/me/update', formData, config);
      toast.success('Cập nhật thông tin thành công.');
      setOpen(!open);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setLoading(false);
  };

  return (
    <li className="panel">
      {loading && <Loader />}
      <div
        className="account-title"
        data-bs-toggle="collapse"
        data-bs-parent="#accordion"
        data-bs-target="#collapse1"
        onClick={() => setOpen(!open)}
      >
        <label>
          <span> Thông tin cá nhân</span>
        </label>
      </div>
      <Collapse id="collapse1" in={open} className="panel-collapse">
        <div className="single-log-info">
          <h5>Chỉnh sửa thông tin các nhân.</h5>
          <div className="custom-input">
            <form onSubmit={handleSubmit}>
              <label>Họ tên</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Họ tên"
              />
              <label>Email</label>
              <input type="text" name="email" value={email} placeholder="Email" disabled />
              <label>Số điện thoại</label>
              <input
                type="text"
                name="phone"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                placeholder="Số điện thoại"
              />
              <label>Tỉnh thành phố</label>
              <input
                type="text"
                name="state"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Tỉnh thành phố"
              />
              <label>Địa chỉ</label>
              <input
                type="text"
                name="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Địa chỉ"
              />
              <div>
                <label>Ảnh đại diện</label>
                <div className="d-flex align-items-center my-2">
                  {avatarPreview ? (
                    <Avatar alt="user" src={avatarPreview} sx={{ width: 100, height: 100 }} />
                  ) : (
                    <Avatar alt="user" src={curentAvatar && curentAvatar.url} sx={{ width: 100, height: 100 }} />
                  )}
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    accept="image/*"
                    onChange={onChange}
                  />
                </div>
              </div>

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

export default ProfileForm;
