import React, { Fragment } from 'react'
import BlogDetail from '../../components/BlogDetail'
import PageTitle from '../../layouts/PageTitle'
import SideBarBlog from '../../components/SideBarBlog'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';

const Blog = () => {
  return (
    <Fragment>
      <Header />
      <PageTitle title={"Bài viết"} />
      <section className="pages blog single-blog-area section-padding-top pb-5">
        <Container>
          <Row>
            <Col md={4} lg={3}>
              <SideBarBlog />
            </Col>
            <Col md={8} lg={9}>
              <BlogDetail />
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </Fragment>
  )
}

export default Blog