import React, { useEffect, useState, useRef } from 'react';
import '../styles/pdfList.css';

const PDFlist = ({ onBillClick, onBillSelect }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null); // Track the selected bill ID
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPMarket, setFilterPMarket] = useState('');
  const [filterSubMarket, setFilterSubMarket] = useState('');
  const [searchByDescription, setSearchByDescription] = useState(false);
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [branchString, setBranchString] = useState([]);
  const [mainString, setMainString] = useState([]);
  const [sortOrder, setSortOrder] = useState({});



  useEffect(() => {
    // Fetch user information
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
    // Fetch bills when user information is available
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

  const getPrivilegeBool = (privilege) => {
    switch (privilege) {
      case 1:
      case 2:
        return true;
      default:
        return false;
    }
  };

  const getStatusString = (status) => {
    switch (status) {
      case 1:
        return 'OK';
      case 2:
        return 'Not OK';
      case 3:
        return 'Pending';
      default:
        return 'Unknown status';
    }
  };

  // Fetch branch markets
  useEffect(() => {
    if (userInfo) {
      const getBranchString = async () => {
        try {
          const response = await fetch(`bm`);
          if (response.ok) {
            const data = await response.json();
            setBranchString(data);
          } else {
            console.log('Error retrieving branches');
          }
        } catch (error) {
          console.error('Error occurred during branches fetch:', error);
        }
      };

      getBranchString();
    }
  }, [userInfo]);

  // Fetch main markets
  useEffect(() => {
    if (userInfo) {
      const getMainString = async () => {
        try {
          const response = await fetch(`mm`);
          if (response.ok) {
            const data = await response.json();
            setMainString(data);
          } else {
            console.log('Error retrieving Mains');
          }
        } catch (error) {
          console.error('Error occurred during Mains fetch:', error);
        }
      };

      getMainString();
    }
  }, [userInfo]);

  const findCorrespondingString = (markets, market) => {
    return markets.find((item) => item[0] === market)?.[1];
  };
  
  const handleBillClicka = (columnName) => {
    const isAscending = sortOrder[columnName] === 'asc';
    const nextOrder = isAscending ? 'desc' : 'asc';
  
    // Create a copy of the current sort order and update the clicked column
    const updatedSortOrder = { ...sortOrder };
    updatedSortOrder[columnName] = nextOrder;
  
    setSortOrder(updatedSortOrder);
  
    // Sort the bills based on the clicked column
    const sortedBills = [...bills].sort((bill1, bill2) => {
      const value1 = bill1[columnName];
      const value2 = bill2[columnName];
  
      if (value1 < value2) {
        return isAscending ? -1 : 1;
      }
      if (value1 > value2) {
        return isAscending ? 1 : -1;
      }
      return 0;
    });
  
    setBills(sortedBills);
  };
  

  const handleBillClick = (billId) => {
    console.log('pdflist:', billId);
    onBillClick(billId);
    setSelectedBill(billId); // Set the selected bill ID
  };

  const handleBillSelect = (billId) => {
    onBillSelect(billId);
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const handleFilterStatus = (event) => {
    setFilterStatus(event.target.value);
  };

  const handleFilterPMarket = (event) => {
    setFilterPMarket(event.target.value);
  };
  
  const handleFilterSubMarket = (event) => {
    setFilterSubMarket(event.target.value);
  };
  

  const handleToggleSearchByDescription = () => {
    setSearchByDescription(!searchByDescription);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownItemClick = (status) => {
    setFilterStatus(status);
    setIsDropdownOpen(false);
  };

  const filteredBills = bills.filter((bill) => {
    const billName = bill[1].toLowerCase();
    const description = bill[3].toLowerCase();
    const status = bill[2].toString();
  
    // Apply the search and filter criteria
    const matchesSearchText =
      searchText === '' ||
      description.includes(searchText.toLowerCase()) ||
      billName.includes(searchText.toLowerCase());
  
    const matchesFilterStatus = filterStatus === '' || status === filterStatus;
    const matchesFilterPMarket = filterPMarket === '' || parseInt(bill[4]) === parseInt(filterPMarket);
    const matchesFilterSubMarket = filterSubMarket === '' || parseInt(bill[5]) === parseInt(filterSubMarket);
  
    return matchesSearchText && matchesFilterStatus && matchesFilterPMarket && matchesFilterSubMarket;
  });
  
  return (
    <div className="pdflist-container">
      <div className="search-filter-container">
        <input type="text" value={searchText} onChange={handleSearch} placeholder="Search by bill name or description" />
        <div className="filter-container">
          <select value={filterStatus} onChange={handleFilterStatus}>
            <option value="">All Status</option>
            <option value="1">OK</option>
            <option value="2">Not OK</option>
            <option value="3">Pending</option>
          </select>
        </div>
        <div className="filter-container">
          <select value={filterPMarket} onChange={handleFilterPMarket}>
            <option value="">All P.Market</option>
            {mainString.map((item) => (
              <option key={item[0]} value={item[0]}>
                {item[1]}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-container">
          <select value={filterSubMarket} onChange={handleFilterSubMarket}>
            <option value="">All Sub.Market</option>
            {branchString.map((item) => (
              <option key={item[0]} value={item[0]}>
                {item[1]}
              </option>
            ))}
          </select>
        </div>
      </div>
  
      <div className="table-container">
        {filteredBills.length > 0 ? (
          <table className="pdflist orange-theme">
<thead>
  <tr>
    <th onClick={() => handleBillClicka('0')}>
      Bill ID
      {sortOrder['0'] === 'asc' && <span>&uarr;</span>}
      {sortOrder['0'] === 'desc' && <span>&darr;</span>}
    </th>
    <th onClick={() => handleBillClicka('1')}>
      Bill Name
      {sortOrder['1'] === 'asc' && <span>&uarr;</span>}
      {sortOrder['1'] === 'desc' && <span>&darr;</span>}
    </th>
    <th onClick={() => handleBillClicka('2')}>
      Status
      {sortOrder['2'] === 'asc' && <span>&uarr;</span>}
      {sortOrder['2'] === 'desc' && <span>&darr;</span>}
    </th>
    <th onClick={() => handleBillClicka('3')}>
      Description
      {sortOrder['3'] === 'asc' && <span>&uarr;</span>}
      {sortOrder['3'] === 'desc' && <span>&darr;</span>}
    </th>
    <th onClick={() => handleBillClicka('4')}>
      P.Market
      {sortOrder['4'] === 'asc' && <span>&uarr;</span>}
      {sortOrder['4'] === 'desc' && <span>&darr;</span>}
    </th>
    <th onClick={() => handleBillClicka('5')}>
      sub.Market
      {sortOrder['5'] === 'asc' && <span>&uarr;</span>}
      {sortOrder['5'] === 'desc' && <span>&darr;</span>}
    </th>
    {getPrivilegeBool(userInfo?.privileges) && (
      <th>Checkbox</th>
    )}
  </tr>
</thead>

            <tbody>
              {filteredBills.map((bill, index) => (
                <tr
                  key={index}
                  className={selectedBill === bill[0] ? 'selected-row' : ''}
                  onClick={() => handleBillClick(bill[0])}
                  onMouseOver={(e) => (e.target.style.cursor = 'pointer')}
                  onMouseLeave={(e) => (e.target.style.cursor = 'default')}
                >
                  <td>{bill[0]}</td>
                  <td>
                    <a className="pdflist-link" href="#">
                      {bill[1]}
                    </a>
                  </td>
                  <td className="biggest-field">{getStatusString(bill[2])}</td>
                  <td>{bill[3]}</td>
                  <td>{findCorrespondingString(mainString, bill[4])}</td>
                  <td>{findCorrespondingString(branchString, bill[5])}</td>
                  {getPrivilegeBool(userInfo?.privileges) && (
                    <td className="checkbox-column">
                      <label className="checkbox-container">
                        <input type="checkbox" onChange={() => handleBillSelect(bill[0])} />
                        <span></span>
                      </label>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="pdflist-no-bills">No bills found</p>
        )}
      </div>
    </div>
  );
  
};

export default PDFlist;
