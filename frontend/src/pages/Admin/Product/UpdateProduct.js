import React, { Fragment, useEffect, useState } from 'react';
import SideNav from '~/layouts/Admin/SideNav';
import TopNav from '~/layouts/Admin/TopNav';
import Form from 'react-bootstrap/Form';
import OutlineBox from '~/components/OutlineBox';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import FooterAdmin from '~/layouts/Admin/FooterAdmin';
import { Col, Row, Table } from 'react-bootstrap';
import { Box, MenuItem, OutlinedInput, Select } from '@mui/material';
import { END_POINT } from '~/config';
import validator from 'validator';
import Loader from '~/layouts/Loader';

const UpdateProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [detailDescription, setDetailDescription] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [images, setImages] = useState([]);
  const [active, setActive] = useState(true);
  const [gender, setGender] = useState('Tất cả');
  const [category, setCategory] = useState('');
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [stock, setStock] = useState([]);
  const [isSale, setIsSale] = useState(false);

  //Get list from API
  const [sizesData, setSizesData] = useState([]);
  const [colorsData, setColorsData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);

  //Image preview
  const [imagesPreview, setImagesPreview] = useState([]);
  const [oldImages, setOldImages] = useState([]);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { productId } = useParams();

  useEffect(() => {
    try {
      const fetchData = async () => {
        try {
          const promise1 = axios.get(`${END_POINT}/api/v1/sizes`);
          const promise2 = axios.get(`${END_POINT}/api/v1/colors`);
          const promise3 = axios.get(`${END_POINT}/api/v1/categories`);
          const promise4 = axios.get(`${END_POINT}/api/v1/admin/product/${productId}`, { withCredentials: true });
          Promise.all([promise1, promise2, promise3, promise4]).then((value) => {
            setSizesData(value[0].data.sizes);
            setColorsData(value[1].data.colors);
            setCategoriesData(value[2].data.categories);
            const product = value[3].data.product;
            setName(product.name);
            setDescription(product.description);
            setDetailDescription(product.detailDescription);
            setPrice(product.price);
            setSalePrice(product.salePrice);
            setGender(product.gender);
            setStock(product.stock);
            setActive(product.active);
            setOldImages(product.images);
            setIsSale(product.isSale);

            setCategory(JSON.stringify(product.category));
            setSizes(product.sizes.map((size) => JSON.stringify(size)));
            setColors(product.colors.map((color) => JSON.stringify(color)));
          });
        } catch (error) {
          toast.error(error.response.data.message);
        }
      };
      fetchData();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.warning('Hãy nhập tên sản phẩm');
      return;
    }
    if (!description) {
      toast.warning('Hãy mô tả sản phẩm');
      return;
    }
    if (!price) {
      toast.warning('Hãy nhập giá sản phẩm');
      return;
    } else if (validator.isNumeric(price + '') && price <= 0) {
      toast.warning('Giá sản phẩm phải lớn hơn 0');
      return;
    }

    if (!validator.isEmpty(salePrice + '') && validator.isNumeric(price + '') && salePrice < 0) {
      toast.warning('Giá khuyến mại sản phẩm không được nhỏ hơn 0');
      return;
    }

    if (!category) {
      toast.warning('Hãy chọn danh mục');
      return;
    }
    if (!sizes.length) {
      toast.warning('Hãy chọn kích cỡ');
      return;
    }
    if (!colors.length) {
      toast.warning('Hãy chọn màu sắc');
      return;
    }

    const productData = {
      name,
      price,
      salePrice,
      description,
      detailDescription,
      category: JSON.parse(category)._id,
      gender,
      active,
      isSale,
      sizes: [],
      colors: [],
      stock: [],
      images,
    };

    sizes.forEach((size) => {
      productData.sizes.push(JSON.parse(size)._id);
    });

    colors.forEach((color) => {
      productData.colors.push(JSON.parse(color)._id);
    });

    const stockArr = stock.map((item) => {
      return { size: item.size._id, color: item.color._id, quantity: item.quantity };
    });

    stockArr.forEach((stockItem) => {
      productData.stock.push(JSON.stringify(stockItem));
    });

    setLoading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };
      const { data } = await axios.put(`${END_POINT}/api/v1/admin/product/${productId}`, productData, config);
      if (data.success) {
        toast.success('Cập nhật sản phẩm thành công.');
        navigate('/admin/management/products');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setLoading(false);
  };

  const handleColorChange = (e) => {
    let stockArr = [];
    sizes.forEach((size) => {
      e.target.value.forEach((color) => {
        const index = stock.findIndex(
          (item) => item.size._id === JSON.parse(size)._id && item.color._id === JSON.parse(color)._id,
        );
        if (index !== -1) {
          stockArr.push(stock[index]);
        } else {
          stockArr.push({ size: JSON.parse(size), color: JSON.parse(color), quantity: 0 });
        }
      });
    });
    setStock(stockArr);
    setColors(e.target.value);
  };

  const handleSizeChange = (e) => {
    let stockArr = [];
    e.target.value.forEach((size) => {
      colors.forEach((color) => {
        const index = stock.findIndex(
          (item) => item.size._id === JSON.parse(size)._id && item.color._id === JSON.parse(color)._id,
        );
        if (index !== -1) {
          stockArr.push(stock[index]);
        } else {
          stockArr.push({ size: JSON.parse(size), color: JSON.parse(color), quantity: 0 });
        }
      });
    });
    setStock(stockArr);
    setSizes(e.target.value);
  };

  const hanleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImagesPreview([]);
    setImages([]);
    setOldImages([]);

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
      {loading && <Loader />}
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
                  <Form.Control
                    as="textarea"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
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
                  </Row>
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="description_field">Đang khuyến mại</Form.Label>
                  <Form.Check value={isSale} onChange={(e) => setIsSale(e.target.checked)} />
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
                        MenuProps={{
                          sx: {
                            '&& .Mui-selected': {
                              backgroundColor: '#90caf9',
                            },
                          },
                        }}
                      >
                        {categoriesData.map((item) => (
                          <MenuItem key={item._id} value={JSON.stringify(item)}>
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
                      >
                        {sizesData.map((item) => (
                          <MenuItem key={item._id} value={JSON.stringify(item)}>
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
                        MenuProps={{
                          sx: {
                            '&& .Mui-selected': {
                              backgroundColor: '#90caf9',
                            },
                          },
                        }}
                      >
                        {colorsData.map((item) => (
                          <MenuItem key={item._id} value={JSON.stringify(item)}>
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
                        <MenuItem key={1} value={'Nam'}>
                          Nam
                        </MenuItem>
                        <MenuItem key={2} value={'Nữ'}>
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
                  {oldImages &&
                    oldImages.map((img) => (
                      <img src={img.url} key={img} alt={img.url} className="mt-3 mr-2" width="100" height="100" />
                    ))}
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

                <button type="submit" className="btn btn-primary px-3">
                  Cập nhật
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

export default UpdateProduct;
