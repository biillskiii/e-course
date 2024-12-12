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
import DashboardUser from "./pages/user/DashboardUser";
import KelasUser from "./pages/user/KelasUser";
import WebinarUser from "./pages/user/WebinarUser";
import DaftarTransaksi from "./pages/user/DaftarTransaksi";
import DetailTransaksi from "./pages/user/DetailTransaksi";
import Pengaturan from "./pages/user/Pengaturan";
import DetailClass from "./components/CourseDetail";
import SiswaList from "./pages/admin/SiswaList";
import DetailClassUser from "./pages/user/DetailClass";

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
        <Route path="/admin/daftar-transaksi" element={<Transaksi />} />
        <Route path="/admin/kelas/:id" element={<SiswaList />} />
        <Route path="/user/dashboard" element={<DashboardUser />} />
        <Route path="/user/kelas" element={<KelasUser />} />
        <Route path="/user/webinar" element={<WebinarUser />} />
        <Route path="/user/daftar-transaksi" element={<DaftarTransaksi />} />
        <Route path="/detail/:billNumber" element={<DetailTransaksi />} />
        <Route path="/user/pengaturan" element={<Pengaturan />} />
        <Route path="/user/detail/:id" element={<DetailClass />} />
        <Route path="/user/detail-user/:id" element={<DetailClassUser />} />
      </Routes>
    </Router>
  );
}

export default App;
