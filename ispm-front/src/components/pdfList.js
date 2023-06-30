// PDFlist component
import React, { useEffect, useState } from 'react';
import '../styles/pdfList.css';

const PDFlist = ({ onBillClick }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('/activeuser', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          console.log('fetching user info');
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
      } catch (error) {
        console.error('Error occurred during user information fetch (front):', error);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (userInfo) {
      const fetchBills = async () => {
        try {
          const response = await fetch(`handled/${userInfo.sysusr_id}`);
          if (response.ok) {
            const data = await response.json();
            console.log('bill data:');
            console.log(data);
            setBills(data);
          } else {
            console.log('Error retrieving bills');
          }
        } catch (error) {
          console.error('Error occurred during bill fetch:', error);
        }
      };

      fetchBills();
    }
  }, [userInfo]);

  const getPrivilegeString = (privilege) => {
    switch (privilege) {
      case 1:
        return 'Admin';
      case 2:
        return 'Supervisor';
      case 3:
        return 'No admin rights';
      default:
        return 'Unknown privilege';
    }
  };

  const handleBillClick = (billId) => {
    console.log('pdflist:', billId)
    onBillClick(billId);
  };

  return (
    <div className="pdflist-container">
      {bills.length > 0 ? (
        <ul className="pdflist">
          {bills.map((bill, index) => (
            <li className="pdflist-item" key={index}>
              <a className="pdflist-link" href="#" onClick={() => handleBillClick(bill[0], bill)}>
                {bill[1]}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="pdflist-no-bills">No bills found</p>
      )}
    </div>
  );
};

export default PDFlist;
