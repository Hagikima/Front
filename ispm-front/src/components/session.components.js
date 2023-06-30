// Sessioncomponents component
import React, { useState } from 'react';
import ActiveUserInfoComponent from './activeuser.component';
import PDFViewer from './pdfViewer';
import PDFlist from './pdfList';
import '../styles/session.css';

const Sessioncomponents = () => {
  const [clickedBillInfo, setClickedBillInfo] = useState(null);
  const [reload, setReload] = useState(false); // Add 'reload' state

  const handleBillClick = (billName, billInfo) => {
    console.log('Clicked bill session c:', billName);
    setClickedBillInfo(billName);
    setReload(!reload); // Toggle the 'reload' state
  };
  


  return (
    <div className="combined-container">
      <div className="left-component">
        <ActiveUserInfoComponent />
      </div>
      <div className="middle-component">
        <PDFlist onBillClick={handleBillClick} />
      </div>
      <div className="right-component">
        <div className="scrollable-box">
          <PDFViewer key={clickedBillInfo} clickedBillInfo={clickedBillInfo} reload={reload} />
        </div>
      </div>
    </div>
  );
};

export default Sessioncomponents;
