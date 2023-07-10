import React, { useState } from 'react';
import ActiveUserInfoComponent from './activeuser.component';
import PDFViewer from './pdfViewer';
import PDFlist from './pdfList';
import CheckedRowsComponent from './checkedRows.component';
import '../styles/session.css';
import backgroundImage from '../assets/bg_login.jpg';

const Sessioncomponents = () => {
  const [clickedBillInfo, setClickedBillInfo] = useState(null);
  const [reload, setReload] = useState(false);
  const [selectedBillIds, setSelectedBillIds] = useState([]);

  const handleBillClick = (billId, billInfo) => {
    console.log('Clicked bill session c:', billId);
    setClickedBillInfo(billId);
    setReload(!reload);
  };

  const handleBillSelect = (billId) => {
    const updatedSelectedBillIds = selectedBillIds.includes(billId)
      ? selectedBillIds.filter((id) => id !== billId)
      : [...selectedBillIds, billId];
    setSelectedBillIds(updatedSelectedBillIds);
  };

  const handleDisplayButtonClick = () => {
    console.log('Selected Bill IDs:', selectedBillIds);
  };

  return (
    <div className="container">
      <div className="background-image" style={{ backgroundImage: `url(${backgroundImage})` }} />
      <div className="overlay-component">
        <ActiveUserInfoComponent />
      </div>
      <div className="combined-container">
        <div className="table-component">
          <PDFlist onBillClick={handleBillClick} onBillSelect={handleBillSelect} />
        </div>
        <div className="pdfv-component">
          {clickedBillInfo && <PDFViewer key={clickedBillInfo} clickedBillInfo={clickedBillInfo} reload={reload} />}
        </div>
        <div className="checked-rows-component">
          {selectedBillIds.length > 0 && (
            <CheckedRowsComponent
              selectedBillIds={selectedBillIds}
              onDisplayButtonClick={handleDisplayButtonClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Sessioncomponents;

