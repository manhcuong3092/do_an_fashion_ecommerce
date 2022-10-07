import React from 'react'

const CollectionSection = () => {
  return (
    <section class="collection-area collection-area2 section-padding">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <div class="single-colect banner collect-one">
              <a href="#"><img src="img/collect/4.jpg" alt="" /></a>
            </div>
          </div>
          <div class="col-md-4">
            <div class="colect-text ">
              <h4><a href="#">Sưu tập thời trang 2022</a></h4>
              <h5>Giảm giá sản phẩm <br /> Lên tới 30%!</h5>
              <a href="#">Mua ngay <i class="mdi mdi-arrow-right"></i></a>
            </div>
            <div class="collect-img banner margin single-colect">
              <a href="#"><img src="img/collect/5.jpg" alt="" /></a>
            </div>
          </div>
          <div class="col-md-4">
            <div class="collect-img banner single-colect">
              <a href="#"><img src="img/collect/6.jpg" alt="" /></a>
            </div>
            <div class="colect-text ">
              <h4><a href="#">Sưu tập thời trang 2022</a></h4>
              <p>AMANDO là thương hiệu thời trang nam dành cho giới trẻ theo phong cách Hàn Quốc.</p>
              <a href="#">Mua ngay <i class="mdi mdi-arrow-right"></i></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CollectionSection