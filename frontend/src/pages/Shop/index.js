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
import { useSearchParams } from 'react-router-dom';
import Loader from '~/layouts/Loader';
import { Pagination, Stack } from '@mui/material';
import axios from 'axios';
import { END_POINT } from '~/config';

const Shop = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState('');

  const { loading, products, error, productsCount, resPerPage, filteredProductsCount } = useSelector(
    (state) => state.products,
  );
  const [searchParams] = useSearchParams('');
  const keyword = searchParams.get('keyword');
  const [allCategory, setAllCategory] = useState([]);
  const [allSize, setAllSize] = useState([]);
  const [allColor, setAllColor] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        const promise1 = axios.get(`${END_POINT}/api/v1/categories`);
        const promise2 = axios.get(`${END_POINT}/api/v1/sizes`);
        const promise3 = axios.get(`${END_POINT}/api/v1/colors`);
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
    dispatch(getProducts(keyword, currentPage, category));
  }, [dispatch, error, keyword, currentPage, category]);

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
                    <h4 className="floatleft">Danh mục</h4>
                    <h5 className="floatright">
                      <a href="#!">Tất cả</a>
                    </h5>
                  </div>
                  <div className="categories left-right-p">
                    <ul id="accordion" className="panel-group clearfix">
                      {allCategory.map((item) => (
                        <li className="panel" key={item._id}>
                          <div
                            className={`medium-a ${category === item._id && 'text-danger'}`}
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
                      <a href="#!">Tất cả</a>
                    </h5>
                  </div>
                  <div className="categories left-right-p">
                    <ul id="accordion" className="panel-group clearfix">
                      <li className="panel">
                        <div className="medium-a">Dưới 300.000₫</div>
                      </li>
                      <li className="panel">
                        <div className="medium-a">300.000₫ - 500.000₫</div>
                      </li>
                      <li className="panel">
                        <div className="medium-a">500.000₫ - 1.000.000₫</div>
                      </li>
                      <li className="panel">
                        <div className="medium-a">Trên 1.000.000₫</div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="s-side-text">
                  <div className="sidebar-title clearfix">
                    <h4 className="floatleft">Kích cỡ</h4>
                    <h5 className="floatright">
                      <a href="#">Tất cả</a>
                    </h5>
                  </div>
                  <div className="size-select clearfix">
                    {allSize.map((item) => (
                      <a href="#!" key={item._id}>
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="s-side-text">
                  <div className="sidebar-title clearfix">
                    <h4 className="floatleft">Màu sắc</h4>
                    <h5 className="floatright">
                      <a href="#">Tất cả</a>
                    </h5>
                  </div>
                  <div className="color-select clearfix">
                    {allColor.map((item) => (
                      <span style={{ background: item.hexCode }} key={item._id}></span>
                    ))}
                    {/* <span className="outline"></span> */}
                  </div>
                </div>
                <div className="s-side-text">
                  <div className="banner clearfix">
                    <a href="#">
                      <img src="img/products/banner.jpg" alt="" />
                    </a>
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
                <GridProduct products={products} />
                <Row>
                  <Col>
                    <div className="pagnation-ul">
                      <Stack spacing={2}>
                        <Pagination
                          count={filteredProductsCount / resPerPage && Math.ceil(filteredProductsCount / resPerPage)}
                          onChange={(e, page) => {
                            setCurrentPage(page);
                          }}
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
