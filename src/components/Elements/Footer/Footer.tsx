/* eslint-disable react/function-component-definition */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Footer.scss';

const Footer: React.FC = () => {
  const location = useLocation();
  return (
    <footer className="footer">
      <div>
        {location.pathname !== '/mentions-legales' && (
          <Link to="/mentions-legales">Mentions légales</Link>
        )}
        {location.pathname !== '/faq' && <Link to="/faq">FAQ</Link>}

        <div>© 2024</div>
      </div>
    </footer>
  );
};

export default Footer;
