import React, { Fragment } from 'react'
import GridProduct from '../../components/GridProduct'
import PageTitle from '../../components/PageTitle'
import SideBar from '../../components/SideBar'

const Shop = () => {
  return (
    <Fragment>
			<PageTitle title="Danh sách sản phẩm" />
      <section class="pages products-page section-padding-bottom">
			<div class="container">
				<div class="row pt-4">
					<div class="col-md-4 col-lg-3">
            <SideBar />
					</div>
					<div class="col-md-8 col-lg-9">
						<GridProduct />
					</div>
				</div>
			</div>
		</section>
    </Fragment>
  )
}

export default Shop