import React from 'react'

const QuickImages = () => {
  return (
    <div className="col-md-5 col-lg-4">
      <div className="quick-image">
        <div className="single-quick-image text-center">
          <div className="list-img">
            <div className="product-img tab-content">
              <div className="simpleLens-container tab-pane fade show" id="sin-1">
                <div className="pro-type">
                  <span>new</span>
                </div>
                <a className="simpleLens-image" data-lens-image="img/products/z1.jpg" href="#"><img src="img/products/z1.jpg" alt="" className="simpleLens-big-image" /></a>
              </div>
              <div className="simpleLens-container tab-pane active fade show" id="sin-2">
                <div className="pro-type sell">
                  <span>sell</span>
                </div>
                <a className="simpleLens-image" data-lens-image="img/products/z2.jpg" href="#"><img src="img/products/z2.jpg" alt="" className="simpleLens-big-image" /></a>
              </div>
              <div className="simpleLens-container tab-pane fade show" id="sin-3">
                <div className="pro-type">
                  <span>-15%</span>
                </div>
                <a className="simpleLens-image" data-lens-image="img/products/z3.jpg" href="#"><img src="img/products/z3.jpg" alt="" className="simpleLens-big-image" /></a>
              </div>
              <div className="simpleLens-container tab-pane fade show" id="sin-4">
                <div className="pro-type">
                  <span>new</span>
                </div>
                <a className="simpleLens-image" data-lens-image="img/products/z4.jpg" href="#"><img src="img/products/z4.jpg" alt="" className="simpleLens-big-image" /></a>
              </div>
            </div>
          </div>
        </div>
        <div className="quick-thumb">
          <ul className="product-slider nav">
            <li><a data-bs-toggle="tab" href="#sin-1"> <img src="img/products/s1.jpg" alt="quick view" /> </a></li>
            <li><a className="active" data-bs-toggle="tab" href="#sin-2"> <img src="img/products/s2.jpg" alt="small image" /> </a></li>
            <li><a data-bs-toggle="tab" href="#sin-3"> <img src="img/products/s3.jpg" alt="small image" /> </a></li>
            <li><a data-bs-toggle="tab" href="#sin-4"> <img src="img/products/s4.jpg" alt="small image" /> </a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default QuickImages