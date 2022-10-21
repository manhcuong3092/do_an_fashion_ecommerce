import React, { Fragment, useEffect, useState } from 'react';
import SideNav from '~/layouts/Admin/SideNav';
import TopNav from '~/layouts/Admin/TopNav';
import Form from 'react-bootstrap/Form';
import OutlineBox from '~/components/OutlineBox';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import FooterAdmin from '~/layouts/Admin/FooterAdmin';
import { END_POINT } from '~/config';
import Loader from '~/layouts/Loader';

const RelpyContact = () => {
  const [contact, setContact] = useState({});
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { contactId } = useParams();

  useEffect(() => {
    const getContact = async () => {
      try {
        const { data } = await axios.get(`${END_POINT}/api/v1/admin/contact/${contactId}`, { withCredentials: true });
        setContact(data.contact);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    getContact();
  }, [contactId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content) {
      toast.warning('Hãy nhập nội dung phản hồi.');
      return;
    }
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };
      setLoading(true);
      const { data } = await axios.put(`${END_POINT}/api/v1/admin/contact/${contactId}`, { content }, config);
      if (data.success) {
        toast.success('Gửi email phản hồi thành công.');
        navigate('/admin/management/contacts');
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
          <div className="container-fluid px-4">
            <h1 className="my-4">Phản hồi liên hệ</h1>
            <OutlineBox>
              <div className="p-4">
                <h6>Tên: {contact.name}</h6>
                <h6>Email: {contact.email}</h6>
                <b>Nội dung:</b>
                <p>{contact.content}</p>
              </div>
            </OutlineBox>
            <OutlineBox>
              <Form className="form-control p-4" onSubmit={handleSubmit}>
                <Form.Group className="my-3">
                  <Form.Label htmlFor="description_field">Nhập phản hồi</Form.Label>
                  <textarea
                    className="form-control"
                    id="description_field"
                    rows="8"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                </Form.Group>

                <button id="login_button" type="submit" className="btn btn-primary px-3">
                  Phản hồi
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

export default RelpyContact;
