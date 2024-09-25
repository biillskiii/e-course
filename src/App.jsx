import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
