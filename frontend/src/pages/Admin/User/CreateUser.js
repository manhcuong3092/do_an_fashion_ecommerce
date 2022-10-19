import React, { Fragment, useState } from 'react';
import SideNav from '~/layouts/Admin/SideNav';
import TopNav from '~/layouts/Admin/TopNav';
import Form from 'react-bootstrap/Form';
import OutlineBox from '~/components/OutlineBox';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import FooterAdmin from '~/layouts/Admin/FooterAdmin';
import validator from 'validator';
import { ROLE_ADMIN, ROLE_USER } from '~/constants/role';
import { Avatar } from '@mui/material';
import { END_POINT } from '~/config';
import Loader from '~/layouts/Loader';

const CreateUser = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phoneNo: '',
    password: '',
    address: '',
    city: '',
    role: ROLE_USER,
  });

  const { name, email, password, phoneNo, city, address, role } = user;
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('/img/default_avatar.jpg');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const submitHandler = async (e) => {
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
    if (!phoneNo.match(/\d{10,11}/)) {
      toast.warn('Số điện thoại gồm 10 - 11 số');
      return false;
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
    formData.set('city', city);
    formData.set('address', address);
    formData.set('role', role);
    formData.set('avatar', avatar);

    setLoading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      };
      const { data } = await axios.post(`${END_POINT}/api/v1/admin/user`, formData, config);
      if (data.success) {
        toast.success('Tạo người dùng thành công.');
        navigate('/admin/management/users');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }

    setLoading(false);
  };

  return (
    <Fragment>
      <TopNav />
      {loading && <Loader />}
      <SideNav>
        <main>
          <div class="container-fluid px-4">
            <h1 className="my-4">Tạo người dùng</h1>
            <OutlineBox>
              <Form className="form-control p-4" onSubmit={submitHandler}>
                <Form.Group>
                  <Form.Label htmlFor="name_field">Họ tên</Form.Label>
                  <Form.Control type="text" name="name" className="form-control" value={name} onChange={onChange} />
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="name_field">Email</Form.Label>
                  <Form.Control type="email" name="email" className="form-control" value={email} onChange={onChange} />
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="name_field">Số điện thoại</Form.Label>
                  <Form.Control
                    type="phone"
                    name="phoneNo"
                    className="form-control"
                    value={phoneNo}
                    onChange={onChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="name_field">Tỉnh thành phố</Form.Label>
                  <Form.Control type="phone" name="city" className="form-control" value={city} onChange={onChange} />
                </Form.Group>

                <Form.Group className="my-3">
                  <Form.Label htmlFor="description_field">Địa chỉ</Form.Label>
                  <textarea
                    className="form-control"
                    name="address"
                    rows="8"
                    value={address}
                    onChange={onChange}
                  ></textarea>
                </Form.Group>

                <Form.Group className="my-3">
                  <Form.Label htmlFor="description_field">Mật khẩu</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    className="form-control"
                    value={password}
                    onChange={onChange}
                  />
                </Form.Group>

                <Form.Group className="my-3">
                  <Form.Label htmlFor="description_field">Nhập lại mật khẩu</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="my-3">
                  <Form.Label htmlFor="description_field">Vai trò</Form.Label>
                  <Form.Select
                    onChange={onChange}
                    name="role"
                    value={role}
                    className="text-capitalize"
                    aria-label="Chọn vai trò"
                  >
                    <option className="text-capitalize" value={ROLE_USER}>
                      {ROLE_USER}
                    </option>
                    <option className="text-capitalize" value={ROLE_ADMIN}>
                      {ROLE_ADMIN}
                    </option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="my-3">
                  <Form.Label htmlFor="description_field">Ảnh đại diện</Form.Label>
                  <Form.Control type="file" name="avatar" className="form-control mb-3" onChange={onChange} />
                  <Avatar alt="Img" src={avatarPreview} sx={{ width: 100, height: 100 }} />
                </Form.Group>

                <button id="login_button" type="submit" className="btn btn-primary px-3">
                  Tạo
                </button>
              </Form>
            </OutlineBox>
          </div>
        </main>
        <FooterAdmin />
      </SideNav>
    </Fragment>
  );
};

export default CreateUser;
