import React from 'react'

const Login = () => {
  return (
    <section className="pages login-page section-padding">
      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="main-input padding60">
              <div className="log-title text-center">
                <h3><strong>Đăng nhập</strong></h3>
              </div>
              <div className="login-text">
                <div className="custom-input">
                  <form action="#">
                    <input type="text" name="email" placeholder="Email" />
                    <input type="password" name="password" placeholder="Mật khẩu" />
                    <a className="forget" href="#">Quên mật khẩu?</a>
                    <div className="submit-text text-center">
                      <button>Đăng nhập</button>
                    </div>
                    <br/>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </section>
  )
}

export default Login