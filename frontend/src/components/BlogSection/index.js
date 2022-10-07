import React from 'react'

const BlogSection = () => {
  return (
    <section className="latest-blog section-padding">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-title text-center">
              <h2>Blog mới nhất</h2>
            </div>
          </div>
        </div>
        <div className="wrapper">
          <ul className="load-list load-list-blog">
            <li>
              <div className="row">
                <div className="col-md-4">
                  <div className="l-blog-text">
                    <div className="banner"><a href="single-blog.html"><img src="img/blog/1.jpg" alt="" /></a></div>
                    <div className="s-blog-text">
                      <h4><a href="single-blog.html">Fashion style fine arts drawing</a></h4>
                      <span>By : <a href="#">Rakib</a> | <a href="#">210 Like</a> | <a href="#">69 Comments</a></span>
                      <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour....</p>
                    </div>
                    <div className="date-read clearfix">
                      <a href="#"><i className="mdi mdi-clock"></i> jun 25, 2021</a>
                      <a href="single-blog.html">Đọc thêm</a>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="l-blog-text">
                    <div className="banner"><a href="single-blog.html"><img src="img/blog/2.jpg" alt="" /></a></div>
                    <div className="s-blog-text">
                      <h4><a href="single-blog.html">women’s Fashion style 2021</a></h4>
                      <span>By : <a href="#">Rakib</a> | <a href="#">210 Like</a> | <a href="#">69 Comments</a></span>
                      <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour....</p>
                    </div>
                    <div className="date-read clearfix">
                      <a href="#"><i className="mdi mdi-clock"></i> jun 15, 2021</a>
                      <a href="single-blog.html">Đọc thêm</a>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="l-blog-text">
                    <div className="banner"><a href="single-blog.html"><img src="img/blog/3.jpg" alt="" /></a></div>
                    <div className="s-blog-text">
                      <h4><a href="single-blog.html">women’s winter Fashion style</a></h4>
                      <span>By : <a href="#">Rakib</a> | <a href="#">210 Like</a> | <a href="#">69 Comments</a></span>
                      <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour....</p>
                    </div>
                    <div className="date-read clearfix">
                      <a href="#"><i className="mdi mdi-clock"></i> jun 22, 2021</a>
                      <a href="single-blog.html">Đọc thêm</a>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        <button id="load-more-blog" className='mt-5'>Xem thêm</button>
        </div>
      </div>
    </section>
  )
}

export default BlogSection