import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const BlogSection = () => {
  return (
    <section className="latest-blog section-padding">
      <Container>
        <Row>
          <Col>
            <div className="section-title text-center">
              <h2>Blog mới nhất</h2>
            </div>
          </Col>
        </Row>
        <div className="wrapper">
          <ul className="load-list load-list-blog">
            <li>
              <Row>
                <Col md={4}>
                  <div className="l-blog-text">
                    <div className="banner"><a href="single-blog.html"><img src="img/blog/1.jpg" alt="" /></a></div>
                    <div className="s-blog-text">
                      <h4><a href="single-blog.html">Fashion style fine arts drawing</a></h4>
                      <span>By : <a href="#">Rakib</a> | <a href="#">210 Like</a> | <a href="#">69 Comments</a></span>
                      <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour....</p>
                    </div>
                    <div className="date-read clearfix">
                      <a href="#"><i className="mdi mdi-clock"></i> jun 25, 2021</a>
                      <a href="single-blog.html">Đọc thêm</a>
                    </div>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="l-blog-text">
                    <div className="banner"><a href="single-blog.html"><img src="img/blog/2.jpg" alt="" /></a></div>
                    <div className="s-blog-text">
                      <h4><a href="single-blog.html">women’s Fashion style 2021</a></h4>
                      <span>By : <a href="#">Rakib</a> | <a href="#">210 Like</a> | <a href="#">69 Comments</a></span>
                      <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour....</p>
                    </div>
                    <div className="date-read clearfix">
                      <a href="#"><i className="mdi mdi-clock"></i> jun 15, 2021</a>
                      <a href="single-blog.html">Đọc thêm</a>
                    </div>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="l-blog-text">
                    <div className="banner"><a href="single-blog.html"><img src="img/blog/3.jpg" alt="" /></a></div>
                    <div className="s-blog-text">
                      <h4><a href="single-blog.html">women’s winter Fashion style</a></h4>
                      <span>By : <a href="#">Rakib</a> | <a href="#">210 Like</a> | <a href="#">69 Comments</a></span>
                      <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour....</p>
                    </div>
                    <div className="date-read clearfix">
                      <a href="#"><i className="mdi mdi-clock"></i> jun 22, 2021</a>
                      <a href="single-blog.html">Đọc thêm</a>
                    </div>
                  </div>
                </Col>
              </Row>
            </li>
          </ul>
        <button id="load-more-blog" className='mt-5'>Xem thêm</button>
        </div>
      </Container>
    </section>
  )
}

export default BlogSection