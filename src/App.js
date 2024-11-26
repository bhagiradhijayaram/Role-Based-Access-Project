import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login"
import Navbar from "./components/Navbar";
import Admin from "./components/Admin";
import Accountant from "./components/Accountant";
import DataOperator from "./components/DataOperator";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/accountant" element={<Accountant />} />
        <Route path="/data-operator" element={<DataOperator />} />
      </Routes>
    </Router>
  );
};

export default App;
