import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const BlogDetail = () => {
  return (
    <div class="single-blog-page">
      <div class="single-blog-img">
        <img src="img/blog/s.jpg" alt="" />
      </div>
      <div class="padding30">
        <div class="blog-text">
          <div class="post-title">
            <h3>Nghệ thuật phong cách thời trang</h3>
            <ul class="clearfix">
              <li><i class="pe-7s-user"></i>By :<a href="#">Rakib</a><span>|</span></li>
              <li><i class="pe-7s-comment"></i><a href="#">Jun 25, 2021</a><span>|</span></li>
              <li><i class="pe-7s-back"></i><a href="#">69 Comments</a></li>
            </ul>
          </div>
          <p>On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted.</p>
          <div class="italic">
            <p>“The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains. But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system”,</p>
          </div>
          <p>No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.</p>
          <div class="share-tag clearfix">
            <ul class="blog-share floatleft">
              <li><h5>share </h5></li>
              <li><a href="#"><i class="mdi mdi-facebook"></i></a></li>
              <li><a href="#"><i class="mdi mdi-twitter"></i></a></li>
              <li><a href="#"><i class="mdi mdi-linkedin"></i></a></li>
              <li><a href="#"><i class="mdi mdi-vimeo"></i></a></li>
              <li><a href="#"><i class="mdi mdi-dribbble"></i></a></li>
              <li><a href="#"><i class="mdi mdi-instagram"></i></a></li>
            </ul>
          </div>
          <h4 class="mt-5">19 Bình luận</h4>
          <div class="about-author comments">
            <div class="autohr-text">
              <img src="img/blog/author2.png" alt="" />
              <div class="author-des">
                <h4><a href="#">Nam Trần</a></h4>
                <span>27 Jun, 2021 at 2:30pm</span>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer accumsan egestas eleifend. Phasellus a felis at est bibenes dum feugiat ut eget eni Praesent et messages in consectetur.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="leave-comment">
          <h4>Để lại bình luận của bạn</h4>
          <form action="#">
            <Row>
              <Col md={6}>
                <div class="input-text">
                  <input type="text" name="name" placeholder="Tên" value="" />
                </div>
              </Col>
              <Col md={6}>
                <div class="input-text">
                  <input type="text" name="email" placeholder="Email" value="" />
                </div>
              </Col>
              <Col>
                <div class="input-text">
                  <textarea name="comment" id="comment" placeholder="Nội dung" rows="4"></textarea>
                </div>
              </Col>
              <Col>
                <div class="submit-text">
                  <button type="submit" value="submit form">Bình luận</button>
                </div>
              </Col>
            </Row>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BlogDetail