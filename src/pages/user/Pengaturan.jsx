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
} from "iconsax-react";

const Pengaturan = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("editProfil");
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
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
      fetchProfileData(decodedToken.id, token); // Pass the token here
    } catch (error) {
      console.error("Error decoding token:", error);
      navigate("/masuk");
    }
  }, [navigate]);
  const fetchProfileData = async (userId, token) => {
    // Accept token as a parameter
    try {
      const response = await fetch(
        `${import.meta.env.VITE_LOCAL_API_KEY}/api/user/`, // Use userId in the API endpoint
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );
      const result = await response.json();
      console.log(response);
      setProfileData(result.user); // setProfileImage(data.path_photo || "default-avatar-url");
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
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
  const handleUpdateProfile = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_LOCAL_API_KEY}/api/user/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(profileData),
        }
      );
      if (response.ok) {
        alert("Profil berhasil diperbarui!");
      } else {
        alert("Gagal memperbarui profil.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

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
      </div>
      {/* Main Content */}
      <div className="w-full pl-60">
        <NavbarDashboard avatar={profileImage} username={profileData.name} />   
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
                        value={profileData.name || ""}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            name: e.target.value,
                          })
                        }
                        placeholder="Masukkan nama lengkap kamu"
                      />
                      <TextInput
                        type="email"
                        label="Email"
                        id="email"
                        value={profileData.email || ""}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            email: e.target.value,
                          })
                        }
                        placeholder="Masukkan alamat Email kamu"
                      />
                      <TextInput
                        type="text"
                        label="Nomor Telepon"
                        id="phone_number"
                        value={profileData.phone_number || ""}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            phone_number: e.target.value,
                          })
                        }
                        placeholder="Masukkan nomor telepon kamu"
                      />
                      <TextInput
                        type="text"
                        label="Tempat Lahir"
                        id="place_of_birth"
                        value={profileData.place_of_birth || ""}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            place_of_birth: e.target.value,
                          })
                        }
                        placeholder="Masukkan tempat lahir kamu"
                      />
                      <TextInput
                        type="date"
                        label="Tanggal Lahir"
                        id="date_of_birth"
                        value={profileData.date_of_birth || ""}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            date_of_birth: e.target.value,
                          })
                        }
                        placeholder="Masukkan Tanggal Lahir kamu"
                      />
                      <TextInput
                        type="text"
                        label="Kota/Kabupaten Domisili"
                        id="place_of_birth"
                        value={profileData.address || ""}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            address: e.target.value,
                          })
                        }
                        placeholder="Masukkan kota/kabupaten domisili kamu"
                      />
                      <TextInput
                        type="text"
                        label="Pendidikan Terakhir"
                        id="last_education"
                        value={profileData.last_education || ""}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            last_education: e.target.value,
                          })
                        }
                        placeholder="Masukkan jenjang pendidikan terakhir kamu"
                      />
                      <TextInput
                        type="text"
                        label="Pekerjaan/Kesibukan"
                        id="work"
                        value={profileData.work || ""}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
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
