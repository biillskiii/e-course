import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import TestComponents from "./pages/TestComponents";
import Class from "./pages/Class";
import Webinar from "./pages/Webinar";
import ClassDetail from "./pages/ClassDetail";
import Checkout from "./pages/Checkout";
import ContactUs from "./pages/ContactUs"; 
import StudentDashboard from "./pages/StudentDashboard"; 
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/masuk" element={<LoginPage />} />
        <Route path="/daftar-akun" element={<SignUp />} />
        <Route path="/lupa-katasandi" element={<ForgotPassword />} />
        <Route path="/test" element={<TestComponents />} />
        <Route path="/kelas" element={<Class />} />
        <Route path="/webinar" element={<Webinar />} />
        <Route path="/detail-kelas" element={<ClassDetail />} />
        <Route path="/pembayaran" element={<Checkout />} />
        <Route path="/hubungi-kami" element={<ContactUs />} />
        <Route path="/dashboard-siswa" element={<StudentDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
