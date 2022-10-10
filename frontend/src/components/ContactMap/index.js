import React from 'react'
import GoogleMapReact from 'google-map-react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const MapMaker = () => <div><i class="fa-solid fa-location-dot"  style={{ color: 'red', fontSize: '20px' }}></i></div>;

const ContactMap = () => {
  const map = {
    center: {
      lat: 21.108785,
      lng: 105.692478
    },
    zoom: 15
  };

  return (
    <div className="pages contact-page section-padding">
      <Container className="text-center">
        <Row>
          <Col>
            <div className="googleMap-info">
              <div id="googleMap" style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                  bootstrapURLKeys={{ key: "AIzaSyDiixWOmy0M45TbhVY5XpecnueXEc15E1U" }}
                  defaultCenter={map.center}
                  defaultZoom={map.zoom}
                >
                  <MapMaker
                    lat={21.108785}
                    lng={105.692478}
                    text="My Marker"
                  />
                </GoogleMapReact>
              </div>
              <div className="map-info">
                <p><strong>Amando</strong></p>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={10} className="col-text-center">
            <div className="contact-details">
              <Row>
                <Col md={4}>
                  <div className="single-contact">
                    <i className="mdi mdi-map-marker"></i>
                    <p>Số 1 đường Vạn Xuân, xã Hạ Mỗ.</p>
                    <p>huyện Đan Phượng, tp Hà Nội.</p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="single-contact">
                    <i className="mdi mdi-phone"></i>
                    <p>0123456789</p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="single-contact">
                    <i className="mdi mdi-email"></i>
                    <p>cuongamando@gmail.com</p>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ContactMap