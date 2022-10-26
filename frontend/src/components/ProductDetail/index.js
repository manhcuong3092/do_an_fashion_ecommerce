import React, { useEffect, useState } from 'react';
import QuickImages from './QuickImages';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '~/redux/actions/cartActions';
import { toast } from 'react-toastify';

const ProductDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [stock, setStock] = useState('');

  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const addToCart = () => {
    const existIndex = product.stock.findIndex((i) => i.size._id === size._id && i.color._id === color._id);
    if (existIndex === -1) {
      return;
    }
    const cartItemIndex = cartItems.findIndex((i) => i.size._id === size._id && i.color._id === color._id);
    if (cartItemIndex !== -1) {
      if (cartItems[cartItemIndex].quantity + quantity > product.stock[existIndex].quantity) {
        toast.info('Trong kho chỉ có ' + product.stock[existIndex].quantity + ' sản phẩm. Xem lại giỏ hàng');
        return;
      }
    }

    dispatch(addItemToCart(product, color, size, quantity, user));
    toast.success('Đã thêm sản phẩm vào giỏ');
  };

  const handleDecrease = (e) => {
    if (quantity === 1) {
      return;
    } else {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = (e) => {
    if (quantity >= stock) {
      return;
    }
    setQuantity(quantity + 1);
  };

  useEffect(() => {
    const stockIndex = product.stock.findIndex((stock) => stock.size._id === size._id && stock.color._id === color._id);
    setStock(product.stock[stockIndex].quantity);
    setQuantity(1);
  }, [product, size, color]);

  return (
    <Row className="single-list-view">
      <QuickImages images={product.images} />
      <Col md={7} lg={8}>
        <div className="quick-right">
          <div className="list-text">
            <h3>{product.name}</h3>
            <span className="floatright ratting">
              {(() => {
                let stars = [];
                for (let i = 1; i <= 5; i++) {
                  if (Math.round(product.ratings) >= i) {
                    stars.push(<i className="mdi mdi-star" key={i}></i>);
                  } else {
                    stars.push(<i className="mdi mdi-star-outline" key={i}></i>);
                  }
                }
                return stars;
              })()}
            </span>
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
                      key={item._id}
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
                    <input type="text" readOnly value={quantity} name="qtybutton" className="plus-minus-box" />
                    <a className="inc qtybutton" onClick={(e) => handleIncrease(e)}>
                      +
                    </a>
                  </div>
                </form>
              </div>
              <div className="s-shoose">
                <p>Số lượng trong kho: {stock}</p>
              </div>
            </div>
            {stock !== 0 ? (
              <div className="list-btn">
                <button onClick={(e) => addToCart()}>Thêm vào giỏ</button>
              </div>
            ) : (
              <div className="list-btn">
                <button>Đã hết hàng</button>
              </div>
            )}
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
