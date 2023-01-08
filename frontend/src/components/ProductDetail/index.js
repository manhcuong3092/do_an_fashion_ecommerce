import React, { useEffect, useState } from 'react';
import QuickImages from './QuickImages';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '~/redux/actions/cartActions';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const ProductDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [stock, setStock] = useState('');
  const [sku, setSku] = useState('');
  const [productItem, setProductItem] = useState(null);

  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const addToCart = () => {
    const cartItemIndex = cartItems.findIndex((i) => i.productItem._id === productItem._id);
    if (cartItemIndex !== -1) {
      if (cartItems[cartItemIndex].quantity + quantity > productItem.stock) {
        toast.info('Trong kho chỉ có ' + productItem.stock + ' sản phẩm. Xem lại giỏ hàng');
        return;
      }
    }

    dispatch(addItemToCart(productItem, quantity, user));
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
    setColor(product.colors[0]);
    setSize(product.sizes[0]);
    console.log('update');
  }, [product]);

  useEffect(() => {
    const stockIndex = product.productItems.findIndex(
      (stock) => stock.size._id === size._id && stock.color._id === color._id,
    );
    setStock(product.productItems[stockIndex].stock);
    setSku(product.productItems[stockIndex].sku);
    setProductItem(product.productItems[stockIndex]);
    setQuantity(1);
  }, [size, color]);

  return (
    <Row className="single-list-view">
      <QuickImages images={product.images} />
      <Col md={7} lg={8}>
        <div className="quick-right">
          <div className="list-text">
            <h3>{product.name}</h3>
            <span>{product.category.name}</span>
            <span className="floatright ratting">
              <p>( {product.numOfReviews} Đánh giá )</p>
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
            <p style={{ whiteSpace: 'pre-line' }}>{product.description}</p>
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
                    <Link className="dec qtybutton" onClick={(e) => handleDecrease(e)}>
                      -
                    </Link>
                    <input type="text" readOnly value={quantity} name="qtybutton" className="plus-minus-box" />
                    <Link className="inc qtybutton" onClick={(e) => handleIncrease(e)}>
                      +
                    </Link>
                  </div>
                </form>
              </div>
              <div className="s-shoose">
                <p>Số lượng trong kho: {stock}</p>
                <p>SKU: {sku}</p>
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
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default ProductDetail;
