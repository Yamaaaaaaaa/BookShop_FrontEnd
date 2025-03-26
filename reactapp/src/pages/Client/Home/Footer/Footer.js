import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer__main">
        <div className="container">
          <div className="footer__grid">
            {/* Column 1 - Logo and About */}
            <div className="footer__column footer__column--brand">
              <div className="footer__logo">
                <img src="/logo.png" alt="Bookland" className="footer__logo-img" />
                <div className="footer__logo-text">
                  <h3>Bookland</h3>
                  <p>Book Store Website</p>
                </div>
              </div>
              <p className="footer__description">
                Bookland is a Book Store Ecommerce Website Template by DezignZone lorem ipsum dolor sit
              </p>
              <div className="footer__social">
                <a href="https://facebook.com" className="footer__social-link">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://youtube.com" className="footer__social-link">
                  <i className="fab fa-youtube"></i>
                </a>
                <a href="https://linkedin.com" className="footer__social-link">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="https://instagram.com" className="footer__social-link">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>

            {/* Column 2 - Our Links */}
            <div className="footer__column">
              <h4 className="footer__heading">Our Links</h4>
              <ul className="footer__links">
                <li><Link to="/about"><i className="fas fa-chevron-right"></i> About Us</Link></li>
                <li><Link to="/contact"><i className="fas fa-chevron-right"></i> Contact Us</Link></li>
                <li><Link to="/privacy"><i className="fas fa-chevron-right"></i> Privacy Policy</Link></li>
                <li><Link to="/pricing"><i className="fas fa-chevron-right"></i> Pricing Table</Link></li>
                <li><Link to="/faq"><i className="fas fa-chevron-right"></i> FAQ</Link></li>
              </ul>
            </div>

            {/* Column 3 - Bookland? */}
            <div className="footer__column">
              <h4 className="footer__heading">Bookland ?</h4>
              <ul className="footer__links">
                <li><Link to="/bookland"><i className="fas fa-chevron-right"></i> Bookland</Link></li>
                <li><Link to="/services"><i className="fas fa-chevron-right"></i> Services</Link></li>
                <li><Link to="/book-details"><i className="fas fa-chevron-right"></i> Book Details</Link></li>
                <li><Link to="/blog-details"><i className="fas fa-chevron-right"></i> Blog Details</Link></li>
                <li><Link to="/shop"><i className="fas fa-chevron-right"></i> Shop</Link></li>
              </ul>
            </div>

            {/* Column 4 - Resources */}
            <div className="footer__column">
              <h4 className="footer__heading">Resources</h4>
              <ul className="footer__links">
                <li><Link to="/download"><i className="fas fa-chevron-right"></i> Download</Link></li>
                <li><Link to="/help-center"><i className="fas fa-chevron-right"></i> Help Center</Link></li>
                <li><Link to="/shop-cart"><i className="fas fa-chevron-right"></i> Shop Cart</Link></li>
                <li><Link to="/login"><i className="fas fa-chevron-right"></i> Login</Link></li>
                <li><Link to="/partner"><i className="fas fa-chevron-right"></i> Partner</Link></li>
              </ul>
            </div>

            {/* Column 5 - Contact */}
            <div className="footer__column footer__column--contact">
              <h4 className="footer__heading">Get in Touch With Us</h4>
              <ul className="footer__contact">
                <li className="footer__contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <p>832 Thompson Drive, San Fransisco CA 94107, US</p>
                </li>
                <li className="footer__contact-item">
                  <i className="fas fa-phone-alt"></i>
                  <div>
                    <p>+123 345123 556</p>
                    <p>+123 345123 556</p>
                  </div>
                </li>
                <li className="footer__contact-item">
                  <i className="fas fa-envelope"></i>
                  <div>
                    <p>support@bookland.id</p>
                    <p>info@bookland.id</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
