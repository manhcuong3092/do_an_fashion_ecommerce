import React, { Fragment, useEffect, useState } from 'react';
import SideNav from '~/layouts/Admin/SideNav';
import TopNav from '~/layouts/Admin/TopNav';
import Form from 'react-bootstrap/Form';
import OutlineBox from '~/components/OutlineBox';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import FooterAdmin from '~/layouts/Admin/FooterAdmin';
import { Col, Row, Table } from 'react-bootstrap';
import { Box, MenuItem, OutlinedInput, Select } from '@mui/material';
import { END_POINT } from '~/config';

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [detailDescription, setDetailDescription] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [images, setImages] = useState('');
  const [active, setActive] = useState(true);
  const [gender, setGender] = useState('Tất cả');
  const [category, setCategory] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [stock, setStock] = useState([]);

  //Get list from API
  const [sizesData, setSizesData] = useState([]);
  const [colorsData, setColorsData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);

  //Image preview
  const [imagesPreview, setImagesPreview] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchData = async () => {
        try {
          const promise1 = axios.get(`${END_POINT}/api/v1/sizes`);
          const promise2 = axios.get(`${END_POINT}/api/v1/colors`);
          const promise3 = axios.get(`${END_POINT}/api/v1/categories`);
          Promise.all([promise1, promise2, promise3]).then((value) => {
            setSizesData(value[0].data.sizes);
            setColorsData(value[1].data.colors);
            setCategoriesData(value[2].data.categories);
          });
        } catch (error) {
          toast.error(error.response.data.message);
        }
      };
      fetchData();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('name', name);
    formData.set('price', price);
    formData.set('salePrice', salePrice);
    formData.set('description', description);
    formData.set('detailDescription', detailDescription);
    formData.set('category', category._id);
    formData.set('gender', gender);

    sizes.forEach((sizes) => {
      formData.append('sizes', sizes._id);
    });

    colors.forEach((colors) => {
      formData.append('colors', colors._id);
    });

    const stockArr = stock.map((item) => {
      return { size: item.size._id, color: item.color._id, quantity: item.quantity };
    });

    stockArr.forEach((stockItem) => {
      formData.append('stock', JSON.stringify(stockItem));
    });

    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post('/api/v1/admin/product', formData, config);
      if (data.success) {
        toast.success('Tạo sản phẩm thành công.');
        navigate('/admin/management/products');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleColorChange = (e) => {
    let stockArr = [];
    sizes.forEach((size) => {
      e.target.value.forEach((color) => {
        stockArr.push({ size, color, quantity: 0 });
      });
    });
    setStock(stockArr);
    setColors(e.target.value);
  };

  const handleSizeChange = (e) => {
    let stockArr = [];
    e.target.value.forEach((size) => {
      colors.forEach((color) => {
        stockArr.push({ size, color, quantity: 0 });
      });
    });
    setStock(stockArr);
    setSizes(e.target.value);
  };

  const hanleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImagesPreview([]);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          // 0 == just created, 1 == processing, 2 == ready
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <TopNav />
      <SideNav>
        <main>
          <div className="container-fluid px-4">
            <h1 className="my-4">Tạo sản phẩm</h1>
            <OutlineBox>
              <Form className="form-control p-4" onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label htmlFor="name_field">Tên</Form.Label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="my-3">
                  <Form.Label htmlFor="description_field">Mô tả</Form.Label>
                  <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </Form.Group>

                <Form.Group className="my-3">
                  <Form.Label htmlFor="description_field">Mô tả chi tiết</Form.Label>
                  <textarea
                    rows="8"
                    className="form-control"
                    value={detailDescription}
                    onChange={(e) => setDetailDescription(e.target.value)}
                  ></textarea>
                </Form.Group>

                <Form.Group className="my-3">
                  <Row>
                    <Col md={6}>
                      <Form.Label htmlFor="description_field">Giá</Form.Label>
                      <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </Col>
                    <Col md={6}>
                      <Form.Label htmlFor="description_field">Giá khuyến mại</Form.Label>
                      <Form.Control type="number" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} />
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group className="my-3">
                  <Row>
                    <Col md={3}>
                      <Form.Label>Danh mục</Form.Label>
                      <br />
                      <Select
                        sx={{ minWidth: 200 }}
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        input={<OutlinedInput />}
                        selectprops={{
                          renderValue: (data) => <div>{data.map((item) => item.name).join(', ')}</div>,
                        }}
                        MenuProps={{
                          sx: {
                            '&& .Mui-selected': {
                              backgroundColor: '#90caf9',
                            },
                          },
                        }}
                      >
                        {categoriesData.map((item) => (
                          <MenuItem key={item._id} value={item}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </Col>

                    <Col md={3}>
                      <Form.Label>Kích cỡ</Form.Label>
                      <br />
                      <Select
                        sx={{ minWidth: 200 }}
                        multiple
                        value={sizes}
                        onChange={(e) => handleSizeChange(e)}
                        input={<OutlinedInput />}
                        MenuProps={{
                          sx: {
                            '&& .Mui-selected': {
                              backgroundColor: '#90caf9',
                            },
                          },
                        }}
                        selectprops={{
                          renderValue: (data) => <div>{data.map((item) => item.name).join(', ')}</div>,
                        }}
                      >
                        {sizesData.map((item) => (
                          <MenuItem key={item._id} value={item}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </Col>

                    <Col md={3}>
                      <Form.Label>Màu sắc</Form.Label>
                      <br />
                      <Select
                        sx={{ minWidth: 200, maxWidth: 350 }}
                        multiple
                        value={colors}
                        onChange={(e) => handleColorChange(e)}
                        input={<OutlinedInput />}
                        selectprops={{
                          renderValue: (data) => <div>{data.map((item) => item.name).join(', ')}</div>,
                        }}
                        MenuProps={{
                          sx: {
                            '&& .Mui-selected': {
                              backgroundColor: '#90caf9',
                            },
                          },
                        }}
                      >
                        {colorsData.map((item) => (
                          <MenuItem key={item._id} value={item}>
                            <Box
                              sx={{
                                width: 20,
                                height: 20,
                                backgroundColor: item.hexCode,
                                mr: 1,
                                display: 'inline-block',
                              }}
                            />
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </Col>

                    <Col md={3}>
                      <Form.Label>Giới tính</Form.Label>
                      <br />
                      <Select
                        sx={{ minWidth: 200 }}
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        input={<OutlinedInput />}
                        renderValue={(data) => <div>{data}</div>}
                        MenuProps={{
                          sx: {
                            '&& .Mui-selected': {
                              backgroundColor: '#90caf9',
                            },
                          },
                        }}
                      >
                        <MenuItem key={1} value={'Tất cả'}>
                          Tất cả
                        </MenuItem>
                        <MenuItem key={2} value={'Nam'}>
                          Nam
                        </MenuItem>
                        <MenuItem key={3} value={'Nữ'}>
                          Nữ
                        </MenuItem>
                      </Select>
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Kho hàng</Form.Label>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Kích cỡ</th>
                        <th>Màu sắc</th>
                        <th>Kho</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stock.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td className="text-center">{item.size.name}</td>
                            <td className="text-center">{item.color.name}</td>
                            <td>
                              <Form.Control
                                type="number"
                                value={item.quantity}
                                onChange={(e) => {
                                  setStock([
                                    ...stock.slice(0, index),
                                    { size: item.size, color: item.color, quantity: e.target.value },
                                    ...stock.slice(index + 1),
                                  ]);
                                }}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Form.Group>

                <Form.Group className="my-3">
                  <Form.Label htmlFor="description_field">
                    Ảnh <span className="text-primary">(Chọn nhiều)</span>
                  </Form.Label>
                  <Form.Control type="file" multiple onChange={(e) => hanleFileChange(e)} />
                  {imagesPreview.map((img) => (
                    <img src={img} key={img} alt="Product" className="mt-3 mr-2" width="100" height="100" />
                  ))}
                </Form.Group>

                <Form.Group className="my-3">
                  <Form.Label htmlFor="description_field">Kích hoạt</Form.Label>
                  <Form.Check
                    checked={active}
                    onChange={(e) => {
                      setActive(e.target.checked);
                    }}
                  />
                </Form.Group>

                <button id="login_button" type="submit" className="btn btn-primary px-3">
                  Tạo
                </button>
              </Form>
            </OutlineBox>
          </div>
        </main>
        <FooterAdmin />
      </SideNav>
    </Fragment>
  );
};

export default CreateProduct;
