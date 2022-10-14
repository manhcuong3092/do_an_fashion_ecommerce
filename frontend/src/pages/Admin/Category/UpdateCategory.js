import React, { Fragment, useEffect, useState } from 'react';
import SideNav from '~/layouts/Admin/SideNav';
import TopNav from '~/layouts/Admin/TopNav';
import Form from 'react-bootstrap/Form';
import OutlineBox from '~/components/OutlineBox';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import FooterAdmin from '~/layouts/Admin/FooterAdmin';

const UpdateCategory = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();
  const { categoryId } = useParams();

  useEffect(() => {
    const getCategory = async () => {
      try {
        const { data } = await axios.get(`/api/v1/admin/category/${categoryId}`);
        setName(data.category.name);
        setDescription(data.category.description);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    getCategory();
  }, [categoryId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.put(`/api/v1/admin/category/${categoryId}`, { name, description }, config);
      if (data.success) {
        toast.success('Cập nhật kích cỡ thành công.');
        navigate('/admin/management/categories');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Fragment>
      <TopNav />
      <SideNav>
        <main>
          <div class="container-fluid px-4">
            <h1 className="my-4">Cập nhật danh mục</h1>
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

export default UpdateCategory;