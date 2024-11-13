import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import TestComponents from "./pages/TestComponents";
import Class from "./pages/Class";
import ClassDetail from "./pages/ClassDetail";
import Checkout from "./pages/Checkout";
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/admin/Dashboard";
import Kelas from "./pages/admin/Kelas";
import Webinar from "./pages/admin/Webinar";
import TambahKelas from "./pages/admin/TambahKelas";
import Mentee from "./pages/admin/Mentee";
import Mentor from "./pages/admin/Mentor";
import Transaksi from "./pages/admin/Transaksi";
import StudentDashboard from "./pages/username/dashboard/Dashboard";
// import DashboardUser from "./pages/username/dashboard/Dashboard";
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
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/kelas" element={<Kelas />} />
        <Route path="/admin/kelas/tambah-kelas" element={<TambahKelas />} />
        <Route path="/admin/webinar" element={<Webinar />} />
        <Route path="/admin/mentee" element={<Mentee />} />
        <Route path="/admin/mentor" element={<Mentor />} />
        <Route path="/admin/daftar-transaksi" element={<Transaksi/>} />
        <Route path="/dashboard-siswa" element={<StudentDashboard />} />
        {/* <Route path={`/${username}/dashboard`} element={<DashboardUser />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
