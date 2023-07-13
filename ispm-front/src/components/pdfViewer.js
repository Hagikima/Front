import React, { useState, useRef, useEffect } from 'react';
import { pdfjs } from 'react-pdf';
import '../styles/pdfViewer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = ({ clickedBillInfo, reload }) => {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pdfData, setPdfData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [problemString, setProblemString] = useState('');
  const [description, setDescription] = useState('');

  const fetchPdfData = async () => {
    const billId = clickedBillInfo;
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

  const handleOptionChange = (e, string) => {
    const { value } = e.target;
    setSelectedOptions((prevState) => ({
      ...prevState,
      [string]: value === 'valid' ? 'valid' : 'invalid',
    }));
  };
  

  useEffect(() => {
    const invalidStrings = Object.entries(selectedOptions)
      .filter(([_, option]) => option === 'invalid')
      .map(([string, _]) => string);

    setProblemString(invalidStrings.join(', '));
  }, [selectedOptions]);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
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
              <div className="options-container">
                <h3>Validation:</h3>
                {pdfData && (
                  <table className='tablething'>
                  <tr>
                    <th className='firstycol'></th>
                    <th></th>
                    <th></th>
                  </tr>
                  <tr>
                    <td>Layout</td>
                    <td>
                      <div class="custom-radio-group">
                        <label class="btn">
                          <input type="radio" name="option-layout" value="valid" checked={selectedOptions['layout'] === 'valid'} onChange={(e) => handleOptionChange(e, 'layout')} />
                          <span>Valid</span>
                        </label>
                        <label class="btn">
                          <input type="radio" name="option-layout" value="invalid" checked={selectedOptions['layout'] === 'invalid'} onChange={(e) => handleOptionChange(e, 'layout')} />
                          <span>Invalid</span>
                        </label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>TVA</td>
                    <td>
                      <div class="custom-radio-group">
                        <label class="btn">
                          <input type="radio" name="option-TVA" value="valid" checked={selectedOptions['TVA'] === 'valid'} onChange={(e) => handleOptionChange(e, 'TVA')} />
                          <span>Valid</span>
                        </label>
                        <label class="btn">
                          <input type="radio" name="option-TVA" value="invalid" checked={selectedOptions['TVA'] === 'invalid'} onChange={(e) => handleOptionChange(e, 'TVA')} />
                          <span>Invalid</span>
                        </label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>OCC</td>
                    <td>
                      <div class="custom-radio-group">
                        <label class="btn">
                          <input type="radio" name="option-OCC" value="valid" checked={selectedOptions['OCC'] === 'valid'} onChange={(e) => handleOptionChange(e, 'OCC')} />
                          <span>Valid</span>
                        </label>
                        <label class="btn">
                          <input type="radio" name="option-OCC" value="invalid" checked={selectedOptions['OCC'] === 'invalid'} onChange={(e) => handleOptionChange(e, 'OCC')} />
                          <span>Invalid</span>
                        </label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Discount</td>
                    <td>
                      <div class="custom-radio-group">
                        <label class="btn">
                          <input type="radio" name="option-Discount" value="valid" checked={selectedOptions['Discount'] === 'valid'} onChange={(e) => handleOptionChange(e, 'Discount')} />
                          <span>Valid</span>
                        </label>
                        <label class="btn">
                          <input type="radio" name="option-Discount" value="invalid" checked={selectedOptions['Discount'] === 'invalid'} onChange={(e) => handleOptionChange(e, 'Discount')} />
                          <span>Invalid</span>
                        </label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Usage</td>
                    <td>
                      <div class="custom-radio-group">
                        <label class="btn">
                          <input type="radio" name="option-Usage" value="valid" checked={selectedOptions['Usage'] === 'valid'} onChange={(e) => handleOptionChange(e, 'Usage')} />
                          <span>Valid</span>
                        </label>
                        <label class="btn">
                          <input type="radio" name="option-Usage" value="invalid" checked={selectedOptions['Usage'] === 'invalid'} onChange={(e) => handleOptionChange(e, 'Usage')} />
                          <span>Invalid</span>
                        </label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Stamp-duty</td>
                    <td>
                      <div class="custom-radio-group">
                        <label class="btn">
                          <input type="radio" name="option-Stamp-duty" value="valid" checked={selectedOptions['Stamp-duty'] === 'valid'} onChange={(e) => handleOptionChange(e, 'Stamp-duty')} />
                          <span>Valid</span>
                        </label>
                        <label class="btn">
                          <input type="radio" name="option-Stamp-duty" value="invalid" checked={selectedOptions['Stamp-duty'] === 'invalid'} onChange={(e) => handleOptionChange(e, 'Stamp-duty')} />
                          <span>Invalid</span>
                        </label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Amount-TTC</td>
                    <td>
                      <div class="custom-radio-group">
                        <label class="btn">
                          <input type="radio" name="option-Amount-TTC" value="valid" checked={selectedOptions['Amount-TTC'] === 'valid'} onChange={(e) => handleOptionChange(e, 'Amount-TTC')} />
                          <span>Valid</span>
                        </label>
                        <label class="btn">
                          <input type="radio" name="option-Amount-TTC" value="invalid" checked={selectedOptions['Amount-TTC'] === 'invalid'} onChange={(e) => handleOptionChange(e, 'Amount-TTC')} />
                          <span>Invalid</span>
                        </label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Amount-HT</td>
                    <td>
                      <div class="custom-radio-group">
                        <label class="btn">
                          <input type="radio" name="option-Amount-HT" value="valid" checked={selectedOptions['Amount-HT'] === 'valid'} onChange={(e) => handleOptionChange(e, 'Amount-HT')} />
                          <span>Valid</span>
                        </label>
                        <label class="btn">
                          <input type="radio" name="option-Amount-HT" value="invalid" checked={selectedOptions['Amount-HT'] === 'invalid'} onChange={(e) => handleOptionChange(e, 'Amount-HT')} />
                          <span>Invalid</span>
                        </label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Other</td>
                    <td>
                      <div class="custom-radio-group">
                        <label class="btn">
                          <input type="radio" name="option-Other" value="valid" checked={selectedOptions['Other'] === 'valid'} onChange={(e) => handleOptionChange(e, 'Other')} />
                          <span>Valid</span>
                        </label>
                        <label class="btn">
                          <input type="radio" name="option-Other" value="invalid" checked={selectedOptions['Other'] === 'invalid'} onChange={(e) => handleOptionChange(e, 'Other')} />
                          <span>Invalid</span>
                        </label>
                      </div>
                    </td>
                  </tr>
                </table>
                
                )}
              </div>
              <div className="problem-description">
              {problemString && (
                  <div>
                    <h3>Invalid Options Selected:</h3>
                    <p className='pp'>{problemString}</p>
                    <input className='describer' placeholder="Describe the issue" value={description} onChange={handleDescriptionChange} />
                  </div>
                )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
