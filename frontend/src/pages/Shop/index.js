import React, { Fragment } from 'react'
import GridProduct from '../../components/GridProduct'
import PageTitle from '../../components/PageTitle'
import SideBar from '../../components/SideBar'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const Shop = () => {
  return (
    <Fragment>
			<PageTitle title="Danh sách sản phẩm" />
      <section className="pages products-page section-padding-bottom">
			<Container>
				<Row className="pt-4">
					<Col md={4} lg={3}>
            <SideBar />
					</Col>
					<Col md={8} lg={9}>
						<GridProduct />
					</Col>
				</Row>
			</Container>
		</section>
    </Fragment>
  )
}

export default Shop