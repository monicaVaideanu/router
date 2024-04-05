import React from 'react';
import './App.css';
import HomeComponent from './components/HomeComponent';
import ReposComponent from './components/ReposComponent';
import RepositoryDetails from './components/RepositoryDetails';
import AppDrawer from './components/AppDrawer'; 
import {Routes, Route} from "react-router-dom";
import PostComponent from './components/PostComponents';

function App() {
  return (
      <div className="App">
          <AppDrawer /> 
          <Routes>
              <Route path="/home" element={<HomeComponent/>}/>
              <Route path="/" element={<HomeComponent/>}/>
              <Route path="/repos" element={<ReposComponent/>} />
              <Route path="/repos/:repoId" element={<RepositoryDetails/>} />
              <Route path="/posts" element={<PostComponent />} />
          </Routes>
      </div>
  );
}

export default App;
