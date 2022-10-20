import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { END_POINT } from '~/config';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import TopNav from '~/layouts/Admin/TopNav';
import SideNav from '~/layouts/Admin/SideNav';
import { DataGrid, GridToolbar, viVN } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import OutlineBox from '~/components/OutlineBox';
import FooterAdmin from '~/layouts/Admin/FooterAdmin';
import { Avatar } from '@mui/material';

const BlogsList = () => {
  const [blogs, setBlogs] = useState([]);
  const [pageSize, setPageSize] = React.useState(10);
  const navigate = useNavigate();

  const handleDelete = async (e, id) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.delete(`/api/v1/admin/blog/${id}`, config);
      if (data.success) {
        toast.success('Xóa bài viết thành công.');
        navigate('/admin/management/blogs');
        setBlogs(
          blogs.filter((item) => {
            return item.id !== id;
          }),
        );
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const columns = [
    { field: 'sequense', headerName: 'STT' },
    { field: 'id', headerName: 'ID', flex: 1, hide: true },
    {
      field: 'avatar',
      headerName: 'Ảnh đại diện',
      flex: 1,
      renderCell: (cell) => {
        return (
          <Avatar alt="Img" variant="square" src={cell.value ? cell.value.url : ''} sx={{ width: 100, height: 56 }} />
        );
      },
    },
    { field: 'title', headerName: 'Tiêu đề', flex: 1 },
    { field: 'createdAt', headerName: 'Ngày tạo', flex: 1 },
    { field: 'author', headerName: 'Tác giả', flex: 1 },
    {
      field: 'actions',
      headerName: 'Hành động',
      flex: 1,
      renderCell: (cell) => {
        return (
          <Fragment>
            <Button variant="contained" component={Link} color="info" to={`/admin/management/blog/${cell.value}`}>
              <EditIcon />
            </Button>
            <span style={{ width: '10px' }}> </span>
            <Button
              variant="contained"
              color={'error'}
              onClick={(event) => {
                handleDelete(event, cell.value);
              }}
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  useEffect(() => {
    try {
      const fetchData = async () => {
        try {
          const { data } = await axios.get(`${END_POINT}/api/v1/admin/blogs`, { withCredentials: true });
          let blogData = [];

          data.blogs.forEach((blog, index) => {
            const createdAt = new Date(Date.parse(blog.createdAt));
            blogData.push({
              id: blog._id,
              title: blog.title,
              avatar: blog.avatar,
              author: blog.author.name,
              createdAt: `
              ${createdAt.toLocaleDateString('vi-VN')} lúc ${createdAt.toLocaleTimeString('vi-VN')}
              `,
              actions: blog._id,
              sequense: index + 1,
            });
          });
          setBlogs(blogData);
        } catch (error) {
          toast.error(error.response.data.message);
        }
      };
      fetchData();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, []);

  const [filterModel, setFilterModel] = useState({
    items: [],
  });

  return (
    <Fragment>
      <TopNav />
      <SideNav>
        <main>
          <div class="container-fluid px-4">
            <h1 className="my-4">Danh sách bài viết</h1>
            <Button
              variant="contained"
              component={Link}
              color="primary"
              to={`/admin/management/create-blog`}
              className="mb-3"
              sx={{
                ':hover': {
                  bgcolor: 'primary.main', // theme.palette.primary.main
                  color: 'white',
                },
              }}
            >
              Tạo mới
            </Button>
            <OutlineBox>
              <div style={{ height: 700, width: '100%' }} className="p-3">
                <DataGrid
                  pageSize={pageSize}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  rows={blogs}
                  columns={columns}
                  rowsPerPageOptions={[5, 10, 20]}
                  components={{
                    Toolbar: GridToolbar,
                  }}
                  filterModel={filterModel}
                  onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
                  localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
                />
              </div>
            </OutlineBox>
          </div>
        </main>
        <FooterAdmin />
      </SideNav>
    </Fragment>
  );
};

export default BlogsList;
