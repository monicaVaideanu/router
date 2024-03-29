import './App.css';
import HomeComponent from './components/HomeComponent';
import ReposComponent from './components/ReposComponent';
import RepositoryDetails from './components/RepositoryComponent'
import {Routes, Route} from "react-router-dom";

function App() {
  return (
      <div className="App">
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
