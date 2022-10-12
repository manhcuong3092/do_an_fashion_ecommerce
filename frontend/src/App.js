import './assets/css/bootstrap.min.css';
import './assets/css/materialdesignicons.min.css';
import './assets/css/responsive.css';
import './App.css';
import './assets/css/admin.style.css';
import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './layouts/Footer'
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

function App() {
  return (
    <Fragment>
      <ToastContainer />
      <Router>
        <>
          <Routes>
            {/* user path */}
            <Route path='/' element={<Home />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/product' element={<Product />} />
            <Route path='/blog' element={<BlogList />} />
            <Route path='/blogdetail' element={<Blog />} />
            <Route path='/contact' element={<ContactUs />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/password/forgot' element={<ForgotPassword />} />
            <Route path='/password/reset/:token' element={<ResetPassword />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/orders' element={<OrderHistory />} />
            <Route path='/order-detail' element={<OrderDetail />} />

            {/* admin path */}
            <Route path='/admin/dashboard' element={<Dashboard />} />
          </Routes>
        </>
      </Router>
    </Fragment>
  );
}

export default App;
