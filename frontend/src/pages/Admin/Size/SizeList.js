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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const SizeList = () => {
  const [sizes, setSizes] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };
      const { data } = await axios.delete(`${END_POINT}/api/v1/admin/size/${id}`, config);
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
            <Button variant="contained" component={Link} color="info" to={`/admin/management/size/${cell.value}`}>
              <EditIcon />
            </Button>
            <span style={{ width: '10px' }}> </span>
            <Button
              variant="contained"
              color={'error'}
              onClick={() => {
                handleClickOpenDelete(cell.value);
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
          const { data } = await axios.get(`${END_POINT}/api/v1/sizes`, { withCredentials: true });
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
  }, []);

  const [filterModel, setFilterModel] = useState({
    items: [],
  });

  const handleRowClick = (params) => {
    setSelectedId(params.row.id);
  };

  const handleClickOpenDelete = (id) => {
    setOpenDelete(true);
  };

  const handleClickDelete = () => {
    handleDelete(selectedId);
    setOpenDelete(false);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  return (
    <Fragment>
      <Metadata title={'Danh sách kích cỡ'} />
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Xóa kích cỡ?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Bạn có chắc chắn xóa kích cỡ này?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Hủy</Button>
          <Button onClick={handleClickDelete} autoFocus color={'error'}>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
      <TopNav />
      <SideNav>
        <main>
          <div className="container-fluid px-4">
            <h1 className="my-4">Danh sách kích cỡ</h1>
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
                  components={{
                    Toolbar: GridToolbar,
                  }}
                  filterModel={filterModel}
                  onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
                  localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
                  onRowClick={handleRowClick}
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

export default SizeList;
