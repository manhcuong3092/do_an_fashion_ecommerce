import React, { Fragment, useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import SideNav from '~/layouts/Admin/SideNav';
import TopNav from '~/layouts/Admin/TopNav';
import OutlineBox from '~/components/OutlineBox';
import FooterAdmin from '~/layouts/Admin/FooterAdmin';
import Loader from '~/layouts/Loader';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { END_POINT } from '~/config';
import Metadata from '~/layouts/Metadata';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };
    try {
      setLoading(true);
      const { data } = await axios.post(`${END_POINT}/api/v1/admin/blog`, { title, content, avatar }, config);
      if (data.success) {
        toast.success('Tạo bài viết thành công.');
        navigate('/admin/management/blogs');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setLoading(false);
  };

  const hanleFileChange = (e) => {
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

  return (
    <Fragment>
      <Metadata title={'Tạo bài viết'} />
      <TopNav />
      {loading && <Loader />}
      <SideNav>
        <main>
          <div className="container-fluid px-4">
            <h1 className="my-4">Tạo bài viết</h1>
            <OutlineBox>
              <Form className="form-control p-4" onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label htmlFor="title_field">Tiêu đề</Form.Label>
                  <Form.Control
                    type="text"
                    id="title_field"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="my-3">
                  <Form.Label htmlFor="description_field">Ảnh đại diện</Form.Label>
                  <Form.Control name="avatar" type="file" multiple onChange={(e) => hanleFileChange(e)} />
                  {avatarPreview && (
                    <img
                      src={avatarPreview}
                      key={avatarPreview}
                      alt="Product"
                      className="mt-3 mr-2"
                      width="200"
                      height="120"
                    />
                  )}
                </Form.Group>

                <Form.Group className="my-3">
                  <Form.Label htmlFor="content_field">Nội dung</Form.Label>
                  <CKEditor
                    editor={ClassicEditor}
                    data={content}
                    onReady={(editor) => {
                      // You can store the "editor" and use when it is needed.
                      console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      console.log({ event, editor, data });
                      setContent(editor.getData());
                    }}
                    onBlur={(event, editor) => {
                      console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                      console.log('Focus.', editor);
                    }}
                    value={content}
                  />
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

export default CreateBlog;
