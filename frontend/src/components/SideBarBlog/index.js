import React from 'react'

const SideBarBlog = () => {
  return (
    <div class="sidebar left-sidebar">
      <div class="s-side-text">
        <div class="sidebar-title clearfix">
          <h4 class="floatleft">Bài viết gần đây</h4>
        </div>
        <div class="recent-post clearfix">
          <ul>
            <li>
              <a href="#"><img src="img/blog/r1.jpg" alt="" /></a>
              <h5><a href="#">Thời trang nữ</a></h5>
              <span>Jun 25, 2021</span>
            </li>
            <li>
              <a href="#"><img src="img/blog/r2.jpg" alt="" /></a>
              <h5><a href="#">Thời trang nam</a></h5>
              <span>Jun 24, 2021</span>
            </li>
            <li>
              <a href="#"><img src="img/blog/r3.jpg" alt="" /></a>
              <h5><a href="#">Thời trang mùa hè</a></h5>
              <span>Jun 22, 2021</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="s-side-text">
        <div class="banner clearfix">
          <a href="#"><img src="img/products/banner.jpg" alt="" /></a>
          <div class="banner-text">
            <h2>best</h2> <br />
            <h2 class="banner-brand">brand</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideBarBlog