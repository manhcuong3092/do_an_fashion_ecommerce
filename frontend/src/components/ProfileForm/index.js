import React from 'react'

const ProfileForm = () => {
  return (
    <li className="panel">
      <div className="account-title" data-bs-toggle="collapse" data-bs-parent="#accordion" data-bs-target="#collapse1">
        <label>
          <input type="radio" checked value="forever" name="rememberme" />
          <span> Thông tin cá nhân</span>
        </label>
      </div>
      <div id="collapse1" className="panel-collapse collapse in">
        <div className="single-log-info">
          <h5>Chỉnh sửa thông tin các nhân.</h5>
          <div className="custom-input">
            <form action="#">
              <input type="text" name="name" placeholder="Họ tên" />
              <input type="text" name="email" placeholder="Email" disabled />
              <input type="text" name="email" placeholder="Số điện thoại" />
              <input type="text" name="state" placeholder="Tỉnh thành phố" />
              <input type="text" name="text" placeholder="Địa chỉ" />
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

export default ProfileForm