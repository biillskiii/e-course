import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Wave from "../assets/login.png";
import TextInput from "../components/InputForm";
import Button from "../components/Button";
import { Google } from "iconsax-react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [captchaValue, setCaptchaValue] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { name, email, password, confirmPassword } = formData;

    // Validasi Form
    if (!name || !email || !password || !confirmPassword) {
      setError("Semua field harus diisi.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Konfirmasi kata sandi tidak cocok.");
      return;
    }

    if (!captchaValue) {
      setError("Harap selesaikan verifikasi CAPTCHA.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_API_KEY}/api/register`,
        {
          name,
          email,
          password,
          password_confirmation: confirmPassword,
          g_recaptcha_response: captchaValue,
        }
      );

      console.log("Respons API:", response.data);
      toast.success("Registrasi berhasil! Silakan login.");
      navigate("/masuk");
    } catch (err) {
      if (err.response) {
        const errorMessage =
          err.response.data.message ||
          "Email sudah terdaftar. Gunakan email lain.";
        toast.error(errorMessage);

        // Periksa jika error karena email sudah terdaftar
      } else if (err.request) {
        console.error("No Response:", err.request);
        setError(
          "Tidak ada respon dari server. Periksa koneksi internet Anda."
        );
        toast.error(
          "Tidak ada respon dari server. Periksa koneksi internet Anda."
        );
      } else {
        console.error("Error:", err.message);
        setError("Terjadi kesalahan. Silakan coba lagi.");
        toast.error("Terjadi kesalahan. Silakan coba lagi.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    toast.info("Fitur Google Sign-Up akan segera hadir");
  };

  return (
    <div className="bg-white flex justify-center items-center max-h-screen overflow-hidden gap-x-10">
      <ToastContainer />
      <div className="w-full">
        <img
          src={Wave}
          alt="SignUp"
          className="w-[660px] py-10 pl-20 min-h-screen"
        />
      </div>
      <div className="w-full flex flex-col justify-center items-center px-28">
        <h1 className="text-3xl font-bold mb-5">Daftar Akun</h1>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <TextInput
            type="text"
            label="Nama Lengkap"
            id="name"
            placeholder="Masukkan nama kamu"
            value={formData.name}
            onChange={handleChange}
          />
          <TextInput
            type="email"
            label="Email"
            id="email"
            placeholder="Masukkan alamat email kamu"
            value={formData.email}
            onChange={handleChange}
          />
          <TextInput
            type="password"
            label="Kata Sandi"
            id="password"
            placeholder="Masukkan kata sandi kamu"
            value={formData.password}
            onChange={handleChange}
          />
          <TextInput
            type="password"
            label="Konfirmasi Kata Sandi"
            id="confirmPassword"
            placeholder="Konfirmasi kata sandi kamu"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_RECAPTCHA}
            onChange={setCaptchaValue}
          />

          <Button
            type="submit"
            label={isLoading ? "Sedang Mendaftar..." : "Daftar Akun"}
            className={`w-full mt-5 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          />
          <div className="flex justify-center items-center gap-x-5 my-5">
            <hr className="w-full" />
            <p>Atau</p>
            <hr className="w-full" />
          </div>
          <Button
            type="button"
            variant="secondary"
            label="Daftar dengan Google"
            className="w-full mt-5"
            leftIcon={<Google variant="Bold" />}
            onClick={handleGoogleSignUp}
          />
          <a href="/masuk" className="flex justify-center gap-x-1 mt-5">
            Sudah Punya Akun?
            <span className="text-primary-500 font-bold"> Masuk Akun</span>
          </a>
        </form>
      </div>
    </div>
  );
}

export default App;
