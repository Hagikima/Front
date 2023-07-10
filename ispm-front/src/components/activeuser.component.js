import React, { useEffect, useState } from 'react';
import '../styles/activeusrs.css';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import LogoutComponent from './Logout.component';

const ActiveUserInfoComponent = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`/activeuser`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          console.log('hello there');
          if (Array.isArray(data) && data.length >= 1) {
            const [sysusrID, firstName, lastName, email, loginId, password, workNum, privilege] = data;
            setUserInfo({
              sysusr_id: sysusrID,
              first_name: firstName,
              last_name: lastName,
              email: email,
              login_id: loginId,
              passphrase: password,
              work_num: workNum,
              privileges: privilege,
            });
          }
        } else {
          console.log('Error retrieving user information (front)');
        }

        // Simulate loading time of 1 second
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setIsLoading(false);
      } catch (error) {
        console.error('Error occurred during user information fetch (front):', error);
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const getPrivilegeString = (privilege) => {
    switch (privilege) {
      case 1:
        return 'Admin';
      case 2:
        return 'Supervisor';
      case 3:
        return 'End User';
      default:
        return 'Unknown privilege';
    }
  };

  const handleCollapseToggle = () => {
    setIsCollapsed(!isCollapsed);
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300); // Adjust the transition duration as needed
  };

  return (
    <><div>
      <nav className="navbar">
        <ul className="menu">
          <li>
            <span className="label">Login ID:</span>
            <span className="value">{userInfo?.login_id}</span>
          </li>
          <li>
            <span className="label">Name:</span>
            <span className="value">{userInfo?.first_name}</span>
          </li>
          <li>
            <span className="label">Last Name:</span>
            <span className="value">{userInfo?.last_name}</span>
          </li>
          <li>
            <span className="label">Email:</span>
            <span className="value">{userInfo?.email}</span>
          </li>
          <li>
            <span className="label">Privilege:</span>
            <span className="value">{getPrivilegeString(userInfo?.privileges)}</span>
          </li>
        </ul>
        <div className="logout-container">
            <LogoutComponent />
        </div>
      </nav>
      </div><div>
              <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
                  <div className="sidebar-content">
                      {isLoading ? (
                          <p className="loading">Loading<span className="dot-1">.</span><span className="dot-2">.</span><span className="dot-3">.</span></p>
                      ) : !isTransitioning && !isCollapsed ? (
                          <>
                              <h2>User Information</h2>
                              <ul className="user-info-list">
                                  <li>
                                      <span className="label">Login ID:</span>
                                      <span className="value">{userInfo?.login_id}</span>
                                  </li>
                                  <li>
                                      <span className="label">Name:</span>
                                      <span className="value">{userInfo?.first_name}</span>
                                  </li>
                                  <li>
                                      <span className="label">Last Name:</span>
                                      <span className="value">{userInfo?.last_name}</span>
                                  </li>
                                  <li>
                                      <span className="label">Email:</span>
                                      <span className="value">{userInfo?.email}</span>
                                  </li>
                                  <li>
                                      <span className="label">Privilege:</span>
                                      <span className="value">{getPrivilegeString(userInfo?.privileges)}</span>
                                  </li>
                              </ul>
                              <LogoutComponent />
                          </>
                      ) : isTransitioning ? (
                          <p className="transitioning">Transitioning<span className="dot-1">.</span><span className="dot-2">.</span><span className="dot-3">.</span></p>
                      ) : isCollapsed ? (
                          <div className="collapsed-view">
                              <h3 className="vertical-text"></h3>
                              <h3 className="vertical-text"></h3>
                          </div>
                      ) : null}
                  </div>
                  <div className="collapse-button-container" onClick={handleCollapseToggle}>
                    <div className={`collapse-button ${isCollapsed ? 'collapsed' : ''}`}>
                        <span className="collapse-icon">
                        {isTransitioning ? null : isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
                        </span>
                    </div>
                    </div>
              </div>
          </div></>
  );
};

export default ActiveUserInfoComponent;
