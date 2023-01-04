import React, { Fragment, useEffect, useState } from 'react';
import GridProduct from '../../components/GridProduct';
import PageTitle from '../../layouts/PageTitle';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getProducts } from '~/redux/actions/productActions';
import { Link, useSearchParams } from 'react-router-dom';
import Loader from '~/layouts/Loader';
import { Pagination, Stack } from '@mui/material';
import axios from 'axios';
import { END_POINT } from '~/config';
import { PRICE_RANGE_1, PRICE_RANGE_2, PRICE_RANGE_3, PRICE_RANGE_4 } from '~/constants/filterPrice';
import { Dropdown } from 'react-bootstrap';
import { SORT_ASC, SORT_DESC } from '~/constants/filterPrice';

const Shop = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState([null, null]);
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [gender, setGender] = useState('');

  const [allCategory, setAllCategory] = useState([]);
  const [allSize, setAllSize] = useState([]);
  const [allColor, setAllColor] = useState([]);
  const [keyword, setKeyword] = useState('');

  const [searchParams] = useSearchParams('');
  const [sort, setSort] = useState('Không');

  const { loading, products, error, resPerPage, productsCount } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    setKeyword(searchParams.get('keyword') ? searchParams.get('keyword') : '');
  }, [searchParams]);

  useEffect(() => {
    const cateQuery = searchParams.get('category');
    if (cateQuery) {
      const getCategory = async () => {
        const { data } = await axios.get(`${END_POINT}/api/v1/category/slug/${cateQuery}`, { withCredentials: true });
        if (data) {
          setCategory(data.category._id);
        }
      };
      getCategory();
    }
  }, [searchParams]);

  useEffect(() => {
    const getData = async () => {
      try {
        const promise1 = axios.get(`${END_POINT}/api/v1/categories`, { withCredentials: true });
        const promise2 = axios.get(`${END_POINT}/api/v1/sizes`, { withCredentials: true });
        const promise3 = axios.get(`${END_POINT}/api/v1/colors`, { withCredentials: true });
        Promise.all([promise1, promise2, promise3]).then((result) => {
          setAllCategory(result[0].data.categories);
          setAllSize(result[1].data.sizes);
          setAllColor(result[2].data.colors);
        });
      } catch (error) {
        toast.error(error);
        return;
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      return;
    }
    dispatch(getProducts(keyword, currentPage, category, price, color, size, gender, sort));
  }, [dispatch, error, currentPage, category, price, color, size, gender, sort]);

  const handleSearch = () => {
    dispatch(getProducts(keyword, currentPage, category, price, color, size, gender, sort));
  };

  const handleChooseCategory = (e, id) => {
    setCategory(id);
  };

  return (
    <Fragment>
      {loading && <Loader />}
      <Header />
      <PageTitle title="Danh sách sản phẩm" />
      <section className="pages products-page section-padding-bottom">
        <Container>
          <Row className="pt-4">
            <Col md={4} lg={3}>
              <div className="sidebar left-sidebar">
                <div className="s-side-text">
                  <div className="sidebar-title clearfix">
                    <h4 className="floatleft">Tìm kiếm</h4>
                  </div>
                  <div className="categories left-right-p">
                    <ul id="accordion" className="panel-group clearfix">
                      <li className="panel">
                        <div className="search-product">
                          <input
                            type="text"
                            className="search-input"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="Tìm kiếm..."
                          />
                          <button className="search-btn" onClick={handleSearch}>
                            <i className="mdi mdi-magnify"></i>
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="s-side-text">
                  <div className="sidebar-title clearfix">
                    <h4 className="floatleft">Danh mục</h4>
                    <h5 className="floatright">
                      <p onClick={(e) => setCategory('')} className={`${category === '' ? 'text-danger' : ''}`}>
                        Tất cả
                      </p>
                    </h5>
                  </div>
                  <div className="categories left-right-p">
                    <ul id="accordion" className="panel-group clearfix">
                      {allCategory.map((item) => (
                        <li className="panel" key={item._id}>
                          <div
                            className={`medium-a ${category === item._id ? 'text-danger' : ''}`}
                            onClick={(e) => handleChooseCategory(e, item._id)}
                          >
                            {item.name}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="s-side-text">
                  <div className="sidebar-title clearfix">
                    <h4 className="floatleft">Giá</h4>
                    <h5 className="floatright">
                      <p
                        onClick={(e) => setPrice([null, null])}
                        className={`${price[0] === null && price[1] === null ? 'text-danger' : ''}`}
                      >
                        Tất cả
                      </p>
                    </h5>
                  </div>
                  <div className="categories left-right-p">
                    <ul id="accordion" className="panel-group clearfix">
                      <li className="panel">
                        <div
                          className={`medium-a ${
                            price[0] === PRICE_RANGE_1[0] && price[1] === PRICE_RANGE_1[1] ? 'text-danger' : ''
                          }`}
                          onClick={(e) => setPrice(PRICE_RANGE_1)}
                        >
                          Dưới 300.000₫
                        </div>
                      </li>
                      <li className="panel">
                        <div
                          className={`medium-a ${
                            price[0] === PRICE_RANGE_2[0] && price[1] === PRICE_RANGE_2[1] ? 'text-danger' : ''
                          }`}
                          onClick={(e) => setPrice(PRICE_RANGE_2)}
                        >
                          300.000₫ - 500.000₫
                        </div>
                      </li>
                      <li className="panel">
                        <div
                          className={`medium-a ${
                            price[0] === PRICE_RANGE_3[0] && price[1] === PRICE_RANGE_3[1] ? 'text-danger' : ''
                          }`}
                          onClick={(e) => setPrice(PRICE_RANGE_3)}
                        >
                          500.000₫ - 1.000.000₫
                        </div>
                      </li>
                      <li className="panel">
                        <div
                          className={`medium-a ${
                            price[0] === PRICE_RANGE_4[0] && price[1] === PRICE_RANGE_4[1] ? 'text-danger' : ''
                          }`}
                          onClick={(e) => setPrice(PRICE_RANGE_4)}
                        >
                          Trên 1.000.000₫
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="s-side-text">
                  <div className="sidebar-title clearfix">
                    <h4 className="floatleft">Kích cỡ</h4>
                    <h5 className="floatright">
                      <p className={`${size === '' ? 'text-danger' : ''}`} onClick={(e) => setSize('')}>
                        Tất cả
                      </p>
                    </h5>
                  </div>
                  <div className="size-select clearfix">
                    {allSize.map((item) => (
                      <a
                        href="#!"
                        key={item._id}
                        onClick={(e) => setSize(item._id)}
                        className={`${size === item._id ? 'selected-size' : ''}`}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="s-side-text">
                  <div className="sidebar-title clearfix">
                    <h4 className="floatleft">Màu sắc</h4>
                    <h5 className="floatright">
                      <p className={`${color === '' ? 'text-danger' : ''}`} onClick={(e) => setColor('')}>
                        Tất cả
                      </p>
                    </h5>
                  </div>
                  <div className="color-select clearfix">
                    {allColor.map((item) => (
                      <span
                        style={{ background: item.hexCode }}
                        key={item._id}
                        onClick={(e) => setColor(item._id)}
                        className={`${color === item._id && 'outline'}`}
                      ></span>
                    ))}
                    {/* <span className="outline"></span> */}
                  </div>
                </div>
                <div className="s-side-text">
                  <div className="sidebar-title clearfix">
                    <h4 className="floatleft">Giới tính</h4>
                    <h5 className="floatright">
                      <p onClick={(e) => setGender('')} className={`${gender === '' ? 'text-danger' : ''}`}>
                        Tất cả
                      </p>
                    </h5>
                  </div>
                  <div className="categories left-right-p">
                    <ul id="accordion" className="panel-group clearfix">
                      <li className="panel">
                        <div
                          className={`medium-a ${gender === 'Nam' ? 'text-danger' : ''}`}
                          onClick={(e) => setGender('Nam')}
                        >
                          Nam
                        </div>
                      </li>
                      <li className="panel">
                        <div
                          className={`medium-a ${gender === 'Nữ' ? 'text-danger' : ''}`}
                          onClick={(e) => setGender('Nữ')}
                        >
                          Nữ
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="s-side-text">
                  <div className="banner clearfix">
                    <Link>
                      <img src="img/products/banner.jpg" alt="" />
                    </Link>
                    <div className="banner-text">
                      <h2>best</h2> <br />
                      <h2 className="banner-brand">brand</h2>
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            <Col md={8} lg={9}>
              <div className="right-products">
                <Row>
                  <div className="col-12">
                    <div className="section-title clearfix">
                      <ul>
                        <li>
                          <ul className="d-flex bd-highlight">
                            <li className="sort-by flex-grow-1 bd-highlight">
                              {productsCount !== 0 ? (
                                <>
                                  Hiện thị {resPerPage * (currentPage - 1) + 1} -{' '}
                                  {resPerPage * currentPage < productsCount ? resPerPage * currentPage : productsCount}{' '}
                                  của {productsCount} sản phẩm tìm thấy
                                </>
                              ) : (
                                ''
                              )}
                            </li>
                            <li className="sort-by bd-highlight" style={{ marginRight: '5px' }}>
                              Sắp xếp: {sort}{' '}
                            </li>
                            <li className="bd-highlight ml-5 mt-2">
                              <Dropdown>
                                <Dropdown.Toggle variant="light" id="dropdown-basic">
                                  <i className="fa-solid fa-sort"></i>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item style={{ textTransform: 'none' }} onClick={() => setSort(SORT_ASC)}>
                                    Giá tăng dần
                                  </Dropdown.Item>
                                  <Dropdown.Item style={{ textTransform: 'none' }} onClick={() => setSort(SORT_DESC)}>
                                    Giá giảm dần
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Row>
                <Row>
                  <div className="tab-content grid-content">
                    <div className="tab-pane fade show active text-center" id="grid">
                      <Row>
                        <GridProduct
                          products={products}
                          resPerPage={resPerPage}
                          currentPage={currentPage}
                          productsCount={productsCount}
                        />
                      </Row>
                    </div>
                  </div>
                </Row>
                <Row>
                  <Col>
                    <div className="pagnation-ul">
                      <Stack spacing={2}>
                        <Pagination
                          count={productsCount && resPerPage && Math.ceil(productsCount / resPerPage)}
                          onChange={(e, page) => {
                            setCurrentPage(page);
                          }}
                          onClick={window.scrollTo(0, 150)}
                        />
                      </Stack>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </Fragment>
  );
};

export default Shop;
