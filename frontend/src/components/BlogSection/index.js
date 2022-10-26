import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Link, useNavigate } from 'react-router-dom';
import { END_POINT } from '~/config';
import axios from 'axios';

const BlogSection = () => {
  const [blogs, setBlogs] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getNewBlogs = async () => {
      try {
        const { data } = await axios.get(`${END_POINT}/api/v1/blogs/latest`, { withCredentials: true });
        if (data.success) {
          setBlogs(data.blogs);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getNewBlogs();
  }, []);

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
                {blogs &&
                  blogs.map((blog, index) => (
                    <Col md={4} key={index}>
                      <div className="l-blog-text">
                        <div className="banner">
                          <Link to={`/blog/${blog.slug}`}>
                            <img src={blog.avatar ? blog.avatar.url : ''} alt="" />
                          </Link>
                        </div>
                        <div className="s-blog-text">
                          <h4>
                            <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                          </h4>
                          <span>
                            Tác giả : <Link>{blog.author.name}</Link>
                          </span>
                          <p>
                            There are many variations of passages of Lorem Ipsum available, but the majority have
                            suffered alteration in some form, by injected humour....
                          </p>
                        </div>
                        <div className="date-read clearfix">
                          <Link>
                            <i className="mdi mdi-clock"></i> {new Date(blog.createdAt).toLocaleDateString('vi-VN')}
                          </Link>
                          <Link to={`/blog/${blog.slug}`}>Đọc thêm</Link>
                        </div>
                      </div>
                    </Col>
                  ))}
              </Row>
            </li>
          </ul>
          <button id="load-more-blog" className="mt-5" onClick={() => navigate('/blog')}>
            Xem thêm
          </button>
        </div>
      </Container>
    </section>
  );
};

export default BlogSection;
