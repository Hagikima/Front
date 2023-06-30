import React, { useState } from 'react';

const DescriptionInput = () => {
  const [description, setDescription] = useState('');
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  const handleInputChange = (e) => {
    setDescription(e.target.value);
  };

  const toggleDescription = () => {
    setIsDescriptionOpen(!isDescriptionOpen);
  };

  return (
    <div>
      <button onClick={toggleDescription}>Open Description</button>
      {isDescriptionOpen && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
            backgroundColor: 'white',
            padding: '20px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
          }}
        >
          <textarea
            value={description}
            onChange={handleInputChange}
            placeholder="Enter description..."
          />
          <button onClick={toggleDescription}>Close Description</button>
        </div>
      )}
    </div>
  );
};

export default DescriptionInput;
