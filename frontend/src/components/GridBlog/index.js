import React, { Fragment } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

const GridBlog = ({ blogs }) => {
  return (
    <Fragment>
      <li>
        <Row>
          {blogs &&
            blogs.map((item) => (
              <Col md={6} className="mb-4" key={item._id}>
                <div className="l-blog-text">
                  <div className="banner">
                    <Link to={`/blog/${item.slug}`}>
                      <div className="container-blog-avatar">
                        <img src={item.avatar ? item.avatar.url : ''} alt="" className="blog-avatar" />
                      </div>
                    </Link>
                  </div>
                  <div className="s-blog-text">
                    <h4>
                      <Link to={`/blog/${item.slug}`}>{item.title}</Link>
                    </h4>
                    <span>
                      Tác giả : <a href="#!">{item.author.name}</a> |{' '}
                      <a href="#!">
                        <i className="mdi mdi-clock"></i>{' '}
                        {new Date(Date.parse(item.createdAt)).toLocaleDateString('vi-VN')}
                      </a>
                    </span>
                    <div dangerouslySetInnerHTML={{ __html: item.content }} className="short-content" />
                  </div>
                  <div className="date-read clearfix">
                    <Link to={`/blog/${item.slug}`}>Đọc thêm</Link>
                  </div>
                </div>
              </Col>
            ))}
        </Row>
      </li>
    </Fragment>
  );
};

export default GridBlog;
