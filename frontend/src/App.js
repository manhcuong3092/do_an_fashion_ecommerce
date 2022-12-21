import './assets/css/bootstrap.min.css';
import './assets/css/materialdesignicons.min.css';
import './assets/css/responsive.css';
import './App.css';
import './assets/css/admin.style.css';
import { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Home from './pages/Home';
import Shop from './pages/Shop';
import BlogList from './pages/BlogList';
import Product from './pages/Product';
import Blog from './pages/Blog';
import ContactUs from './pages/ContactUs';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import OrderHistory from './pages/Order/OrderHistory';
import OrderDetail from './pages/Order/OrderDetail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Admin/Dashboard';
import SizeList from './pages/Admin/Size/SizeList';
import CreateSize from './pages/Admin/Size/CreateSize';
import UpdateSize from './pages/Admin/Size/UpdateSize';
import ColorList from './pages/Admin/Color/ColorList';
import CreateColor from './pages/Admin/Color/CreateColor';
import UpdateColor from './pages/Admin/Color/UpdateColor';
import CategoryList from './pages/Admin/Category/CategoryList';
import CreateCategory from './pages/Admin/Category/CreateCategory';
import UpdateCategory from './pages/Admin/Category/UpdateCategory';
import ProductList from './pages/Admin/Product/ProductList';
import CreateProduct from './pages/Admin/Product/CreateProduct';
import UpdateProduct from './pages/Admin/Product/UpdateProduct';
import BlogsList from './pages/Admin/Blog/BlogsList';
import CreateBlog from './pages/Admin/Blog/CreateBlog';
import UpdateBlog from './pages/Admin/Blog/UpdateBlog';
import ContactList from './pages/Admin/Contact/ContactList';
import RelpyContact from './pages/Admin/Contact/ReplyContact';
import SubscriberList from './pages/Admin/Subscriber/SubscriberList';
import axios from 'axios';
import { END_POINT } from './config';
import OrderComplete from './pages/Order/OrderComplete';
import ProtectRoute from './route/ProtectRoute';
import OrderList from './pages/Admin/Order/OrderList';
import UpdateOrder from './pages/Admin/Order/UpdateOrder';
import UserList from './pages/Admin/User/UserList';
import CreateUser from './pages/Admin/User/CreateUser';
import UpdateUser from './pages/Admin/User/UpdateUser';
import ProductReviewList from './pages/Admin/Review/ProductReviewList';
import Statistic from './pages/Admin/Statistic/Statistic';
import AboutUs from './pages/AboutUs';
import ReturnPolicy from './pages/ReturnPolicy';
import SecurityPolicy from './pages/SecurityPolicy';
import { checkCookie } from './redux/actions/authActions';
import { useDispatch } from 'react-redux';
import ScrollToTop from './layouts/ScrollToTop';
import { STRIPE_PUBLIC_API_KEY } from './constants/payment';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUserCookie = async () => {
      dispatch(checkCookie());
    };

    checkUserCookie();
  }, [dispatch]);

  return (
    <Fragment>
      <ToastContainer />
      <Router>
        <ScrollToTop />
        <Routes>
          {/* user path */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<Blog />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />
          <Route path="/security-policy" element={<SecurityPolicy />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/checkout"
            element={
              <Elements stripe={loadStripe(STRIPE_PUBLIC_API_KEY)}>
                <Checkout />
              </Elements>
            }
          />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route
            path="/profile"
            element={
              <ProtectRoute>
                <Profile />
              </ProtectRoute>
            }
          />
          <Route
            path="/order-history"
            element={
              <ProtectRoute>
                <OrderHistory />
              </ProtectRoute>
            }
          />
          <Route
            path="/order-detail/:orderId"
            element={
              <ProtectRoute>
                <OrderDetail />
              </ProtectRoute>
            }
          />
          <Route path="/order-complete" element={<OrderComplete />} />

          {/* admin path */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectRoute isAdmin={true}>
                <Dashboard />
              </ProtectRoute>
            }
          />
          <Route
            path="/admin/management/sizes"
            element={
              <ProtectRoute isAdmin={true}>
                <SizeList />
              </ProtectRoute>
            }
          />
          <Route
            path="/admin/management/create-size"
            element={
              <ProtectRoute isAdmin={true}>
                <CreateSize />
              </ProtectRoute>
            }
          />
          <Route
            path="/admin/management/size/:sizeId"
            element={
              <ProtectRoute isAdmin={true}>
                <UpdateSize />
              </ProtectRoute>
            }
          />
          <Route
            path="/admin/management/colors"
            element={
              <ProtectRoute isAdmin={true}>
                <ColorList />
              </ProtectRoute>
            }
          />
          <Route
            path="/admin/management/create-color"
            element={
              <ProtectRoute isAdmin={true}>
                <CreateColor />
              </ProtectRoute>
            }
          />
          <Route
            path="/admin/management/color/:colorId"
            element={
              <ProtectRoute isAdmin={true}>
                <UpdateColor />
              </ProtectRoute>
            }
          />
          <Route
            path="/admin/management/categories"
            element={
              <ProtectRoute isAdmin={true}>
                <CategoryList />
              </ProtectRoute>
            }
          />
          <Route
            path="/admin/management/create-category"
            element={
              <ProtectRoute isAdmin={true}>
                <CreateCategory />
              </ProtectRoute>
            }
          />
          <Route
            path="/admin/management/category/:categoryId"
            element={
              <ProtectRoute isAdmin={true}>
                <UpdateCategory />
              </ProtectRoute>
            }
          />
          <Route
            path="/admin/management/products"
            element={
              <ProtectRoute isAdmin={true}>
                <ProductList />
              </ProtectRoute>
            }
          />
          <Route
            path="/admin/management/create-product"
            element={
              <ProtectRoute isAdmin={true}>
                <CreateProduct />
              </ProtectRoute>
            }
          />
          <Route
            path="/admin/management/product/:productId"
            element={
              <ProtectRoute isAdmin={true}>
                <UpdateProduct />
              </ProtectRoute>
            }
          />
          <Route
            path="/admin/management/blogs"
            element={
              <ProtectRoute isAdmin={true}>
                <BlogsList />
              </ProtectRoute>
            }
          />
          <Route
            path="/admin/management/create-blog"
            element={
              <ProtectRoute isAdmin={true}>
                <CreateBlog />
              </ProtectRoute>
            }
          />
          <Route
            path="/admin/management/blog/:blogId"
            element={
              <ProtectRoute isAdmin={true}>
                <UpdateBlog />
              </ProtectRoute>
            }
          />
          <Route
            path="/admin/management/contacts"
            element={
              <ProtectRoute isAdmin={true}>
                <ContactList />
              </ProtectRoute>
            }
          />
          <Route
            path="/admin/management/contact/:contactId"
            element={
              <ProtectRoute isAdmin={true}>
                <RelpyContact />
              </ProtectRoute>
            }
          />
          <Route
            path="/admin/management/subscribers"
            element={
              <ProtectRoute isAdmin={true}>
                <SubscriberList />
              </ProtectRoute>
            }
          />
          <Route
            path="/admin/management/orders"
            element={
              <ProtectRoute isAdmin={true}>
                <OrderList />
              </ProtectRoute>
            }
          />
          <Route
            path="/admin/management/order/:orderId"
            element={
              <ProtectRoute isAdmin={true}>
                <UpdateOrder />
              </ProtectRoute>
            }
          />
          <Route
            path="/admin/management/users"
            element={
              <ProtectRoute isAdmin={true}>
                <UserList />
              </ProtectRoute>
            }
          />
          <Route
            path="/admin/management/create-user"
            element={
              <ProtectRoute isAdmin={true}>
                <CreateUser />
              </ProtectRoute>
            }
          />
          <Route
            path="/admin/management/user/:userId"
            element={
              <ProtectRoute isAdmin={true}>
                <UpdateUser />
              </ProtectRoute>
            }
          />
          <Route
            path="/admin/management/reviews"
            element={
              <ProtectRoute isAdmin={true}>
                <ProductReviewList />
              </ProtectRoute>
            }
          />
          <Route
            path="/admin/statistic"
            element={
              <ProtectRoute isAdmin={true}>
                <Statistic />
              </ProtectRoute>
            }
          />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
