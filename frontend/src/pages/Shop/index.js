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

const Shop = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState('');

  const { loading, products, error, productsCount, resPerPage, filteredProductsCount } = useSelector(
    (state) => state.products,
  );
  const [searchParams] = useSearchParams('');
  const keyword = searchParams.get('keyword');

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      return;
    }
    dispatch(getProducts(keyword, currentPage, category));
  }, [dispatch, error, keyword, currentPage, category]);

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
                      <li className="panel">
                        <div className="medium-a">Áo phông</div>
                      </li>
                      <li className="panel">
                        <div className="medium-a">Quần âu</div>
                      </li>
                      <li className="panel">
                        <div className="medium-a">Áo khoác</div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="s-side-text">
                  <div className="sidebar-title">
                    <h4>Giá</h4>
                  </div>
                  <div className="range-slider clearfix">
                    <label>
                      <span>Khoảng giá</span> <input type="text" id="amount" />
                    </label>
                    <div id="slider-range"></div>
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
                    <a href="#">m</a>
                    <a href="#">s</a>
                    <a href="#">l</a>
                    <a href="#">xl</a>
                    <a href="#">xll</a>
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
                    <span></span>
                    <span></span>
                    <span className="outline"></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
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
                          count={Math.ceil(filteredProductsCount / resPerPage)}
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
