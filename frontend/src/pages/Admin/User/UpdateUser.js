import React, { Fragment, useEffect, useState } from 'react';
import SideNav from '~/layouts/Admin/SideNav';
import TopNav from '~/layouts/Admin/TopNav';
import Form from 'react-bootstrap/Form';
import OutlineBox from '~/components/OutlineBox';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import FooterAdmin from '~/layouts/Admin/FooterAdmin';
import validator from 'validator';
import { ROLE_ADMIN, ROLE_USER } from '~/constants/role';
import { Avatar } from '@mui/material';
import { END_POINT } from '~/config';
import Loader from '~/layouts/Loader';
import Metadata from '~/layouts/Metadata';

const UpdateUser = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phoneNo: '',
    password: '',
    address: '',
    city: '',
    role: ROLE_USER,
  });

  const { name, email, phoneNo, city, address, role } = user;
  const [avatar, setAvatar] = useState('');
  const [curentAvatar, setCurentAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const getSize = async () => {
      try {
        const { data } = await axios.get(`${END_POINT}/api/v1/admin/user/${userId}`, {withCredentials: true});
        setUser({
          name: data.user.name,
          email: data.user.email,
          phoneNo: data.user.phoneNo,
          address: data.user.address,
          city: data.user.city,
          role: data.user.role,
        });
        setCurentAvatar(data.user.avatar);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    getSize();
  }, [userId]);

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
    if (!validator.isEmail(email)) {
      toast.error('Hãy nhập đúng email');
      return;
    }
    if (!phoneNo.match(/\d{10,11}/)) {
      toast.warn('Số điện thoại gồm 10 - 11 số');
      return false;
    }

    const userData = {
      name,
      phoneNo,
      city,
      address,
      role,
      avatar,
    };

    setLoading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };
      const { data } = await axios.put(`${END_POINT}/api/v1/admin/user/${userId}`, userData, config);
      if (data.success) {
        toast.success('Cập nhật người dùng thành công.');
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
      <Metadata title={'Cập nhật người dùng'} />
      {loading && <Loader />}
      <SideNav>
        <main>
          <div className="container-fluid px-4">
            <h1 className="my-4">Cập nhật người dùng</h1>
            <OutlineBox>
              <Form className="form-control p-4" onSubmit={submitHandler}>
                <Form.Group>
                  <Form.Label htmlFor="name_field">Họ tên</Form.Label>
                  <Form.Control type="text" name="name" className="form-control" value={name} onChange={onChange} />
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="name_field">Email</Form.Label>
                  <Form.Control type="email" name="email" className="form-control" value={email} disabled />
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
                  {avatarPreview ? (
                    <Avatar alt="user" src={avatarPreview} sx={{ width: 100, height: 100 }} />
                  ) : (
                    <Avatar alt="user" src={curentAvatar && curentAvatar.url} sx={{ width: 100, height: 100 }} />
                  )}
                </Form.Group>

                <button id="login_button" type="submit" className="btn btn-primary px-3">
                  Cập nhật
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

export default UpdateUser;
