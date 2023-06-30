// PDFViewer component
import React, { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import '../styles/pdfViewer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = ({ clickedBillInfo, reload }) => {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageInputRef = useRef(null);
  const [pdfData, setPdfData] = useState(null);

  const fetchPdfData = async () => {
    const billId = clickedBillInfo || null;
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

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < numPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageInputChange = (e) => {
    const page = parseInt(e.target.value);
    setCurrentPage(page >= 1 && page <= numPages ? page : currentPage);
  };

  const handlePageInputClick = () => {
    if (pageInputRef.current) {
      pageInputRef.current.select();
    }
  };

  const handlePageInputBlur = () => {
    if (currentPage < 1) {
      setCurrentPage(1);
    } else if (currentPage > numPages) {
      setCurrentPage(numPages);
    }
  };

  return (
    <div className="pdf-container">
      <div className="pdf-controls">
        <button className="mext" onClick={goToPreviousPage} disabled={currentPage === 1}>
          Back
        </button>
        <input
          type="number"
          className="current-page-input"
          min="1"
          max={numPages}
          value={currentPage}
          onChange={handlePageInputChange}
          onClick={handlePageInputClick}
          onBlur={handlePageInputBlur}
          ref={pageInputRef}
        />
        <span>of {numPages}</span>
        <button className="mext" onClick={goToNextPage} disabled={currentPage === numPages}>
          Next
        </button>
      </div>
      <div className="pdf-document">
        {pdfData && (
          <Document file={pdfData} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={currentPage} />
          </Document>
        )}
      </div>
    </div>
  );
};

export default PDFViewer;
