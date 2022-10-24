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
import Metadata from '~/layouts/Metadata';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
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
      const { data } = await axios.delete(`${END_POINT}/api/v1/admin/category/${id}`, config);
      if (data.success) {
        toast.success('Xóa danh mục thành công.');
        navigate('/admin/management/categories');
        setCategories(
          categories.filter((item) => {
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
            <Button variant="contained" component={Link} color="info" to={`/admin/management/category/${cell.value}`}>
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
          const { data } = await axios.get(`${END_POINT}/api/v1/categories`, { withCredentials: true });
          let categoryData = [];

          data.categories.forEach((category, index) => {
            categoryData.push({
              id: category._id,
              name: category.name,
              description: category.description,
              actions: category._id,
              sequense: index + 1,
            });
          });
          setCategories(categoryData);
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
      <Metadata title={'Danh sách bài viết'} />
      <TopNav />
      <SideNav>
        <main>
          <div className="container-fluid px-4">
            <h1 className="my-4">Danh sách danh mục</h1>
            <Button
              variant="contained"
              component={Link}
              color="primary"
              to={`/admin/management/create-category`}
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
                  rows={categories}
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

export default CategoryList;
