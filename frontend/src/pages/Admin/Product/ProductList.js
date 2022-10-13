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

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [pageSize, setPageSize] = React.useState(10);
  const navigate = useNavigate();

  const handleDelete = async (e, id) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.delete(`/api/v1/admin/product/${id}`, config);
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
        return <Avatar alt="Img" variant="square" src={cell.value} sx={{ width: 56, height: 56 }} />;
      },
    },
    { field: 'name', headerName: 'Tên', flex: 3 },
    { field: 'price', headerName: 'Giá', flex: 1 },
    { field: 'salePrice', headerName: 'Giá khuyến mại', flex: 1 },
    { field: 'category', headerName: 'Danh mục', flex: 1 },
    { field: 'sizes', headerName: 'Kích cỡ', flex: 1 },
    { field: 'colors', headerName: 'Màu', flex: 1 },
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
        const { data } = await axios.get(`${END_POINT}/api/v1/products`);
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

  return (
    <Fragment>
      <TopNav />
      <SideNav>
        <main>
          <div class="container-fluid px-4">
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
