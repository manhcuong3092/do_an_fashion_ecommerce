import React from 'react'

const ChangePassword = () => {
  return (
    <li className="panel panelimg">
      <div className="account-title" data-bs-toggle="collapse" data-bs-parent="#accordion" data-bs-target="#collapse2">
        <label>
          <input type="radio" checked value="forever" name="rememberme" />
          <span> Đổi mật khẩu</span>
        </label>
      </div>
      <div id="collapse2" className="panel-collapse collapse in">
        <div className="single-log-info">
          <h5>Đổi mật khẩu.</h5>
          <div className="custom-input">
            <form action="#">
              <input type="password" name="oldPassword" placeholder="Mật khẩu cũ" />
              <input type="password" name="password" placeholder="Mật khẩu mới" />
              <input type="password" name="confirmPassword" placeholder="Nhập lại mật khẩu" />
              <div className="submit-text">
                <button>Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </li>
  )
}

export default ChangePassword