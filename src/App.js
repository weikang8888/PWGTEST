import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginForm from "./page/Login";
import RegisterForm from "./page/Register";
import Homepage from "./page/Home";
import View from "./page/View";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/dashboard" element={<Homepage />} />
        <Route path="/view/:postId" element={<View />} />
      </Routes>
    </Router>
  );
};

export default App;
