import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Button from "../../components/Button";
import NavbarDashboard from "../../components/NavbarDashboard";
import TextInput from "../../components/InputForm";
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
  Cup,
} from "iconsax-react";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
const Pengaturan = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("editProfil");
  const [profileData, setProfileData] = useState(null);
  const [editProfileData, setEditProfileData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [userData, setUserData] = useState([]);
  const [passwordData, setPasswordData] = useState({
    old_password: "",
    new_password: "",
    new_password_confirmation: "",
  });
  const [isProfileIncomplete, setIsProfileIncomplete] = useState(false);
  const handleNavigation = (path) => {
    navigate(path);
  };

  const token = Cookies.get("accessToken");
  const validateForm = () => {
    const requiredFields = [
      { key: "name", label: "Nama Lengkap" },
      { key: "email", label: "Email" },
      { key: "phone_number", label: "Nomor Telepon" },
      { key: "address", label: "Kota/Kabupaten Domisili" },
      { key: "place_of_birth", label: "Tempat Lahir" },
      { key: "date_of_birth", label: "Tanggal Lahir" },
      { key: "last_education", label: "Pendidikan Terakhir" },
      { key: "work", label: "Pekerjaan/Kesibukan" },
    ];

    for (const field of requiredFields) {
      if (
        !editProfileData[field.key] ||
        editProfileData[field.key].trim() === ""
      ) {
        toast.error(`${field.label} tidak boleh kosong!`);
        return false;
      }
    }

    return true;
  };

  useEffect(() => {
    if (!token) {
      navigate("/masuk");
      return;
    }
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_API_KEY}/api/user`, // Endpoint API
          {
            headers: {
              application: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();
        setProfileData(result.user);
        setEditProfileData({
          name: result.user.name || "",
          email: result.user.email || "",
          phone_number: result.user.phone_number || "",
          address: result.user.address || "",
          place_of_birth: result.user.place_of_birth || "",
          date_of_birth: result.user.date_of_birth || "",
          last_education: result.user.last_education || "",
          work: result.user.work || "",
        });
        setProfileImage(
          result.user.path_photo ||
            "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png"
        );
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    // Fetch user data to check if the profile is complete
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_API_KEY}/api/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setUserData(data.user);

        const requiredFields = [
          "phone_number",
          "place_of_birth",
          "date_of_birth",
          "address",
          "last_education",
          "work",
        ];

        const incomplete = requiredFields.some(
          (field) => data.user[field] === null || data.user[field] === ""
        );

        setIsProfileIncomplete(incomplete);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsProfileIncomplete(true);
      }
    };

    fetchUserData();
    fetchProfileData();
  }, [navigate]);

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
  const handleUpdateProfile = async (e) => {
    e.preventDefault();


    if (!validateForm()) {
      return;
    }

    try {
      const formData = new FormData();
      Object.keys(editProfileData).forEach((key) => {
        formData.append(key, editProfileData[key]);
      });

      const imageInput = document.getElementById("profileImageUpload");
      if (imageInput && imageInput.files[0]) {
        formData.append("user_photo", imageInput.files[0]);
      }

      formData.append("_method", "put");

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API_KEY}/api/user`,
        {
          method: "POST", 
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        toast.success("Profil berhasil diperbarui!");
        window.location.reload();
      } else {
        toast.error("Gagal memperbarui profil.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Terjadi kesalahan saat memperbarui profil.");
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.new_password !== passwordData.new_password_confirmation) {
      toast.error("Konfirmasi kata sandi tidak cocok!");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API_KEY}/api/updatePassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(passwordData),
        }
      );

      if (response.ok) {
        toast.success("Kata sandi berhasil diperbarui!");
        setPasswordData({
          old_password: "",
          new_password: "",
          new_password_confirmation: "",
        });
      } else {
        const result = await response.json();
        toast.error(result.message || "Gagal memperbarui kata sandi.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Terjadi kesalahan saat memperbarui kata sandi.");
    }
  };

  const handlePasswordChange = (e) => {
    const { id, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [id]: value }));
  };

  const handleLogout = () => {
    Cookies.remove("accessToken");
    navigate("/masuk");
  };

  return (
    <section>
      <div>
        <ToastContainer />
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
              onClick={() => handleNavigation("/user/pengaturan")}
            />
            <Button
              label="Sertifikat"
              variant="side-primary"
              leftIcon={<Cup />}
              size="very-big"
              onClick={() => handleNavigation("/user/sertifikat")}
            />
          </div>
          <div className="mt-20">
            <Button
              label="Keluar"
              variant="side-danger"
              leftIcon={<LogoutCurve />}
              size="very-big"
              onClick={handleLogout}
            />
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="w-full pl-60">
        <NavbarDashboard
          avatar={profileImage}
          username={profileData?.name}
          isLoading={true}
        />
           
        <div className="w-full flex flex-col p-10">
          <div>
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
                    activeTab === "ubahKataSandi" ? "submenu-active" : "submenu"
                  }
                  size="big"
                  leftIcon={<Key className="font-primary-500" />}
                  onClick={() => setActiveTab("ubahKataSandi")}
                />
              </div>
              <div className="flex w-full">
                <div className="flex flex-col w-full border-2 p-6 rounded-2xl border-primary-500 border-opacity-20 space-y-6">
                  {activeTab === "editProfil" && (
                    <>
                      <div className="flex items-center justify-center">
                        <img
                          src={profileImage}
                          alt="User Profile"
                          className="w-40 h-40 rounded-full object-cover"
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
                        type="text"
                        label="Nama Lengkap"
                        id="name"
                        value={editProfileData.name || ""}
                        onChange={(e) =>
                          setEditProfileData({
                            ...editProfileData,
                            name: e.target.value,
                          })
                        }
                        placeholder="Masukkan nama lengkap kamu"
                      />
                      <TextInput
                        type="email"
                        label="Email"
                        id="email"
                        value={editProfileData.email || ""}
                        onChange={(e) =>
                          setEditProfileData({
                            ...editProfileData,
                            email: e.target.value,
                          })
                        }
                        placeholder="Masukkan alamat Email kamu"
                      />
                      <TextInput
                        type="text"
                        label="Nomor Telepon"
                        id="phone_number"
                        value={editProfileData.phone_number || ""}
                        onChange={(e) =>
                          setEditProfileData({
                            ...editProfileData,
                            phone_number: e.target.value,
                          })
                        }
                        placeholder="Masukkan nomor telepon kamu"
                      />
                      <TextInput
                        type="text"
                        label="Tempat Lahir"
                        id="place_of_birth"
                        value={editProfileData.place_of_birth || ""}
                        onChange={(e) =>
                          setEditProfileData({
                            ...editProfileData,
                            place_of_birth: e.target.value,
                          })
                        }
                        placeholder="Masukkan tempat lahir kamu"
                      />
                      <TextInput
                        type="date"
                        label="Tanggal Lahir"
                        id="date_of_birth"
                        value={editProfileData.date_of_birth || ""}
                        onChange={(e) =>
                          setEditProfileData({
                            ...editProfileData,
                            date_of_birth: e.target.value,
                          })
                        }
                        placeholder="Masukkan Tanggal Lahir kamu"
                      />
                      <TextInput
                        type="text"
                        label="Kota/Kabupaten Domisili"
                        id="place_of_birth"
                        value={editProfileData.address || ""}
                        onChange={(e) =>
                          setEditProfileData({
                            ...editProfileData,
                            address: e.target.value,
                          })
                        }
                        placeholder="Masukkan kota/kabupaten domisili kamu"
                      />
                      <TextInput
                        type="text"
                        label="Pendidikan Terakhir"
                        id="last_education"
                        value={editProfileData.last_education || ""}
                        onChange={(e) =>
                          setEditProfileData({
                            ...editProfileData,
                            last_education: e.target.value,
                          })
                        }
                        placeholder="Masukkan jenjang pendidikan terakhir kamu"
                      />
                      <TextInput
                        type="text"
                        label="Pekerjaan/Kesibukan"
                        id="work"
                        value={editProfileData.work || ""}
                        onChange={(e) =>
                          setEditProfileData({
                            ...editProfileData,
                            work: e.target.value,
                          })
                        }
                        placeholder="Masukkan pekerjaan/kesibukan kamu"
                      />
                      <div className="flex justify-end">
                        <Button
                          label="Simpan"
                          size="small"
                          onClick={handleUpdateProfile}
                        />
                      </div>
                    </>
                  )}
                  {activeTab === "ubahKataSandi" && (
                    <>
                      {/* Konten untuk Ubah Kata Sandi */}
                      <TextInput
                        type={"password"}
                        label={"Kata Sandi Lama"}
                        id={"old_password"}
                        placeholder={"Masukkan kata sandi lama kamu"}
                        value={passwordData.old_password}
                        onChange={handlePasswordChange}
                      />
                      <TextInput
                        type={"password"}
                        label={"Kata Sandi Baru"}
                        id={"new_password"}
                        placeholder={"Masukkan kata sandi baru kamu"}
                        value={passwordData.new_password}
                        onChange={handlePasswordChange}
                      />
                      <TextInput
                        type={"password"}
                        label={"Konfirmasi Kata Sandi Baru"}
                        id={"new_password_confirmation"}
                        placeholder={"Konfirmasi kata sandi baru kamu"}
                        value={passwordData.new_password_confirmation}
                        onChange={handlePasswordChange}
                      />
                      <div className="flex justify-end">
                        <Button
                          label={"Simpan"}
                          size="small"
                          onClick={handleChangePassword}
                        />
                               
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
