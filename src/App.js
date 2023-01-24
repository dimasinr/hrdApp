import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { getApp } from './utils/helpers';
import runOneSignal from './oneSignal/oneSignal';
import { useEffect } from 'react';


function App() {
  useEffect(() => {
    runOneSignal();
  })
  const CurrentApp = getApp()
  return (
    <div className="App">
      <Router>
        <CurrentApp />
      </Router>
    </div>  
  );
}

export default App;
