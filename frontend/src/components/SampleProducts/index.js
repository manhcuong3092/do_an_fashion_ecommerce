import React from 'react'

const SampleProducts = () => {
  return (
    <section class="single-products  products-two section-padding extra-padding-bottom">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="section-title text-center">
              <h2>Sản phẩm đắc sắc</h2>
            </div>
          </div>
        </div>
        <div class="wrapper">
          <ul class="load-list load-list-one">
            <li>
              <div class="row text-center">
                <div class="col-md-6 col-lg-3">
                  <div class="single-product">
                    <div class="product-img">
                      <div class="pro-type">
                        <span>new</span>
                      </div>
                      <a href="#"><img src="img/products/16.jpg" alt="Product Title" /></a>
                      <div class="actions-btn">
                        <a href="#"><i class="mdi mdi-cart"></i></a>
                        <a href="#" data-bs-toggle="modal" data-bs-target="#quick-view"><i class="mdi mdi-eye"></i></a>
                        <a href="#"><i class="mdi mdi-heart"></i></a>
                      </div>
                    </div>
                    <div class="product-dsc">
                      <p><a href="#">men’s Black t-shirt</a></p>
                      <span>$65.20</span>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-lg-3">
                  <div class="single-product">
                    <div class="product-img">
                      <div class="pro-type sell">
                        <span>sell</span>
                      </div>
                      <a href="#"><img src="img/products/17.jpg" alt="Product Title" /></a>
                      <div class="actions-btn">
                        <a href="#"><i class="mdi mdi-cart"></i></a>
                        <a href="#" data-bs-toggle="modal" data-bs-target="#quick-view"><i class="mdi mdi-eye"></i></a>
                        <a href="#"><i class="mdi mdi-heart"></i></a>
                      </div>
                    </div>
                    <div class="product-dsc">
                      <p><a href="#">men’s White t-shirt</a></p>
                      <span>$57.00</span>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-lg-3 r-margin-top">
                  <div class="single-product">
                    <div class="product-img">
                      <div class="pro-type">
                        <span>-15%</span>
                      </div>
                      <a href="#"><img src="img/products/18.jpg" alt="Product Title" /></a>
                      <div class="actions-btn">
                        <a href="#"><i class="mdi mdi-cart"></i></a>
                        <a href="#" data-bs-toggle="modal" data-bs-target="#quick-view"><i class="mdi mdi-eye"></i></a>
                        <a href="#"><i class="mdi mdi-heart"></i></a>
                      </div>
                    </div>
                    <div class="product-dsc">
                      <p><a href="#">men’s Blue t-shirt</a></p>
                      <span>$56.00</span>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-lg-3 r-margin-top">
                  <div class="single-product">
                    <div class="product-img">
                      <a href="#"><img src="img/products/19.jpg" alt="Product Title" /></a>
                      <div class="actions-btn">
                        <a href="#"><i class="mdi mdi-cart"></i></a>
                        <a href="#" data-bs-toggle="modal" data-bs-target="#quick-view"><i class="mdi mdi-eye"></i></a>
                        <a href="#"><i class="mdi mdi-heart"></i></a>
                      </div>
                    </div>
                    <div class="product-dsc">
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