import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';

const SliderSection = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src="img/slider/home2/1.jpg" alt="First slide" />
        <Carousel.Caption>
          <div className="container pb-3 caption">
            <div className="slider-left slider-right">
              <div className="animated slider-btn fadeInUpBig">
                <Link className="shop-btn" to="/shop">
                  Mua ngay
                </Link>
              </div>
            </div>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="img/slider/home2/2.jpg" alt="Second slide" />
        <Carousel.Caption>
          <div className="container pb-3 caption">
            <div className="slider-left slider-right">
              <div className="animated slider-btn fadeInUpBig">
                <Link className="shop-btn" to="/shop">
                  Mua ngay
                </Link>
              </div>
            </div>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default SliderSection;
