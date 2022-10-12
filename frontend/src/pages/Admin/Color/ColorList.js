import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { END_POINT } from '~/config';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import TopNav from '~/layouts/Admin/TopNav';
import SideNav from '~/layouts/Admin/SideNav';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import OutlineBox from '~/components/OutlineBox';
import FooterAdmin from '~/layouts/Admin/FooterAdmin';

const ColorList = () => {
  const [colors, setColors] = useState([]);
  const [pageSize, setPageSize] = React.useState(10);
  const navigate = useNavigate();

  const handleDelete = async (e, id) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.delete(`/api/v1/admin/color/${id}`, config);
      if (data.success) {
        toast.success('Xóa màu thành công.');
        navigate('/admin/management/colors');
        setColors(
          colors.filter((item) => {
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
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Tên', flex: 1 },
    { field: 'description', headerName: 'Mô tả', flex: 1 },
    { field: 'hexCode', headerName: 'Mã màu', flex: 1 },
    {
      field: 'color',
      headerName: 'Màu',
      renderCell: (cell) => {
        return (
          <Button
            style={{
              borderRadius: 0,
              backgroundColor: cell.value,
              padding: '18px 36px',
              fontSize: '18px',
            }}
            variant="contained"
          ></Button>
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
            <Button variant="contained" component={Link} color="primary" to={`/admin/management/color/${cell.value}`}>
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
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${END_POINT}/api/v1/colors`);
        let colorData = [];

        data.colors.forEach((color, index) => {
          colorData.push({
            id: color._id,
            name: color.name,
            description: color.description,
            hexCode: color.hexCode,
            color: color.hexCode,
            actions: color._id,
            sequense: index + 1,
          });
        });
        setColors(colorData);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchData();
  }, [colors]);

  return (
    <Fragment>
      <TopNav />
      <SideNav>
        <div id="layoutSidenav_content">
          <main>
            <div class="container-fluid px-4">
              <h1 className="my-4">Danh sách màu sắc</h1>
              <Button
                variant="contained"
                component={Link}
                color="primary"
                to={`/admin/management/create-color`}
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
                    rows={colors}
                    columns={columns}
                    rowsPerPageOptions={[5, 10, 20]}
                  />
                </div>
              </OutlineBox>
            </div>
          </main>
        </div>
        <FooterAdmin />
      </SideNav>
    </Fragment>
  );
};

export default ColorList;
