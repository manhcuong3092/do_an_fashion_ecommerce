import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { END_POINT } from '~/config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import TopNav from '~/layouts/Admin/TopNav';
import SideNav from '~/layouts/Admin/SideNav';
import { DataGrid, GridToolbar, viVN } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import OutlineBox from '~/components/OutlineBox';
import FooterAdmin from '~/layouts/Admin/FooterAdmin';

const ProductReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [pageSize, setPageSize] = React.useState(10);
  const [productId, setProductId] = useState('');
  const navigate = useNavigate();

  const handleDelete = async (e, id) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };
      const { data } = await axios.delete(`${END_POINT}/api/v1/admin/review?id=${id}&productId=${productId}`, config);
      if (data.success) {
        toast.success('Xóa đánh giá thành công.');
        navigate('/admin/management/reviews');
        setReviews(
          reviews.filter((item) => {
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
    { field: 'name', headerName: 'Họ tên', flex: 1 },
    { field: 'user', headerName: 'Email', flex: 1 },
    { field: 'comment', headerName: 'Bình luận', flex: 1 },
    { field: 'rating', headerName: 'Đánh giá', flex: 1 },
    {
      field: 'actions',
      headerName: 'Hành động',
      flex: 1,
      renderCell: (cell) => {
        return (
          <Fragment>
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

  const handleSearch = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };
      const { data } = await axios.get(`${END_POINT}/api/v1/reviews?productId=${productId}`, config);
      if (data.success) {
        const reviewData = [];
        data.reviews.map((review, index) => {
          reviewData.push({
            id: review._id,
            user: review.user.email,
            name: review.name,
            comment: review.comment,
            rating: review.rating,
            actions: review._id,
            sequense: index + 1,
          });
        });
        setReviews(reviewData);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const [filterModel, setFilterModel] = useState({
    items: [],
  });
  return (
    <Fragment>
      <TopNav />
      <SideNav>
        <main>
          <div className="container-fluid px-4">
            <h1 className="my-4">Danh sách đánh giá sản phẩm</h1>
            <OutlineBox>
              <div className="m-3">
                <div className="row align-items-center">
                  <div className="col-auto">
                    <label htmlFor="idProduct" className="col-form-label">
                      Nhập ID sản phẩm
                    </label>
                  </div>
                  <div className="col-auto">
                    <input
                      type="text"
                      id="idProduct"
                      className="form-control"
                      value={productId}
                      onChange={(e) => setProductId(e.target.value)}
                    />
                  </div>
                  <div className="col-auto">
                    <button className="btn btn-primary" onClick={() => handleSearch()}>
                      Tìm kiếm
                    </button>
                  </div>
                </div>
              </div>
              <div style={{ height: 700, width: '100%' }} className="p-3">
                <DataGrid
                  pageSize={pageSize}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  rows={reviews}
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

export default ProductReviewList;
