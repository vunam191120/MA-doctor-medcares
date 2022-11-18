import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import ScrollToTop from 'react-scroll-to-top';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { selectUserNeedUpdate } from '../../store/slices/usersSlice';
import sidebarData from './sidebarData';

export default function MyProfile() {
  const currentDoctor = useSelector(selectUserNeedUpdate);

  return (
    <>
      <ScrollToTop smooth color="#6f00ff" />
      <Header />
      <div className="profile-container">
        <div className="container-fluid profile-content">
          <Row>
            <Col className="left" sm={24} md={24} lg={6} xl={6} xxl={6}>
              <div className="sidebar-container">
                <div className="sidebar-header">
                  <img
                    className="avatar"
                    alt="avatar"
                    src={
                      Object.keys(currentDoctor).length > 0
                        ? currentDoctor.avatar[0].url
                        : ''
                    }
                  />
                  <h3 className="name">Dr. {currentDoctor.full_name}</h3>
                  <h5 className="category">
                    BDS, MDS - Oral &amp; Maxillofacial Surgery
                  </h5>
                </div>
                <ul className="sidebar-list">
                  {sidebarData.map((data, index) => (
                    <li key={index} className="sidebar-item">
                      <NavLink to={data.path} className="sidebar-link">
                        {data.icon}
                        {data.text}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
            <Col className="right" sm={24} md={24} lg={18} xl={18} xxl={18}>
              <Outlet />
            </Col>
          </Row>
        </div>
      </div>
      <Footer />
    </>
  );
}
