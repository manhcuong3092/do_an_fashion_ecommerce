import React, { Fragment } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROLE_ADMIN } from '~/constants/role';
import { toast } from 'react-toastify';

const ProtectRoute = ({ children, isAdmin, ...rest }) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (!loading && !isAuthenticated) {
    toast.warn('Phải đăng nhập mới được truy cập');
    return (
      <Fragment>
        <Navigate to="/login" />
      </Fragment>
    );
  }

  if (isAdmin === true && user.role !== ROLE_ADMIN) {
    // toast.warn('Phải là quản trị viên mới được truy cập');
    navigate('/admin/login');
    // <Fragment>
    //   <Navigate to="/admin/login" />
    // </Fragment>;
  }

  return <Fragment>{children}</Fragment>;
};

export default ProtectRoute;
