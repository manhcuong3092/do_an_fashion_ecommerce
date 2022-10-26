import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { END_POINT } from '~/config';
import { Link } from 'react-router-dom';

const RelatedProducts = ({ product }) => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      if (product) {
        try {
          const { data } = await axios.get(`${END_POINT}/api/v1/products?category=${product.category._id}`, {
            withCredentials: true,
          });
          if (data.success) {
            const res = data.products;
            res.sort(function () {
              return 0.5 - Math.random();
            });
            setProducts(res);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    getProduct();
  }, [product]);

  let relatedProduct = [];
  if (products) {
    for (let i = 0; i < 4; i++) {
      if (products[i]) {
        relatedProduct.push(products[i]);
      }
    }
  }

  return (
    <section className="single-products section-padding">
      <Container>
        <Row>
          <Col>
            <div className="section-title text-center">
              <h2>Sản phẩm tương tự</h2>
            </div>
          </Col>
        </Row>
        <Row className="text-center">
          {relatedProduct.map((item, index) => (
            <Col md={6} lg={3} key={index}>
              <div className="single-product">
                <div className="product-img">
                  {item.isSale && (
                    <div className="pro-type">
                      <span>Sale</span>
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
                  <span>{(item.isSale ? item.salePrice : item.price).toLocaleString('vi-VN')}</span>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default RelatedProducts;
