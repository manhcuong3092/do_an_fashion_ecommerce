import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';

const QuickImages = ({ images }) => {
  const [currentImg, setCurrentImg] = useState(null);

  useEffect(() => {
    setCurrentImg(images[0]);
  }, [images]);

  return (
    <Col md={5} lg={4}>
      <div className="quick-image">
        <div className="single-quick-image text-center">
          <div className="list-img">
            <div className="product-img tab-content">
              <img src={currentImg && currentImg.url} alt="" />
            </div>
          </div>
        </div>
        <div className="quick-thumb">
          <ul className="product-slider nav">
            {images.map((image) => (
              <li key={image.public_id} onClick={(e) => setCurrentImg(image)}>
                <a data-bs-toggle="tab" href="#sin-1">
                  {' '}
                  <img src={image.url} alt="quick view" />{' '}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Col>
  );
};

export default QuickImages;
