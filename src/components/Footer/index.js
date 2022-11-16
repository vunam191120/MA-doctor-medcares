import React from 'react';
import { FaFacebookF, FaPinterestP, FaInstagram } from 'react-icons/fa';
import { AiOutlineTwitter } from 'react-icons/ai';
import { BsTelephoneFill } from 'react-icons/bs';
import { TfiEmail } from 'react-icons/tfi';
import { MdPlace } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Image } from 'antd';

import doctor1 from '../../assets/img/doctor1.jpeg';
import doctor2 from '../../assets/img/doctor2.jpeg';
import doctor3 from '../../assets/img/doctor3.jpeg';

export default function Footer() {
  return (
    <footer>
      <section className="footer-container">
        <div className="container-fluid">
          <div className="footer-content">
            <div className="footer-item">
              <h3 className="title">MedCare</h3>
              <p className="description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore aliqua.
              </p>
              <ul className="social-list">
                <li className="social-item facebook">
                  <FaFacebookF className="icon" />
                </li>
                <li className="social-item twitter">
                  <AiOutlineTwitter className="icon" />
                </li>
                <li className="social-item pinterest">
                  <FaPinterestP className="icon" />
                </li>
                <li className="social-item instagram">
                  <FaInstagram className="icon" />
                </li>
              </ul>
            </div>
            <div className="footer-item">
              <h3 className="title">Instagram</h3>
              <ul className="image-list">
                <Image src={doctor1} className="image" />
                <Image src={doctor2} className="image" />
                <Image src={doctor3} className="image" />
                <Image src={doctor1} className="image" />
                <Image src={doctor2} className="image" />
                <Image src={doctor3} className="image" />
              </ul>
            </div>
            <div className="footer-item">
              <h3 className="title">Userful Links</h3>
              <ul className="link-list">
                <li className="link-item">
                  <Link to="#home" className="link">
                    Home
                  </Link>
                </li>
                <li className="link-item">
                  <Link to="#about" className="link">
                    About
                  </Link>
                </li>
                <li className="link-item">
                  <Link to="#solution" className="link">
                    Solution
                  </Link>
                </li>
                <li className="link-item">
                  <Link to="#services" className="link">
                    Services
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer-item">
              <h3 className="title">Contact</h3>
              <ul className="contact-list">
                <li className="contact-item">
                  <BsTelephoneFill className="icon" />
                  <div className="info">
                    <h5>Phone</h5>
                    <a href="tel:+123456123">+123(456)123</a>
                  </div>
                </li>
                <li className="contact-item">
                  <TfiEmail className="icon" />
                  <div className="info">
                    <h5>Email</h5>
                    <a href="mailto:healthcare@gmail">healthcare@gmail.com</a>
                  </div>
                </li>
                <li className="contact-item">
                  <MdPlace className="icon" />
                  <div className="info">
                    <h5>Place</h5>
                    <p>Nam Tu Liem district, Ha Noi</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="lines">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </section>
      <section className="copyright-container">
        <p>
          Copyright © 2022 MedCares. All Rights Reserved by{' '}
          <Link to="#" className="link">
            Vu Nam
          </Link>
        </p>
      </section>
    </footer>
  );
}
