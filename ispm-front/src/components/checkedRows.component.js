import React, { useState } from 'react';
import '../styles/checkedRows.css';

const CheckedRowsComponent = ({ selectedBillIds }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDisplayButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button className="assign-pdf-button" onClick={handleDisplayButtonClick}>
        Assign PDFs
      </button>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h3>Selected Bills:</h3>
            <ul>
              {selectedBillIds.map((billId) => (
                <li key={billId}>{billId}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckedRowsComponent;
