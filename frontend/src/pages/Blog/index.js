import React, { Fragment } from 'react'
import BlogDetail from '../../components/BlogDetail'
import PageTitle from '../../components/PageTitle'
import SideBarBlog from '../../components/SideBarBlog'

const Blog = () => {
  return (
    <Fragment>
      <PageTitle title={"Bài viết"} />
      <section class="pages blog single-blog-area section-padding-top pb-5">
        <div class="container">
          <div class="row">
            <div class="col-md-4 col-lg-3">
              <SideBarBlog />
            </div>
            <div class="col-md-8 col-lg-9">
              <BlogDetail />
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default Blog