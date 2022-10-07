import React from 'react'

const SampleProducts = () => {
  return (
    <section className="single-products  products-two section-padding extra-padding-bottom">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-title text-center">
              <h2>Sản phẩm đắc sắc</h2>
            </div>
          </div>
        </div>
        <div className="wrapper">
          <ul className="load-list load-list-one">
            <li>
              <div className="row text-center">
                <div className="col-md-6 col-lg-3">
                  <div className="single-product">
                    <div className="product-img">
                      <div className="pro-type">
                        <span>new</span>
                      </div>
                      <a href="#"><img src="img/products/16.jpg" alt="Product Title" /></a>
                      <div className="actions-btn">
                        <a href="#"><i className="mdi mdi-cart"></i></a>
                        <a href="#" data-bs-toggle="modal" data-bs-target="#quick-view"><i className="mdi mdi-eye"></i></a>
                        <a href="#"><i className="mdi mdi-heart"></i></a>
                      </div>
                    </div>
                    <div className="product-dsc">
                      <p><a href="#">men’s Black t-shirt</a></p>
                      <span>$65.20</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3">
                  <div className="single-product">
                    <div className="product-img">
                      <div className="pro-type sell">
                        <span>sell</span>
                      </div>
                      <a href="#"><img src="img/products/17.jpg" alt="Product Title" /></a>
                      <div className="actions-btn">
                        <a href="#"><i className="mdi mdi-cart"></i></a>
                        <a href="#" data-bs-toggle="modal" data-bs-target="#quick-view"><i className="mdi mdi-eye"></i></a>
                        <a href="#"><i className="mdi mdi-heart"></i></a>
                      </div>
                    </div>
                    <div className="product-dsc">
                      <p><a href="#">men’s White t-shirt</a></p>
                      <span>$57.00</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3 r-margin-top">
                  <div className="single-product">
                    <div className="product-img">
                      <div className="pro-type">
                        <span>-15%</span>
                      </div>
                      <a href="#"><img src="img/products/18.jpg" alt="Product Title" /></a>
                      <div className="actions-btn">
                        <a href="#"><i className="mdi mdi-cart"></i></a>
                        <a href="#" data-bs-toggle="modal" data-bs-target="#quick-view"><i className="mdi mdi-eye"></i></a>
                        <a href="#"><i className="mdi mdi-heart"></i></a>
                      </div>
                    </div>
                    <div className="product-dsc">
                      <p><a href="#">men’s Blue t-shirt</a></p>
                      <span>$56.00</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3 r-margin-top">
                  <div className="single-product">
                    <div className="product-img">
                      <a href="#"><img src="img/products/19.jpg" alt="Product Title" /></a>
                      <div className="actions-btn">
                        <a href="#"><i className="mdi mdi-cart"></i></a>
                        <a href="#" data-bs-toggle="modal" data-bs-target="#quick-view"><i className="mdi mdi-eye"></i></a>
                        <a href="#"><i className="mdi mdi-heart"></i></a>
                      </div>
                    </div>
                    <div className="product-dsc">
                      <p><a href="#">men’s Grey t-shirt</a></p>
                      <span>$96.20</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <button id="load-more-one" className='mt-5'>Xem thêm</button>
        </div>
      </div>
    </section>
  )
}

export default SampleProducts