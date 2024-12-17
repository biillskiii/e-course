import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { courseData, userData } from "../../data";
import Label from "../../components/Label";
import {
  Copy,
  Home,
  Monitor,
  Ticket,
  Wallet,
  Category,
  LogoutCurve,
  UserEdit,
  Key,
  Edit,
} from "iconsax-react";
import Button from "../../components/Button";
import NavbarDashboard from "../../components/NavbarDashboard";
import TextInput from "../../components/InputForm";
import { jwtDecode } from "jwt-decode";

const Pengaturan = () => {
  const navigate = useNavigate();
  const [kelasStatus, setKelasStatus] = useState("Dalam Progress");
  const [profileImage, setProfileImage] = useState(userData.avatar);
  const [activeTab, setActiveTab] = useState("editProfil"); // State untuk tombol aktif
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleClasses, setVisibleClasses] = useState([]);
  const [userProfile, setUserProfile] = useState("");

  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      navigate("/masuk");
      return;
    }
    try {
      const decodedToken = jwtDecode(token);
      setUserProfile({
        username: decodedToken.name || "",
        avatar:
          decodedToken.avatar ||
          "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png",
      });
    } catch (error) {
      console.error("Error decoding token:", error);
      navigate("/masuk");
    }
  }, [navigate]);

  const fetchClasses = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_LOCAL_API_KEY}/api/courses`
      );
      setIsLoading(false);
      const result = await response.json();
      setClasses(result.data);
      setVisibleClasses(result.data.slice(0, 4)); // Menampilkan hanya 6 card pertama
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchClasses();
  }, []);
  const handleCourses = () => {
    navigate("/user/kelas");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    navigate("/masuk");
  };
  return (
    <section>
      <div>
        {/* Sidebar */}
        <div className="w-60 fixed min-h-screen bg-white shadow-lg flex flex-col justify-between items-center p-5">
          <div className="space-y-6">
            <h1 className="mango text-center text-secondary-500 text-[40px] mb-10">
              PIXEL<span className="text-primary-500">CODE.</span>
            </h1>
            <Button
              label="Dashboard"
              variant="side-primary"
              leftIcon={<Home />}
              size="very-big"
              onClick={() => handleNavigation("/user/dashboard")}
            />
            <Button
              label="Kelas"
              variant="side-primary"
              leftIcon={<Monitor />}
              size="very-big"
              onClick={() => handleNavigation("/user/kelas")}
            />
            <Button
              label="Webinar"
              variant="disable"
              leftIcon={<Ticket />}
              size="very-big"
              onClick={() => handleNavigation("/user/webinar")}
            />
            <Button
              label="Daftar Transaksi"
              variant="side-primary"
              leftIcon={<Wallet />}
              size="very-big"
              onClick={() => handleNavigation("/user/daftar-transaksi")}
            />
            <Button
              label="Pengaturan"
              active={true}
              variant="side-primary"
              leftIcon={<Category />}
              size="very-big"
              onClick={handleLogout}
            />
          </div>
          <div className="mt-20">
            <Button
              label="Keluar"
              variant="side-danger"
              leftIcon={<LogoutCurve />}
              size="very-big"
              onClick={() => handleNavigation("/masuk")}
            />
          </div>
        </div>
        {/* Main Content */}
        <div className="w-full pl-60">
          <NavbarDashboard
            avatar={userData.avatar}
            username={userData.username}
          />
          <div className="w-full flex flex-col p-10">
            <div className="">
              <div className="mb-8">
                <h1 className="text-2xl font-bold">Pengaturan</h1>
              </div>
              <div className="flex w-full">
                <div className="flex flex-col border-2 w-[360px] h-[160px] p-4 mr-10 rounded-2xl border-primary-500 border-opacity-20 gap-6 justify-center">
                  <Button
                    label={"Edit Profil"}
                    variant={
                      activeTab === "editProfil" ? "submenu-active" : "submenu"
                    }
                    size="small"
                    leftIcon={<UserEdit className="font-primary-500" />}
                    onClick={() => setActiveTab("editProfil")}
                  />
                  <Button
                    label={"Ubah Kata Sandi"}
                    variant={
                      activeTab === "ubahKataSandi"
                        ? "submenu-active"
                        : "submenu"
                    }
                    size="big"
                    leftIcon={<Key className="font-primary-500" />}
                    onClick={() => setActiveTab("ubahKataSandi")}
                  />
                </div>
                <div className="flex flex-col w-full border-2 p-6 rounded-2xl border-primary-500 border-opacity-20 space-y-6">
                  {activeTab === "editProfil" && (
                    <>
                      {/* Konten untuk Edit Profil */}
                      <div className="flex items-center justify-center">
                        <img
                          src={profileImage}
                          alt="User Profile"
                          className="w-40  h-40 rounded-full object-cover"
                        />
                        <input
                          type="file"
                          id="profileImageUpload"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                        <Edit
                          size={33}
                          onClick={() =>
                            document
                              .getElementById("profileImageUpload")
                              .click()
                          }
                          className="absolute bg-white rounded-full p-1 text-primary-500 mt-32 ml-28"
                        />
                      </div>
                      <TextInput
                        type={"text"}
                        label={"Nama Lengkap"}
                        id={"name"}
                        placeholder={"Masukkan nama lengkap kamu"}
                      />
                      <TextInput
                        type={"email"}
                        label={"Email"}
                        id={"email"}
                        placeholder={"Masukkan alamat Email kamu"}
                      />
                      <TextInput
                        type={"tel"}
                        label={"Nomor Telepon"}
                        id={"number"}
                        placeholder={"Masukkan nomor telepon kamu"}
                      />
                      <div className="flex  w-full gap-4">
                        <TextInput
                          type={"text"}
                          label={"Tempat"}
                          id={"place"}
                          placeholder={"Masukkan tempat tinggal kamu"}
                        />
                        <TextInput
                          type={"date"}
                          label={"Tanggal Lahir"}
                          id={"dob"}
                          placeholder={"Masukkan tanggal lahir kamu"}
                        />
                      </div>
                      <TextInput
                        type={"text"}
                        label={"Kota/Kabupaten Domisili"}
                        id={"city"}
                        placeholder={"Masukkan kota/kabupaten domisili kamu"}
                      />
                      <TextInput
                        type={"text"}
                        label={"Pendidikan Terakhir"}
                        id={"study"}
                        placeholder={"Masukkan jenjang pendidikan terakhirmu"}
                      />
                      <TextInput
                        type={"text"}
                        label={"Pekerjaan/Kesibukan"}
                        id={"work"}
                        placeholder={
                          "Masukkan pekerjaan atau kesibukanmu saat ini"
                        }
                      />
                      <div className="flex justify-end">
                        <Button label={"Simpan"} size="small" />
                      </div>
                    </>
                  )}
                  {activeTab === "ubahKataSandi" && (
                    <>
                      {/* Konten untuk Ubah Kata Sandi */}
                      <TextInput
                        type={"password"}
                        label={"Kata Sandi Lama"}
                        id={"oldPassword"}
                        placeholder={"Masukkan kata sandi lama kamu"}
                      />
                      <TextInput
                        type={"password"}
                        label={"Kata Sandi Baru"}
                        id={"newPassword"}
                        placeholder={"Masukkan kata sandi baru kamu"}
                      />
                      <TextInput
                        type={"password"}
                        label={"Konfirmasi Kata Sandi Baru"}
                        id={"confirmPassword"}
                        placeholder={"Konfirmasi kata sandi baru kamu"}
                      />
                      <div className="flex justify-end">
                        <Button label={"Simpan"} size="small" />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pengaturan;
