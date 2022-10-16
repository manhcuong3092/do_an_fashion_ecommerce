import React, { useState } from 'react';
import QuickImages from './QuickImages';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Dropdown } from 'react-bootstrap';

const ProductDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);

  const handleDecrease = (e) => {
    if (quantity === 1) {
      return;
    } else {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = (e) => {
    setQuantity(quantity + 1);
  };

  return (
    <Row className="single-list-view">
      <QuickImages images={product.images} />
      <Col md={7} lg={8}>
        <div className="quick-right">
          <div className="list-text">
            <h3>{product.name}</h3>
            <div className="ratting floatright">
              <p>( {product.reviews ? product.reviews.length : 0} Đánh giá )</p>
              <i className="mdi mdi-star"></i>
              <i className="mdi mdi-star"></i>
              <i className="mdi mdi-star"></i>
              <i className="mdi mdi-star-half"></i>
              <i className="mdi mdi-star-outline"></i>
            </div>
            <h5>
              <del>{product.isSale && `${product.price.toLocaleString('vi-VN')}₫`}</del>{' '}
              {product.isSale ? `${product.salePrice.toLocaleString('vi-VN')}` : product.price.toLocaleString('vi-VN')}₫
            </h5>
            <p>{product.description}</p>
            <div className="all-choose">
              <div className="s-shoose">
                <h5>Màu sắc</h5>
                <div className="color-select clearfix pt-1">
                  {product.colors.map((item) => (
                    <span
                      style={{ background: item.hexCode }}
                      onClick={(e) => setColor(item)}
                      className={color._id === item._id ? 'outline' : ''}
                    ></span>
                  ))}
                </div>
              </div>
              <div className="s-shoose">
                <h5>Kích cỡ</h5>
                <div className="size-drop">
                  <Dropdown className="btn-group">
                    <button type="button" className="btn">
                      {size.name}
                    </button>
                    <Dropdown.Toggle></Dropdown.Toggle>
                    <Dropdown.Menu>
                      {product.sizes.map((item) => (
                        <Dropdown.Item key={item._id} onClick={(e) => setSize(item)}>
                          {item.name}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              <div className="s-shoose">
                <h5>Số lượng</h5>
                <form action="#">
                  <div className="plus-minus">
                    <a className="dec qtybutton" onClick={(e) => handleDecrease(e)}>
                      -
                    </a>
                    <input type="text" value={quantity} name="qtybutton" className="plus-minus-box" />
                    <a className="inc qtybutton" onClick={(e) => handleIncrease(e)}>
                      +
                    </a>
                  </div>
                </form>
              </div>
            </div>
            <div className="list-btn">
              <a href="#">add to cart</a>
              <a href="#">wishlist</a>
              <a href="#" data-bs-toggle="modal" data-bs-target="#quick-view">
                zoom
              </a>
            </div>
            <div className="share-tag clearfix">
              <ul className="blog-share floatleft">
                <li>
                  <h5>share </h5>
                </li>
                <li>
                  <a href="#">
                    <i className="mdi mdi-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="mdi mdi-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="mdi mdi-linkedin"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="mdi mdi-vimeo"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="mdi mdi-dribbble"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="mdi mdi-instagram"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default ProductDetail;
