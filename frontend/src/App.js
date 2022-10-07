import './App.css';
import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import BlogList from './pages/BlogList';

function App() {
  return (
    <Fragment>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/blog' element={<BlogList />} />
        </Routes>
      </Router>
      <Footer />
    </Fragment>
  );
}

export default App;
