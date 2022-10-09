import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import ChangePassword from '../../components/ChangePasswordForm'
import PageTitle from '../../components/PageTitle'
import ProfileForm from '../../components/ProfileForm'

const Profile = () => {
  return (
    <Fragment>
      <PageTitle title={"Thông tin cá nhân"} />
      <section className="pages my-account-page section-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="padding60">
                <div className="log-title">
                  <h3><strong>Thông tin các nhân</strong></h3>
                </div>
                <div className="prament-area main-input">
                  <ul className="panel-group" id="accordion">
                    <ProfileForm />
                    <ChangePassword />
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="my-right-side">
                <Link to={'/cart'}>Giỏ hàng</Link>
                <Link to={'/order-history'}>Lịch sử đặt hàng</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default Profile