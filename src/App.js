import logo from './logo.svg';
import './App.css';
import HomeComponent from './HomeComponent';
import {Routes, Route} from "react-router-dom";

function App() {
  return (
      <div className="App">
          <Routes>
              <Route path="/home" element={<HomeComponent/>}/>
              <Route
                  path="/" element={<HomeComponent/>}
              />
          </Routes>
      </div>
  );
}

export default App;
