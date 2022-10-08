import React from 'react'

const RelatedProducts = () => {
  return (
    <section className="single-products section-padding">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-title text-center">
              <h2>related Products</h2>
            </div>
          </div>
        </div>
        <div className="row text-center">
          <div className="col-md-6 col-lg-3">
            <div className="single-product">
              <div className="product-img">
                <div className="pro-type">
                  <span>new</span>
                </div>
                <a href="#"><img src="img/products/1.jpg" alt="Product Title" /></a>
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
                <a href="#"><img src="img/products/2.jpg" alt="Product Title" /></a>
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
                <a href="#"><img src="img/products/3.jpg" alt="Product Title" /></a>
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
                <a href="#"><img src="img/products/4.jpg" alt="Product Title" /></a>
                <div className="actions-btn">
                  <a href="#"><i className="mdi mdi-cart"></i></a>
                  <a href="#" data-bs-toggle="modal" data-bs-target="#quick-view"><i className="mdi mdi-eye"></i></a>
                  <a href="#"><i className="mdi mdi-heart"></i></a>
                </div>
              </div>
              <div className="product-dsc">
                <p><a href="#">men’s White t-shirt</a></p>
                <span>$96.20</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default RelatedProducts