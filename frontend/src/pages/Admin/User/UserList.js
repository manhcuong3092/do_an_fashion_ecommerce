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
import { ROLE_ADMIN, ROLE_USER } from '~/constants/role';
import Metadata from '~/layouts/Metadata';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [pageSize, setPageSize] = React.useState(10);
  const navigate = useNavigate();

  const handleDelete = async (e, id) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };
      const { data } = await axios.delete(`${END_POINT}/api/v1/admin/user/${id}`, config);
      if (data.success) {
        toast.success('Xóa người dùng thành công.');
        navigate('/admin/management/users');
        setUsers(
          users.filter((item) => {
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
      headerName: 'Ảnh',
      renderCell: (cell) => {
        return <Avatar alt="u" src={cell.value ? cell.value.url : ''} sx={{ width: 50, height: 50 }} />;
      },
    },
    { field: 'name', headerName: 'Họ tên', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'city', headerName: 'Tỉnh thành phố', flex: 1 },
    {
      field: 'role',
      headerName: 'Vai trò',
      flex: 1,
      renderCell: (cell) => {
        return cell.value === ROLE_USER ? (
          <span className="text-secondary text-capitalize fw-bold">{ROLE_USER}</span>
        ) : cell.value === ROLE_ADMIN ? (
          <span className="text-primary text-capitalize fw-bold">{ROLE_ADMIN}</span>
        ) : (
          ''
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Hành động',
      flex: 1,
      renderCell: (cell) => {
        return (
          <Fragment>
            <Button variant="contained" component={Link} color="info" to={`/admin/management/user/${cell.value}`}>
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
          const { data } = await axios.get(`${END_POINT}/api/v1/admin/users`, { withCredentials: true });
          let userData = [];

          data.users.forEach((user, index) => {
            userData.push({
              id: user._id,
              avatar: user.avatar,
              name: user.name,
              email: user.email,
              city: user.city,
              role: user.role,
              actions: user._id,
              sequense: index + 1,
            });
          });
          setUsers(userData);
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
      <Metadata title={'Danh sách người dùng'} />
      <TopNav />
      <SideNav>
        <main>
          <div className="container-fluid px-4">
            <h1 className="my-4">Danh sách người dùng</h1>
            <Button
              variant="contained"
              component={Link}
              color="primary"
              to={`/admin/management/create-user`}
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
                  rows={users}
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

export default UserList;
