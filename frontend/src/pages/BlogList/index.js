import React, { Fragment } from 'react'
import GridBlog from '../../components/GridBlog'
import PageTitle from '../../components/PageTitle'
import SideBarBlog from '../../components/SideBarBlog'

const BlogList = () => {
  return (
    <Fragment>
			<PageTitle title={"Danh sách bài viết"} />
      <section class="latest-blog blog-style section-padding">
			<div class="container">
				<div class="row pt-4">
					<div class="col-md-4 col-lg-3">
            <SideBarBlog />
					</div>
					<div class="col-md-8 col-lg-9">
						<GridBlog />
					</div>
				</div>
			</div>
		</section>
    </Fragment>
  )
}

export default BlogList