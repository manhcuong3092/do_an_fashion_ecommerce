import React from 'react'

const CollectionSection = () => {
  return (
    <section className="collection-area collection-area2 section-padding">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="single-colect banner collect-one">
              <a href="#"><img src="img/collect/4.jpg" alt="" /></a>
            </div>
          </div>
          <div className="col-md-4">
            <div className="colect-text ">
              <h4><a href="#">Sưu tập thời trang 2022</a></h4>
              <h5>Giảm giá sản phẩm <br /> Lên tới 30%!</h5>
              <a href="#">Mua ngay <i className="mdi mdi-arrow-right"></i></a>
            </div>
            <div className="collect-img banner margin single-colect">
              <a href="#"><img src="img/collect/5.jpg" alt="" /></a>
            </div>
          </div>
          <div className="col-md-4">
            <div className="collect-img banner single-colect">
              <a href="#"><img src="img/collect/6.jpg" alt="" /></a>
            </div>
            <div className="colect-text ">
              <h4><a href="#">Sưu tập thời trang 2022</a></h4>
              <p>AMANDO là thương hiệu thời trang nam dành cho giới trẻ theo phong cách Hàn Quốc.</p>
              <a href="#">Mua ngay <i className="mdi mdi-arrow-right"></i></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CollectionSection