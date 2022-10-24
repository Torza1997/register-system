// imort everthing
import './App.css';
// import { Routes, Route, Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
// component
const { Home } = require('./pages/Home.jsx');
const { Dashboard } = require('./pages/Dashboard.jsx');
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div >
  );
}
export default App;
