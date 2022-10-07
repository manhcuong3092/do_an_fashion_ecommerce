import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const SliderSection = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="img/slider/home2/1.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <div className="container pb-2 caption">
            <div className="slider-left slider-right">
              <div className="slide-text animated zoomInUp">
                <h3 className='text-secondary'>Bộ sưu tập mới</h3>
                <h1 className='text-danger'>Men’s Fashion 2022</h1>
              </div>
              <div className="animated slider-btn fadeInUpBig">
                <a className="shop-btn" href="shop.html">Mua ngay</a>
              </div>
            </div>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="img/slider/home2/2.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          <div className="container pb-5 caption">
            <div className="slider-left slider-right">
              <div className="slide-text animated zoomInUp">
                <h3 className='text-secondary'>Bộ sưu tập mới</h3>
                <h1 className='text-danger'>Men’s Fashion 2022</h1>
              </div>
              <div className="animated slider-btn fadeInUpBig">
                <a className="shop-btn" href="shop.html">Mua ngay</a>
              </div>
            </div>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default SliderSection