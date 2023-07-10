import React, { useState, useRef, useEffect } from 'react';
import { pdfjs } from 'react-pdf';
import '../styles/pdfViewer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = ({ clickedBillInfo, reload }) => {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pdfData, setPdfData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPdfData = async () => {
    const billId = clickedBillInfo || '1';
    console.log('bill id pdf view', billId);
    try {
      const response = await fetch(`/bill_data/${billId}`);
      if (!response.ok) {
        throw new Error('Error fetching PDF data');
      }
      const data = await response.blob();
      setPdfData(URL.createObjectURL(data));
    } catch (error) {
      console.error('Error fetching PDF data:', error);
    }
  };

  useEffect(() => {
    fetchPdfData();
  }, [clickedBillInfo, reload]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="pdf-container">
      <div className="pdf-document">
        {pdfData && (
          <button className="open-pdf-button" onClick={openModal}>
            Open PDF
          </button>
        )}
      </div>
      {isModalOpen && (
        <div className="pdf-modal-overlay">
        <div className="pdf-modal">
          <button className="pdf-modal-close" onClick={closeModal}>
            Close
          </button>
          <div className="pdf-modal-content">
            <div className="pdf-modal-left">
              {pdfData && (
                <iframe src={pdfData} className="pdf-iframe" title="PDF Viewer" />
              )}
            </div>
            <div className="pdf-modal-right">
              <h2>Coming Soon</h2>
              <p>Additional content will be available in the future.</p>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default PDFViewer;
