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

const SizeList = () => {
  const [sizes, setSizes] = useState([]);
  const [pageSize, setPageSize] = React.useState(5);
  const navigate = useNavigate();

  const handleDelete = async (e, id) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.delete(`/api/v1/admin/size/${id}`, config);
      if (data.success) {
        toast.success('Xóa kích cỡ thành công.');
        navigate('/admin/management/sizes');
        setSizes(
          sizes.filter((item) => {
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
    {
      field: 'actions',
      headerName: 'Hành động',
      flex: 1,
      renderCell: (cell) => {
        return (
          <Fragment>
            <Button variant="contained" component={Link} color="primary" to={`/admin/management/size/${cell.value}`}>
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
          const { data } = await axios.get(`${END_POINT}/api/v1/sizes`);
          let sizeData = [];

          data.sizes.forEach((size, index) => {
            sizeData.push({
              id: size._id,
              name: size.name,
              description: size.description,
              actions: size._id,
              sequense: index + 1,
            });
          });
          setSizes(sizeData);
        } catch (error) {
          toast.error(error.response.data.message);
        }
      };
      fetchData();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [sizes]);

  return (
    <Fragment>
      <TopNav />
      <SideNav>
        <div id="layoutSidenav_content">
          <main>
            <div class="container-fluid px-4">
              <h1 className="my-5">Danh sách kích cỡ</h1>
              {/* <Fragment>
                <MDBDataTable data={setTableSizes()} className="px-3" bordered striped hover />
              </Fragment> */}
              <Button
                variant="contained"
                component={Link}
                color="primary"
                to={`/admin/management/create-size`}
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
                    rows={sizes}
                    columns={columns}
                    rowsPerPageOptions={[5, 10, 20]}
                  />
                </div>
              </OutlineBox>
            </div>
          </main>
        </div>
      </SideNav>
    </Fragment>
  );
};

export default SizeList;
