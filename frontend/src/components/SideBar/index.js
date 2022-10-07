import React from 'react'

const SideBar = () => {
  return (
    <div class="sidebar left-sidebar">
      <div class="s-side-text">
        <div class="sidebar-title clearfix">
          <h4 class="floatleft">Danh mục</h4>
          <h5 class="floatright"><a href="#">Tất cả</a></h5>
        </div>
        <div class="categories left-right-p">
          <ul id="accordion" class="panel-group clearfix">
            <li class="panel">
              <div class="medium-a">
                Áo phông
              </div>
            </li>
            <li class="panel">
              <div class="medium-a">
                Quần âu
              </div>
            </li>
            <li class="panel">
              <div class="medium-a">
                Áo khoác
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="s-side-text">
        <div class="sidebar-title">
          <h4>Giá</h4>
        </div>
        <div class="range-slider clearfix">
          <form action="javascript:void(0)">
            <label><span>Khoảng giá</span> <input type="text" id="amount" readonly /></label>
            <div id="slider-range"></div>
          </form>
        </div>
      </div>
      <div class="s-side-text">
        <div class="sidebar-title clearfix">
          <h4 class="floatleft">Kích cỡ</h4>
          <h5 class="floatright"><a href="#">Tất cả</a></h5>
        </div>
        <div class="size-select clearfix">
          <a href="#">m</a>
          <a href="#">s</a>
          <a href="#">l</a>
          <a href="#">xl</a>
          <a href="#">xll</a>
        </div>
      </div>
      <div class="s-side-text">
        <div class="sidebar-title clearfix">
          <h4 class="floatleft">Màu sắc</h4>
          <h5 class="floatright"><a href="#">Tất cả</a></h5>
        </div>
        <div class="color-select clearfix">
          <span></span>
          <span></span>
          <span class="outline"></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
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

export default SideBar