import React from 'react'

const GridProduct = () => {
  return (
    <div class="right-products">
      <div class="row">
        <div class="col-12">
          <div class="section-title clearfix">
            <ul>
              <li>
                <ul class="nav-view nav">
                  <li><a class="active" data-bs-toggle="tab" href="#grid"> <i class="mdi mdi-view-module"></i> </a></li>
                  <li><a data-bs-toggle="tab" href="#list"> <i class="mdi mdi-view-list"></i> </a></li>
                </ul>
              </li>
              <li class="sort-by floatright">
                Showing 1-9 of 89 Results
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="tab-content grid-content">
          <div class="tab-pane fade show active text-center" id="grid">
            <div class="row">
              <div class="col-md-6 col-lg-4 mb-4">
                <div class="single-product">
                  <div class="product-img">
                    <div class="pro-type">
                      <span>new</span>
                    </div>
                    <a href="#"><img src="img/products/9.jpg" alt="Product Title" /></a>
                    <div class="actions-btn">
                      <a href="#"><i class="mdi mdi-cart"></i></a>
                      <a href="#" data-bs-toggle="modal" data-bs-target="#quick-view"><i class="mdi mdi-eye"></i></a>
                      <a href="#"><i class="mdi mdi-heart"></i></a>
                    </div>
                  </div>
                  <div class="product-dsc">
                    <p><a href="#">men’s Black t-shirt</a></p>
                    <div class="ratting">
                      <i class="mdi mdi-star"></i>
                      <i class="mdi mdi-star"></i>
                      <i class="mdi mdi-star"></i>
                      <i class="mdi mdi-star-half"></i>
                      <i class="mdi mdi-star-outline"></i>
                    </div>
                    <span>$65.20</span>
                  </div>
                </div>
              </div>

              <div class="col-md-6 col-lg-4 mb-4">
                <div class="single-product">
                  <div class="product-img">
                    <div class="pro-type sell">
                      <span>sell</span>
                    </div>
                    <a href="#"><img src="img/products/2.jpg" alt="Product Title" /></a>
                    <div class="actions-btn">
                      <a href="#"><i class="mdi mdi-cart"></i></a>
                      <a href="#" data-bs-toggle="modal" data-bs-target="#quick-view"><i class="mdi mdi-eye"></i></a>
                      <a href="#"><i class="mdi mdi-heart"></i></a>
                    </div>
                  </div>
                  <div class="product-dsc">
                    <p><a href="#">men’s White t-shirt</a></p>
                    <div class="ratting">
                      <i class="mdi mdi-star"></i>
                      <i class="mdi mdi-star"></i>
                      <i class="mdi mdi-star"></i>
                      <i class="mdi mdi-star-half"></i>
                      <i class="mdi mdi-star-outline"></i>
                    </div>
                    <span>$65.20</span>
                  </div>
                </div>
              </div>

              <div class="col-md-6 col-lg-4 mb-4">
                <div class="single-product">
                  <div class="product-img">
                    <div class="pro-type">
                      <span>-15</span>
                    </div>
                    <a href="#"><img src="img/products/8.jpg" alt="Product Title" /></a>
                    <div class="actions-btn">
                      <a href="#"><i class="mdi mdi-cart"></i></a>
                      <a href="#" data-bs-toggle="modal" data-bs-target="#quick-view"><i class="mdi mdi-eye"></i></a>
                      <a href="#"><i class="mdi mdi-heart"></i></a>
                    </div>
                  </div>
                  <div class="product-dsc">
                    <p><a href="#">men’s Black t-shirt</a></p>
                    <div class="ratting">
                      <i class="mdi mdi-star"></i>
                      <i class="mdi mdi-star"></i>
                      <i class="mdi mdi-star"></i>
                      <i class="mdi mdi-star-half"></i>
                      <i class="mdi mdi-star-outline"></i>
                    </div>
                    <span>$65.20</span>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="pagnation-ul">
            <ul class="clearfix">
              <li><a href="#"><i class="mdi mdi-menu-left"></i></a></li>
              <li><a href="#">1</a></li>
              <li><a href="#">2</a></li>
              <li><a href="#">3</a></li>
              <li><a href="#">4</a></li>
              <li><a href="#">5</a></li>
              <li><a href="#">...</a></li>
              <li><a href="#">10</a></li>
              <li><a href="#"><i class="mdi mdi-menu-right"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GridProduct