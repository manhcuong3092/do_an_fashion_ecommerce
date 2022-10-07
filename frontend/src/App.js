import './App.css';
import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer';
import Home from './pages/Home';

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
      <Header />
      <Router>
        <Routes>
        <Route path='/' element={<Home />} />
        </Routes>
      </Router>
      <Footer />
    </Fragment>
  );
}

export default App;
