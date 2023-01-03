import React, { Fragment } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

const BlogDetail = ({ blog }) => {
  return (
    <div className="single-blog-page">
      {blog && (
        <Fragment>
          <div className="single-blog-img">
            <img src={blog.avatar ? blog.avatar.url : ''} alt="" />
          </div>
          <div className="padding30">
            <div className="blog-text">
              <div className="post-title">
                <h3>{blog.title}</h3>
                <ul className="clearfix">
                  <li>
                    <i className="pe-7s-user"></i>Tác giả : <Link>{blog.author.name}</Link>
                    <span>|</span>
                  </li>
                  <li>
                    <i className="pe-7s-comment"></i>
                    <Link>{new Date(Date.parse(blog.createdAt)).toLocaleDateString('vi-VN')}</Link>
                    <span>|</span>
                  </li>
                </ul>
              </div>
              <div dangerouslySetInnerHTML={{ __html: blog.content }} className="mt-5" />
            </div>
            <div className="leave-comment">
              <h4>Để lại bình luận của bạn</h4>
              <form action="#">
                <Row>
                  <Col md={6}>
                    <div className="input-text">
                      <input type="text" name="name" placeholder="Tên" value="" />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="input-text">
                      <input type="text" name="email" placeholder="Email" value="" />
                    </div>
                  </Col>
                  <Col>
                    <div className="input-text">
                      <textarea name="comment" id="comment" placeholder="Nội dung" rows="4"></textarea>
                    </div>
                  </Col>
                  <Col>
                    <div className="submit-text">
                      <button type="submit" value="submit form">
                        Bình luận
                      </button>
                    </div>
                  </Col>
                </Row>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default BlogDetail;
