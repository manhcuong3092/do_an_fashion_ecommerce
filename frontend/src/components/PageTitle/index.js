import React from 'react'
import { Link } from 'react-router-dom'

const PageTitle = ({title}) => {
  return (
    <div class="pages-title section-padding">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="pages-title-text text-center">
              <h2>{title}</h2>
              <ul class="text-left">
                <li><Link to="/">Trang chủ </Link></li>
                <li><span> // </span>{title}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageTitle