import React, { Fragment } from 'react'
import GridBlog from '../../components/GridBlog'
import PageTitle from '../../layouts/PageTitle'
import SideBarBlog from '../../components/SideBarBlog'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';

const BlogList = () => {
	return (
		<Fragment>
			<Header />
			<PageTitle title={"Danh sách bài viết"} />
			<section className="latest-blog blog-style section-padding">
				<Container>
					<Row className="pt-4">
						<Col md={4} lg={3}>
							<SideBarBlog />
						</Col>
						<Col md={8} lg={9}>
							<GridBlog />
						</Col>
					</Row>
				</Container>
			</section>
			<Footer />
		</Fragment>
	)
}

export default BlogList