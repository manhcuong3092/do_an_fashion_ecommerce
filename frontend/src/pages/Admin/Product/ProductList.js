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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import Avatar from '@mui/material/Avatar';
import SellIcon from '@mui/icons-material/Sell';
import Metadata from '~/layouts/Metadata';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [productName, setProductName] = useState('');

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };
      const { data } = await axios.delete(`${END_POINT}/api/v1/admin/product/${id}`, config);
      if (data.success) {
        toast.success('Xóa sản phẩm thành công.');
        navigate('/admin/management/products');
        setProducts(
          products.filter((item) => {
            return item.id !== id;
          }),
        );
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

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
    { field: 'salePrice', headerName: 'Giá khuyến mại', flex: 1 },
    {
      field: 'isSale',
      headerName: 'Khuyến mại',
      flex: 1,
      renderCell: (cell) => {
        return cell.value && <SellIcon color="primary" />;
      },
    },
    { field: 'category', headerName: 'Danh mục', flex: 1 },
    { field: 'stock', headerName: 'Kho', width: 80 },
    {
      field: 'active',
      headerName: 'Kích hoạt',
      renderCell: (cell) => {
        return cell.value ? <CheckCircleIcon color="success" /> : <DoNotDisturbOnIcon color="error" />;
      },
    },
    {
      field: 'actions',
      headerName: 'Hành động',
      flex: 1,
      renderCell: (cell) => {
        return (
          <Fragment>
            <Button variant="contained" component={Link} color="info" to={`/admin/management/product/${cell.value}`}>
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
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${END_POINT}/api/v1/admin/products`, { withCredentials: true });
        let productData = [];

        data.products.forEach((product, index) => {
          productData.push({
            id: product._id,
            name: product.name,
            price: product.price,
            salePrice: product.salePrice,
            category: product.category.name,
            stock: product.productItems.reduce((acc, item) => {
              return acc + item.stock;
            }, 0),
            isSale: product.isSale,
            active: product.active,
            actions: product._id,
            image: product.images[0],
            sold: product.sold,
            sequense: index + 1,
          });
        });
        setProducts(productData);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchData();
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

  const handleSearch = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };
      const { data } = await axios.get(`${END_POINT}/api/v1/admin/products?productName=${productName}`, config);
      let productData = [];

      data.products.forEach((product, index) => {
        productData.push({
          id: product._id,
          name: product.name,
          price: product.price,
          salePrice: product.salePrice,
          category: product.category.name,
          sizes: product.sizes
            .map((item) => {
              return item.name;
            })
            .join(', '),
          colors: product.colors
            .map((item) => {
              return item.name;
            })
            .join(', '),
          stock: product.stock.reduce((acc, item) => {
            return acc + item.quantity;
          }, 0),
          isSale: product.isSale,
          active: product.active,
          actions: product._id,
          image: product.images[0],
          sold: product.sold,
          sequense: index + 1,
        });
      });
      setProducts(productData);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Fragment>
      <Metadata title={'Danh sách sản phẩm'} />
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Xóa sản phẩm?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Bạn có chắc chắn xóa sản phẩm này?</DialogContentText>
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
            <h1 className="my-4">Danh sách sản phẩm</h1>
            <Button
              variant="contained"
              component={Link}
              product="primary"
              to={`/admin/management/create-product`}
              className="mb-3"
              sx={{
                ':hover': {
                  bgcolor: 'primary.main', // theme.palette.primary.main
                  product: 'white',
                },
              }}
            >
              Tạo mới
            </Button>
            <OutlineBox>
              <div className="m-3">
                <div className="row align-items-center">
                  <div className="col-auto">
                    <label htmlFor="idProduct" className="col-form-label">
                      Nhập tên sản phẩm
                    </label>
                  </div>
                  <div className="col-auto">
                    <input
                      type="text"
                      id="idProduct"
                      className="form-control"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
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
                  rows={products}
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

export default ProductList;
