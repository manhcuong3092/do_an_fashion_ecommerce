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
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import OutlineBox from '~/components/OutlineBox';
import FooterAdmin from '~/layouts/Admin/FooterAdmin';
import { ORDER_CANCEL, ORDER_DELIVERING, ORDER_PENDING, ORDER_SUCCESS } from '~/constants/order';
import Metadata from '~/layouts/Metadata';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
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
      const { data } = await axios.delete(`${END_POINT}/api/v1/admin/order/${id}`, config);
      if (data.success) {
        toast.success('Xóa đơn hàng thành công.');
        navigate('/admin/management/orders');
        setOrders(
          orders.filter((item) => {
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
    { field: 'id', headerName: 'ID', flex: 2 },
    { field: 'name', headerName: 'Họ tên', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'shippingInfo', headerName: 'Địa chỉ', flex: 1 },
    { field: 'total', headerName: 'Tổng cộng' },
    { field: 'createdAt', headerName: 'Ngày tạo' },
    {
      field: 'paymentStatus',
      headerName: 'Thanh toán',
      flex: 1,
      renderCell: (cell) => {
        return <div>{cell.value ? 'Đã thanh toán' : 'Chưa thanh toán'}</div>;
      },
    },
    { field: 'paymentType', headerName: 'Phương thức', flex: 1 },
    {
      field: 'orderStatus',
      headerName: 'Trạng thái',
      flex: 1,
      renderCell: (cell) => {
        return cell.value === ORDER_PENDING ? (
          <span className="text-primary">{ORDER_PENDING}</span>
        ) : cell.value === ORDER_DELIVERING ? (
          <span className="text-warning">{ORDER_DELIVERING}</span>
        ) : cell.value === ORDER_SUCCESS ? (
          <span className="text-success">{ORDER_SUCCESS}</span>
        ) : cell.value === ORDER_CANCEL ? (
          <span className="text-danger">{ORDER_CANCEL}</span>
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
            <Button variant="contained" component={Link} color="info" to={`/admin/management/order/${cell.value}`}>
              <LocalShippingOutlinedIcon />
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
          const { data } = await axios.get(`${END_POINT}/api/v1/admin/orders`, { withCredentials: true });
          let orderData = [];

          data.orders.forEach((order, index) => {
            const createdAt = new Date(Date.parse(order.createdAt));
            console.log(order.totalAmount);
            orderData.push({
              id: order._id,
              name: order.shippingInfo.name,
              email: order.shippingInfo.email,
              shippingInfo: `${order.shippingInfo.address}, ${order.shippingInfo.city}`,
              total: `${order.totalPrice.toLocaleString('vi-VN')}₫`,
              paymentStatus: order.paymentStatus,
              paymentType: order.paymentType,
              orderStatus: order.orderStatus,
              createdAt: `
              ${createdAt.toLocaleDateString('vi-VN')} lúc ${createdAt.toLocaleTimeString('vi-VN')}
              `,
              actions: order._id,
              sequense: index + 1,
            });
          });
          setOrders(orderData);
        } catch (error) {
          console.log(error);
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
      <Metadata title={'Danh sách đơn hàng'} />
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Xóa đơn hàng?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Bạn có chắc chắn xóa đơn hàng này?</DialogContentText>
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
            <h1 className="my-4">Danh sách đơn hàng</h1>
            <OutlineBox>
              <div style={{ height: 700, width: '100%' }} className="p-3">
                <DataGrid
                  pageSize={pageSize}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  rows={orders}
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

export default OrderList;
