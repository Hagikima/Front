import React, { Fragment } from 'react';
import { BrowserRouter, Router, Route, Routes, Switch } from 'react-router-dom';
import LoginComponent from './components/login.component'; // Update import path
import Logoutcomponent from './components/Logout.component'; // Update import path
import Homecomponent from './components/Home.component'; // don't forget to update
import PDFViewer from './components/pdfViewer';
import Sessioncomponents from './components/session.components';
import ActiveUserInfoComponent from './components/activeuser.component';


const App = () => {
    return (
      <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Homecomponent/>} />
            <Route exact path="/Home" element={<Homecomponent/>} />
            <Route exact path="/Login" element={<LoginComponent/>} />
            <Route exact path="/activesession" element={<Sessioncomponents/>} />
            <Route exact path='/activeuser' element={<ActiveUserInfoComponent/>}/>
            <Route exact path='/pdfv' element={<PDFViewer />} />
        </Routes>
      </BrowserRouter>
    );
  };

export default App;
