import React, { Fragment, useState } from 'react';
import SideNav from '~/layouts/Admin/SideNav';
import TopNav from '~/layouts/Admin/TopNav';
import Form from 'react-bootstrap/Form';
import OutlineBox from '~/components/OutlineBox';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import FooterAdmin from '~/layouts/Admin/FooterAdmin';
import { END_POINT } from '~/config';
import Metadata from '~/layouts/Metadata';

const CreateSize = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };
      const { data } = await axios.post(`${END_POINT}/api/v1/admin/size`, { name, description }, config);
      if (data.success) {
        toast.success('Tạo kích cỡ thành công.');
        navigate('/admin/management/sizes');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Fragment>
      <Metadata title={'Tạo kích cỡ'} />
      <TopNav />
      <SideNav>
        <main>
          <div className="container-fluid px-4">
            <h1 className="my-4">Tạo kích cỡ</h1>
            <OutlineBox>
              <Form className="form-control p-4" onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label htmlFor="name_field">Tên</Form.Label>
                  <Form.Control
                    type="text"
                    id="name_field"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="my-3">
                  <Form.Label htmlFor="description_field">Mô tả</Form.Label>
                  <textarea
                    className="form-control"
                    id="description_field"
                    rows="8"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
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

export default CreateSize;
