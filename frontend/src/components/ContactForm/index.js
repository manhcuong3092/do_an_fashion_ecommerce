import React from 'react'

const ContactForm = () => {
  return (
    <div className="social-media section-padding">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="newsletter newsletter2">
              <h3>Đăng ký nhận tin tức</h3>
              <form action="#">
                <input type="text" name="email" placeholder="Nhập email..." />
                <button type="submit">Đăng ký</button>
              </form>
            </div>
            <div className="social-icons">
              <a href="#"><i className="mdi mdi-facebook"></i></a>
              <a href="#"><i className="mdi mdi-twitter"></i></a>
              <a href="#"><i className="mdi mdi-google-plus"></i></a>
              <a href="#"><i className="mdi mdi-dribbble"></i></a>
              <a href="#"><i className="mdi mdi-rss"></i></a>
            </div>
          </div>
          <div className="col-md-6 offset-lg-1 col-lg-5">
            <div className="newsletter get-touch">
              <h3>Liên hệ</h3>
              <form id="contact-form" action="https://whizthemes.com/mail-php/other/mail.php">
                <input type="text" name="con_name" placeholder="Nhập tên..." />
                <input type="text" name="con_email" placeholder="Nhập email..." />
                <textarea name="con_message" rows="2" placeholder="Nhập nội dung...."></textarea>
                <button type="submit">Gửi</button>
                <p className="form-message"></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactForm