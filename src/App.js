// imort everthing
import './App.css';
// import { Routes, Route, Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
// component
const { Home } = require('./pages/Home.jsx');
const { Dashboard } = require('./pages/Dashboard.jsx');
const { GlobalContextComp } = require('./contexts/GlobalContext');

function App() {
  return (
    <div className="App">
      <GlobalContextComp>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </GlobalContextComp>
    </div >
  );
}
export default App;
