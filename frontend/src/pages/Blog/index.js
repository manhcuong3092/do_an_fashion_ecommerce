import React, { Fragment, useEffect, useState } from 'react';
import BlogDetail from '../../components/BlogDetail';
import PageTitle from '../../layouts/PageTitle';
import SideBarBlog from '../../components/SideBarBlog';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { END_POINT } from '~/config';

const Blog = () => {
  const [blog, setBlog] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    const getBlog = async () => {
      const { data } = await axios.get(`${END_POINT}/api/v1/blog/${slug}`, { withCredentials: true });
      setBlog(data.blog);
    };
    getBlog();
  }, [slug]);

  return (
    <Fragment>
      <Header />
      <PageTitle title={'Bài viết'} />
      <section className="pages blog single-blog-area section-padding-top pb-5">
        <Container>
          <Row>
            <Col md={4} lg={3}>
              <SideBarBlog />
            </Col>
            <Col md={8} lg={9}>
              <BlogDetail blog={blog} />
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </Fragment>
  );
};

export default Blog;
