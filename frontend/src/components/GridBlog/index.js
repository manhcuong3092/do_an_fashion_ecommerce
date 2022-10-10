import React, { Fragment } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const GridBlog = () => {
  return (
    <Fragment>
      <ul className="blog-row clearfix">
        <li>
          <Row>
            <Col md={6} className="mb-4">
              <div className="l-blog-text">
                <div className="banner"><a href="single-blog.html"><img src="img/blog/1.jpg" alt="" /></a></div>
                <div className="s-blog-text">
                  <h4><a href="single-blog.html">Fashion style fine arts drawing</a></h4>
                  <span>By : <a href="#">Rakib</a> | <a href="#">210 Like</a> | <a href="#">69 Comments</a></span>
                  <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour....</p>
                </div>
                <div className="date-read clearfix">
                  <a href="#"><i className="mdi mdi-clock"></i> jun 25, 2021</a>
                  <a href="single-blog.html">read more</a>
                </div>
              </div>
            </Col>
            <Col md={6} className="mb-4">
              <div className="l-blog-text">
                <div className="banner"><a href="single-blog.html"><img src="img/blog/2.jpg" alt="" /></a></div>
                <div className="s-blog-text">
                  <h4><a href="single-blog.html">women’s Fashion style 2021</a></h4>
                  <span>By : <a href="#">Rakib</a> | <a href="#">210 Like</a> | <a href="#">69 Comments</a></span>
                  <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour....</p>
                </div>
                <div className="date-read clearfix">
                  <a href="#"><i className="mdi mdi-clock"></i> jun 15, 2021</a>
                  <a href="single-blog.html">read more</a>
                </div>
              </div>
            </Col>
          </Row>
        </li>
      </ul>
      <div className="pagnation-ul">
        <ul className="clearfix">
          <li><a href="#"><i className="mdi mdi-menu-left"></i></a></li>
          <li><a href="#">1</a></li>
          <li><a href="#">2</a></li>
          <li><a href="#">3</a></li>
          <li><a href="#">4</a></li>
          <li><a href="#">5</a></li>
          <li><a href="#">...</a></li>
          <li><a href="#">10</a></li>
          <li><a href="#"><i className="mdi mdi-menu-right"></i></a></li>
        </ul>
      </div>
    </Fragment>
  )
}

export default GridBlog