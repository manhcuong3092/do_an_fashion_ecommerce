import './assets/css/bootstrap.min.css';
import './assets/css/materialdesignicons.min.css';
import './assets/css/responsive.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'mdbreact/dist/css/mdb.css';
import './App.css';
import './assets/css/admin.style.css';
import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

function App() {
  return (
    <Fragment>
      <ToastContainer />
      <Router>
        <Routes>
          {/* user path */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product" element={<Product />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blogdetail" element={<Blog />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/order-detail" element={<OrderDetail />} />

          {/* admin path */}
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/management/sizes" element={<SizeList />} />
          <Route path="/admin/management/create-size" element={<CreateSize />} />
          <Route path="/admin/management/size/:sizeId" element={<UpdateSize />} />
          <Route path="/admin/management/colors" element={<ColorList />} />
          <Route path="/admin/management/create-color" element={<CreateColor />} />
          <Route path="/admin/management/color/:colorId" element={<UpdateColor />} />
          <Route path="/admin/management/categories" element={<CategoryList />} />
          <Route path="/admin/management/create-category" element={<CreateCategory />} />
          <Route path="/admin/management/category/:categoryId" element={<UpdateCategory />} />
          <Route path="/admin/management/products" element={<ProductList />} />
          <Route path="/admin/management/create-product" element={<CreateProduct />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
