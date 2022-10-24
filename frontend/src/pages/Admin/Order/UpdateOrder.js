import React, { Fragment, useEffect, useState } from 'react';
import SideNav from '~/layouts/Admin/SideNav';
import TopNav from '~/layouts/Admin/TopNav';
import OutlineBox from '~/components/OutlineBox';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import FooterAdmin from '~/layouts/Admin/FooterAdmin';
import { END_POINT } from '~/config';
import { DataGrid, GridToolbar, viVN } from '@mui/x-data-grid';
import { Avatar } from '@mui/material';
import { ORDER_CANCEL, ORDER_DELIVERING, ORDER_PENDING, ORDER_SUCCESS } from '~/constants/order';
import Metadata from '~/layouts/Metadata';

const UpdateOrder = () => {
  const [order, setOrder] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [filterModel, setFilterModel] = useState({
    items: [],
  });

  const navigate = useNavigate();
  const { orderId } = useParams();
  let productData = [];

  if (order) {
    console.log(order);
    order.orderItems.forEach((item, index) => {
      const stockIndex = item.product.stock.findIndex(
        (stock) => stock.size === item.size._id && stock.color === item.color._id,
      );
      productData.push({
        id: item._id,
        name: item.product.name,
        price: item.price.toLocaleString('vi-VN'),
        size: item.size.name,
        color: item.color.name,
        quantity: item.quantity,
        image: item.product.images[0],
        stock: item.product.stock[stockIndex].quantity,
        totalPrice: (item.price * item.quantity).toLocaleString('vi-VN'),
        sequense: index + 1,
      });
    });
  }

  useEffect(() => {
    const getOrder = async () => {
      try {
        const { data } = await axios.get(`${END_POINT}/api/v1/admin/order/${orderId}`, { withCredentials: true });
        setOrder(data.order);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    getOrder();
  }, [orderId]);

  const columns = [
    { field: 'sequense', headerName: 'STT', width: 50 },
    { field: 'id', headerName: 'ID', flex: 1, hide: true },
    {
      field: 'image',
      headerName: 'Ảnh',
      renderCell: (cell) => {
        return (
          <Avatar alt="Img" variant="square" src={cell.value ? cell.value.url : ''} sx={{ width: 56, height: 56 }} />
        );
      },
    },
    { field: 'name', headerName: 'Tên', flex: 3 },
    { field: 'price', headerName: 'Giá', flex: 1 },
    { field: 'size', headerName: 'Kích cỡ', flex: 1 },
    { field: 'color', headerName: 'Màu', flex: 1 },
    { field: 'quantity', headerName: 'Số lượng', flex: 1 },
    { field: 'totalPrice', headerName: 'Tổng cộng', flex: 1 },
    { field: 'stock', headerName: 'SL Trong Kho', flex: 1 },
  ];

  const handleOrderStatus = async (status) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.put(`/api/v1/admin/order/${orderId}`, { status }, config);
      if (data.success) {
        toast.success('Cập nhật đơn hàng thành công.');
        navigate('/admin/management/orders');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Fragment>
      <Metadata title={'Cập nhật đơn hàng'} />
      <TopNav />
      <SideNav>
        <main>
          <div className="container-fluid px-4">
            <h1 className="my-4">Xử lý đơn hàng</h1>
            {order && (
              <OutlineBox>
                <div className="p-3">
                  <h5>Đơn hàng #{order._id}</h5>
                  <br />
                  <h6>Danh sách sản phẩm</h6>
                  <div style={{ height: 407, width: '100%' }} className="form">
                    <DataGrid
                      pageSize={pageSize}
                      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                      rows={productData}
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
                  <br />
                  <h6>
                    Địa chỉ giao hàng:{' '}
                    <span style={{ textTransform: 'none' }}>
                      {order.shippingInfo.address}, {order.shippingInfo.city}
                    </span>
                  </h6>
                  <h6>
                    Trạng thái thanh toán:{' '}
                    {order.paymentStatus ? (
                      <span className="text-success">Đã thanh toán</span>
                    ) : (
                      <span className="text-danger">Chưa thanh toán</span>
                    )}
                  </h6>
                  <h6>
                    Phương thức thanh toán: <span className="text-secondary">{order.paymentType}</span>
                  </h6>
                  <h6>
                    Trạng thái đơn hàng:{' '}
                    {order.orderStatus === ORDER_PENDING ? (
                      <span className="text-primary">{ORDER_PENDING}</span>
                    ) : order.orderStatus === ORDER_DELIVERING ? (
                      <span className="text-warning">{ORDER_DELIVERING}</span>
                    ) : order.orderStatus === ORDER_SUCCESS ? (
                      <span className="text-success">{ORDER_SUCCESS}</span>
                    ) : order.orderStatus === ORDER_CANCEL ? (
                      <span className="text-danger">{ORDER_CANCEL}</span>
                    ) : (
                      ''
                    )}
                  </h6>
                  {order.orderStatus === ORDER_PENDING && (
                    <button className="btn btn-warning" onClick={() => handleOrderStatus(ORDER_DELIVERING)}>
                      Giao hàng
                    </button>
                  )}
                  {order.orderStatus === ORDER_DELIVERING && (
                    <button className="btn btn-success" onClick={() => handleOrderStatus(ORDER_SUCCESS)}>
                      Giao thành công
                    </button>
                  )}
                  {order.orderStatus !== ORDER_SUCCESS && order.orderStatus !== ORDER_CANCEL && (
                    <button
                      className="btn btn-danger"
                      style={{ 'margin-left': '20px' }}
                      onClick={() => handleOrderStatus(ORDER_CANCEL)}
                    >
                      Hủy
                    </button>
                  )}
                </div>
              </OutlineBox>
            )}
          </div>
        </main>
        <FooterAdmin />
      </SideNav>
    </Fragment>
  );
};

export default UpdateOrder;
