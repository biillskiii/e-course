import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";
import Wave from "../assets/login.png";
import TextInput from "../components/InputForm";
import Button from "../components/Button";
import Cookies from "js-cookie";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ email: "", password: "" });
  const router = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    let isValid = true;

    // Reset error state
    setError({ email: "", password: "" });

    // Validate email
    if (!email) {
      setError((prev) => ({
        ...prev,
        email: "Email is required",
      }));
      toast.error("Email is required");
      isValid = false;
    }

    // Validate password
    if (!password) {
      setError((prev) => ({
        ...prev,
        password: "Password is required",
      }));
      toast.error("Password is required");
      isValid = false;
    }

    // Proceed with login if validation passes
    if (isValid) {
      setLoading(true);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_API_KEY}/api/login`, // Using the environment variable
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email.trim(),
              password: password.trim(),
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Login failed");
        }

        const data = await response.json();
        const { access_token } = data;
        // console.log("login");

        // Save token to session storage
        Cookies.set("accessToken", access_token, {
          expires: 0.0208333, // 30 menit dalam hari
          secure: true,
        });
        // Periksa cookie
        console.log(Cookies.get("accessToken")); // Akan menampilkan nilai token jika belum expired

        // Setelah 30 menit
        setTimeout(() => {
          console.log(Cookies.get("accessToken")); // Akan menampilkan undefined karena cookie sudah expired
        }, 30 * 60 * 1000); // 30 menit dalam milidetik
        // Decode token to get user role
        if (access_token) {
          const decodedToken = jwtDecode(access_token);
          console.log("Decoded Token:", decodedToken); // Tambahkan log ini
          const userRole = decodedToken.role_id;
          console.log(`User Role: ${userRole}`); // Tambahkan log untuk userRole

          // Pastikan userRole di-handle dengan benar
          switch (userRole) {
            case 1:
              router("/admin/dashboard");
              break;
            case 2:
              router("/user/dashboard");
              break;
            default:
              toast.error("Akun Anda Diblokir!");
          }
        }

        toast.success("Login successful");
      } catch (error) {
        console.error("Login failed:", error);
        toast.error(`Login failed: ${error.message}`);
        setError((prev) => ({
          ...prev,
          email: error.message,
        }));
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-white flex justify-center items-center min-h-screen overflow-hidden gap-x-10">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={"light"}
        transition:Bounce
      />

      <div className="w-full">
        <img
          src={Wave}
          alt="login illustration"
          className="w-[660px] py-10 pl-20 min-h-screen object-cover"
        />
      </div>

      <div className="w-full flex flex-col justify-center items-center px-28">
        <h1 className="text-3xl font-bold mb-14">Masuk Akun</h1>

        <form className="w-full space-y-5" onSubmit={handleLogin}>
          <TextInput
            type="email"
            label="Email"
            id="email"
            placeholder="Masukkan alamat email kamu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error.email}
            required
          />

          <TextInput
            type="password"
            label="Kata Sandi"
            id="password"
            placeholder="Masukkan kata sandi kamu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error.password}
            required
          />

          <a
            href="/lupa-kata-sandi"
            className="flex justify-end my-5 font-bold"
          >
            Lupa kata sandi?
          </a>

          <Button
            label={loading ? "Loading..." : "Masuk Akun"}
            variant="primary"
            size="full"
            type="submit"
            disabled={loading}
          />

          <div className="flex justify-center items-center gap-x-5 my-5">
            <hr className="w-full" />
            <p>Atau</p>
            <hr className="w-full" />
          </div>

          <div className="flex justify-center gap-x-1 mt-5">
            Belum Punya Akun?
            <a href="/daftar-akun" className="text-primary-500 font-bold">
              Daftar Akun
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
