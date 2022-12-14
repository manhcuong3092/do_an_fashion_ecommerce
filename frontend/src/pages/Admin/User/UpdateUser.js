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
        const { data } = await axios.get(`${END_POINT}/api/v1/admin/user/${userId}`, { withCredentials: true });
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
      toast.error('H??y nh???p h??? t??n');
      return;
    }
    if (!validator.isEmail(email)) {
      toast.error('H??y nh???p ????ng email');
      return;
    }
    if (!phoneNo.match(/\d{10,11}/)) {
      toast.warn('S??? ??i???n tho???i g???m 10 - 11 s???');
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
        toast.success('C???p nh???t ng?????i d??ng th??nh c??ng.');
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
      <Metadata title={'C???p nh???t ng?????i d??ng'} />
      {loading && <Loader />}
      <SideNav>
        <main>
          <div className="container-fluid px-4">
            <h1 className="my-4">C???p nh???t ng?????i d??ng</h1>
            <OutlineBox>
              <Form className="form-control p-4" onSubmit={submitHandler}>
                <Form.Group>
                  <Form.Label htmlFor="name_field">H??? t??n</Form.Label>
                  <Form.Control type="text" name="name" className="form-control" value={name} onChange={onChange} />
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="name_field">Email</Form.Label>
                  <Form.Control type="email" name="email" className="form-control" value={email} disabled />
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="name_field">S??? ??i???n tho???i</Form.Label>
                  <Form.Control
                    type="phone"
                    name="phoneNo"
                    className="form-control"
                    value={phoneNo}
                    onChange={onChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="name_field">T???nh th??nh ph???</Form.Label>
                  <Form.Control type="phone" name="city" className="form-control" value={city} onChange={onChange} />
                </Form.Group>

                <Form.Group className="my-3">
                  <Form.Label htmlFor="description_field">?????a ch???</Form.Label>
                  <textarea
                    className="form-control"
                    name="address"
                    rows="8"
                    value={address}
                    onChange={onChange}
                  ></textarea>
                </Form.Group>

                <Form.Group className="my-3">
                  <Form.Label htmlFor="description_field">Vai tr??</Form.Label>
                  <Form.Select
                    onChange={onChange}
                    name="role"
                    value={role}
                    className="text-capitalize"
                    aria-label="Ch???n vai tr??"
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
                  <Form.Label htmlFor="description_field">???nh ?????i di???n</Form.Label>
                  <Form.Control type="file" name="avatar" className="form-control mb-3" onChange={onChange} />
                  {avatarPreview ? (
                    <Avatar alt="user" src={avatarPreview} sx={{ width: 100, height: 100 }} />
                  ) : (
                    <Avatar alt="user" src={curentAvatar && curentAvatar.url} sx={{ width: 100, height: 100 }} />
                  )}
                </Form.Group>

                <button id="login_button" type="submit" className="btn btn-primary px-3">
                  C???p nh???t
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
