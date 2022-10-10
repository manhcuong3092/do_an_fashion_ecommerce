import React from 'react'

const SideBar = () => {
  return (
    <div className="sidebar left-sidebar">
      <div className="s-side-text">
        <div className="sidebar-title clearfix">
          <h4 className="floatleft">Danh mục</h4>
          <h5 className="floatright"><a href="#">Tất cả</a></h5>
        </div>
        <div className="categories left-right-p">
          <ul id="accordion" className="panel-group clearfix">
            <li className="panel">
              <div className="medium-a">
                Áo phông
              </div>
            </li>
            <li className="panel">
              <div className="medium-a">
                Quần âu
              </div>
            </li>
            <li className="panel">
              <div className="medium-a">
                Áo khoác
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="s-side-text">
        <div className="sidebar-title">
          <h4>Giá</h4>
        </div>
        <div className="range-slider clearfix">
            <label><span>Khoảng giá</span> <input type="text" id="amount" /></label>
            <div id="slider-range"></div>
        </div>
      </div>
      <div className="s-side-text">
        <div className="sidebar-title clearfix">
          <h4 className="floatleft">Kích cỡ</h4>
          <h5 className="floatright"><a href="#">Tất cả</a></h5>
        </div>
        <div className="size-select clearfix">
          <a href="#">m</a>
          <a href="#">s</a>
          <a href="#">l</a>
          <a href="#">xl</a>
          <a href="#">xll</a>
        </div>
      </div>
      <div className="s-side-text">
        <div className="sidebar-title clearfix">
          <h4 className="floatleft">Màu sắc</h4>
          <h5 className="floatright"><a href="#">Tất cả</a></h5>
        </div>
        <div className="color-select clearfix">
          <span></span>
          <span></span>
          <span className="outline"></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="s-side-text">
        <div className="banner clearfix">
          <a href="#"><img src="img/products/banner.jpg" alt="" /></a>
          <div className="banner-text">
            <h2>best</h2> <br />
            <h2 className="banner-brand">brand</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideBar