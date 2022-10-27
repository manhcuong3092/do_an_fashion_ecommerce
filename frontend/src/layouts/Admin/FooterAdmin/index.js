import React from 'react';
import { Link } from 'react-router-dom';

const FooterAdmin = () => {
  return (
    <footer className="py-4 bg-light mt-auto">
      <div className="container-fluid px-4">
        <div className="d-flex align-items-center justify-content-between small">
          <div className="text-muted">Copyright &copy; Manh Cuong 2022</div>
          <div>
            <Link>Privacy Policy</Link>
            &middot;
            <Link>Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterAdmin;
