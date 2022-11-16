import React, { useEffect } from 'react';
import { Col, Row } from 'antd';
import { BsClock } from 'react-icons/bs';
import {
  FaFacebookF,
  FaPinterestP,
  FaInstagram,
  FaTelegramPlane,
  FaPhoneAlt,
} from 'react-icons/fa';
import { AiOutlineTwitter } from 'react-icons/ai';

import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import { isLogin } from '../../helpers/isLogin';
import { useDispatch, useSelector } from 'react-redux';
import {
  getIdentity,
  selectUserNeedUpdate,
} from '../../store/slices/usersSlice';

export default function Header() {
  const currentDoctor = useSelector(selectUserNeedUpdate);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIdentity());
  }, [dispatch]);

  return (
    <section className="header-container">
      <div className="header-content">
        <Row className="container-fluid">
          <Col className="left" xs={0} sm={0} md={12} lg={12} xl={12}>
            <p className="info-item">
              <span className="icon-container">
                <BsClock className="icon" />
              </span>
              Mon-Fri 09-18.00
            </p>
            <p className="info-item">
              <span className="icon-container">
                <FaPhoneAlt className="icon" />
              </span>
              Call Us: +821-456-241
            </p>
            <p className="info-item">
              <span className="icon-container">
                <FaTelegramPlane className="icon" />
              </span>
              hello@info.com
            </p>
          </Col>
          <Col className="right" xs={0} sm={0} md={12} lg={12} xl={12}>
            <span className="socials facebook">
              <FaFacebookF />
            </span>
            <span className="socials pinterest">
              <FaPinterestP />
            </span>
            <span className="socials twitter">
              <AiOutlineTwitter />
            </span>
            <span className="socials instagram">
              <FaInstagram />
            </span>
            {isLogin() ? (
              <>
                <Link
                  to="/profile/user-form"
                  className="button button--light profile-btn"
                >
                  <img
                    className="avatar"
                    src={
                      Object.keys(currentDoctor).length > 0
                        ? currentDoctor.avatar[0].url
                        : ''
                    }
                    alt="avatar"
                  />
                  Hello, {currentDoctor.full_name}
                </Link>
                <Button
                  onClick={() => {
                    localStorage.removeItem('currentDoctor');
                    localStorage.removeItem('accessToken');
                    window.location.href = '/signin';
                  }}
                  type="button"
                  className="button button--text--white sign-out-btn"
                >
                  <span>Sign Out</span>
                </Button>
              </>
            ) : (
              <>
                {/* <Link to="/signin" className="button button--text--white">
                  Sign In
                </Link> */}
                <Link to="/signin" className="button button--light square">
                  Sign In
                </Link>
              </>
            )}
          </Col>
        </Row>
      </div>
    </section>
  );
}
