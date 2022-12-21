import { DataGrid, GridToolbar, viVN } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import OutlineBox from '~/components/OutlineBox';
import { ORDER_SUCCESS } from '~/constants/order';
import { TYPE_CURRENT_MONTH, TYPE_LAST_MONTH } from '~/constants/statistic';

const columns = [
  { field: 'sequense', headerName: 'STT' },
  { field: 'id', headerName: 'ID', flex: 1, hide: true },
  { field: 'name', headerName: 'Tên', flex: 1 },
  { field: 'quantity', headerName: 'Số lượng bán', flex: 1 },
];

const ProductStatistic = ({ orders }) => {
  const [monthView, setMonthView] = useState(TYPE_CURRENT_MONTH);
  const [pageSize, setPageSize] = React.useState(10);

  const [filterModel, setFilterModel] = useState({
    items: [],
  });

  let productData = [];

  if (orders) {
    let thisMonth, nextMonth;
    let date = new Date();
    if (monthView === TYPE_CURRENT_MONTH) {
      let currentMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      thisMonth = new Date(currentMonth);
      nextMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + 1));
    } else if (monthView === TYPE_LAST_MONTH) {
      let currentMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      currentMonth.setMonth(currentMonth.getMonth() - 1);
      thisMonth = new Date(currentMonth);
      nextMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + 1));
    }
    const filterData = orders.filter((item) => {
      return (
        new Date(item.paidAt) >= thisMonth && new Date(item.paidAt) < nextMonth && item.orderStatus === ORDER_SUCCESS
      );
    });

    const productObj = {};

    filterData.forEach((order) => {
      order.orderItems.forEach((item) => {
        productObj[item.productItem.product._id] = productObj[item.productItem.product._id]
          ? {
              ...productObj[item.productItem.product._id],
              quantity: productObj[item.productItem.product._id].quantity + item.quantity,
            }
          : {
              id: item.productItem.product._id,
              name: item.productItem.product.name,
              quantity: 1,
            };
      });
    });

    let sequense = 0;
    Object.keys(productObj).forEach((key) => {
      productData.push(productObj[key]);
    });

    productData.sort((a, b) => {
      return a.quantity < b.quantity ? 1 : -1;
    });
    productData = productData.map((item) => {
      sequense++;
      return { ...item, sequense };
    });
  }

  return (
    <OutlineBox>
      <div style={{ height: '800px' }} className="m-3">
        <h4>Thống kê số sản phẩm bán chạy</h4>
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4" align="end" id="nav-ul">
          <NavDropdown id="admin-nav" align="end" title="Xem theo">
            <NavDropdown.Item onClick={() => setMonthView(TYPE_CURRENT_MONTH)}>{TYPE_CURRENT_MONTH}</NavDropdown.Item>
            <NavDropdown.Item onClick={() => setMonthView(TYPE_LAST_MONTH)}>{TYPE_LAST_MONTH}</NavDropdown.Item>
          </NavDropdown>
        </ul>
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4" align="end" id="nav-ul">
          {monthView}
        </ul>
        <OutlineBox>
          <div style={{ height: 700, width: '100%' }} className="p-3">
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
        </OutlineBox>
      </div>
    </OutlineBox>
  );
};

export default ProductStatistic;
