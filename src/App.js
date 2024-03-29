import React from 'react';
import './App.css';
import HomeComponent from './components/HomeComponent';
import ReposComponent from './components/ReposComponent';
import RepositoryDetails from './components/RepositoryDetails';
import AppDrawer from './components/AppDrawer'; // Asigură-te că calea către AppDrawer este corectă
import {Routes, Route} from "react-router-dom";

function App() {
  return (
      <div className="App">
          <AppDrawer /> {/* Acesta este Drawer-ul pe care îl vei utiliza pentru navigație */}
          <Routes>
              <Route path="/home" element={<HomeComponent/>}/>
              <Route path="/" element={<HomeComponent/>}/>
              <Route path="/repos" element={<ReposComponent/>} />
              <Route path="/repos/:repoId" element={<RepositoryDetails/>} />
          </Routes>
      </div>
  );
}

export default App;
