import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { END_POINT } from '~/config';
import { Link, useNavigate } from 'react-router-dom';

const SampleProducts = () => {
  const [products, setProducts] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getNewProduct = async () => {
      try {
        const { data } = await axios.get(`${END_POINT}/api/v1/products/latest`, { withCredentials: true });
        if (data.success) {
          setProducts(data.products);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getNewProduct();
  }, []);

  return (
    <section className="single-products  products-two section-padding extra-padding-bottom">
      <Container>
        <Row>
          <Col>
            <div className="section-title text-center">
              <h2>Sản phẩm mới</h2>
            </div>
          </Col>
        </Row>
        <div className="wrapper">
          <ul className="load-list load-list-one">
            <li>
              <Row className="text-center">
                {products &&
                  products.map((item, index) => (
                    <Col md={6} lg={3} key={index}>
                      <div className="single-product">
                        <div className="product-img">
                          {item.isSale ? (
                            <div className="pro-type">
                              <span>Sale</span>
                            </div>
                          ) : (
                            <div className="pro-type sell">
                              <span>New</span>
                            </div>
                          )}
                          <Link to={`/product/${item.slug}`}>
                            <img src={item.images ? item.images[0].url : ''} alt="Product Title" />
                          </Link>
                        </div>
                        <div className="product-dsc">
                          <p>
                            <Link to={`/product/${item.slug}`}>{item.name}</Link>
                          </p>
                          <span>{(item.isSale ? item.salePrice : item.price).toLocaleString('vi-VN')}đ</span>
                        </div>
                      </div>
                    </Col>
                  ))}
              </Row>
            </li>
          </ul>
          <button id="load-more-one" className="mt-5" onClick={() => navigate('/shop')}>
            Xem thêm
          </button>
        </div>
      </Container>
    </section>
  );
};

export default SampleProducts;
