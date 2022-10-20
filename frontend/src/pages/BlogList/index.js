import React, { Fragment, useEffect, useState } from 'react';
import GridBlog from '../../components/GridBlog';
import PageTitle from '../../layouts/PageTitle';
import SideBarBlog from '../../components/SideBarBlog';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import axios from 'axios';
import { END_POINT } from '~/config';
import { Pagination, Stack } from '@mui/material';

const BlogList = () => {
  const [blogs, setBlogs] = useState(null);
  const [page, setPage] = useState(1);

  const [filteredBlogsCount, setFilteredBlogsCount] = useState(null);
  const [resPerPage, setResPerPage] = useState(null);

  useEffect(() => {
    const getBlogs = async () => {
      const { data } = await axios.get(`${END_POINT}/api/v1/blogs?page=${page}`, { withCredentials: true });
      setBlogs(data.blogs);
      setFilteredBlogsCount(data.filteredBlogsCount);
      setResPerPage(data.resPerPage);
    };
    getBlogs();
  }, [page]);

  return (
    <Fragment>
      <Header />
      <PageTitle title={'Danh sách bài viết'} />
      <section className="latest-blog blog-style section-padding">
        <Container>
          <Row className="pt-4">
            <Col md={4} lg={3}>
              <SideBarBlog />
            </Col>
            <Col md={8} lg={9}>
              <ul className="blog-row clearfix">
                <GridBlog blogs={blogs} />
              </ul>

              <div className="pagnation-ul">
                <Stack spacing={2}>
                  <Pagination
                    count={filteredBlogsCount && resPerPage && Math.ceil(filteredBlogsCount / resPerPage)}
                    onChange={(e, page) => {
                      setPage(page);
                    }}
                  />
                </Stack>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </Fragment>
  );
};

export default BlogList;
