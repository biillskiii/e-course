import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Button from "../../components/Button";
import NavbarDashboard from "../../components/NavbarDashboard";
import TextInput from "../../components/InputForm";
import {
  Home,
  People,
  Monitor,
  MonitorRecorder,
  Wallet,
  Edit,
  LogoutCurve,
  Teacher,
} from "iconsax-react";

import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
const Pengaturan = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("editProfil");
  const [profileData, setProfileData] = useState(null);
  const [editProfileData, setEditProfileData] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [profileMentor, setProfileMentor] = useState(null);
  const [userData, setUserData] = useState(null);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const token = Cookies.get("accessToken");
  const requiredFields = [
    { key: "name", label: "Nama Lengkap" },
    { key: "specialist", label: "Pekerjaan" },
  ];
  const validateForm = () => {
    const requiredFields = [
      { key: "name", label: "Nama Lengkap" },
      { key: "specialist", label: "Pekerjaan" },
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
        setProfileImage(
          "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png"
        );
        setProfileMentor(
          "https://be-course.serpihantech.com/storage/1.png"
        );
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [navigate, token]);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileMentor(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    // Validate form before proceeding
    if (!validateForm()) {
      return;
    }

    try {
      // Create FormData object
      const formData = new FormData();

      // Add the fields exactly as shown in the image
      formData.append("name", editProfileData.name || "");
      formData.append("specialist", editProfileData.specialist || "");

      // Add profile photo if selected
      const imageInput = document.getElementById("profileImageUpload");
      if (imageInput && imageInput.files[0]) {
        formData.append("mentor_photo", imageInput.files[0]);
      }

      // Send request to the correct endpoint without _method
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API_KEY}/api/mentors`,
        {
          method: "POST", // Changed to POST as shown in the image
          headers: {
            Authorization: `Bearer ${token}`,
            // Remove Content-Type header to let browser set it with boundary for FormData
          },
          body: formData,
        }
      );

      if (response.ok) {
        toast.success("Profil berhasil diperbarui!");
        window.location.reload();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Gagal memperbarui profil.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Terjadi kesalahan saat memperbarui profil.");
    }
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
              onClick={() => handleNavigation("/admin/dashboard")}
            />
            <Button
              label="Kelas"
              variant="side-primary"
              leftIcon={<Monitor />}
              size="very-big"
              onClick={() => handleNavigation("/admin/kelas")}
            />
            <Button
              label="Webinar"
              variant="disable"
              leftIcon={<MonitorRecorder />}
              size="very-big"
              onClick={() => handleNavigation("/admin/webinar")}
            />
            <Button
              label="Mentee"
              variant="side-primary"
              leftIcon={<People />}
              size="very-big"
              onClick={() => handleNavigation("/admin/mentee")}
            />
            <Button
              label="Mentor"
              active={true}
              variant="side-primary"
              leftIcon={<Teacher />}
              size="very-big"
              onClick={() => handleNavigation("/admin/mentor")}
            />
            <Button
              label="Daftar Transaksi"
              variant="side-primary"
              leftIcon={<Wallet />}
              size="very-big"
              onClick={() => handleNavigation("/admin/daftar-transaksi")}
            />
          </div>
          <Button
            label="Keluar"
            variant="side-danger"
            leftIcon={<LogoutCurve />}
            size="very-big"
            onClick={handleLogout}
          />
        </div>
      </div>
      {/* Main Content */}
      <div className="w-full pl-60">
        <NavbarDashboard
          avatar={profileImage}
          username={userData?.name}
          isLoading={true}
        />
           
        <div className="w-full flex flex-col p-10">
          <div>
            <div className="flex w-full">
              <div className="flex w-full">
                <div className="flex flex-col w-full border-2 p-6 rounded-2xl border-primary-500 border-opacity-20 space-y-6">
                  <div className="flex items-center justify-center">
                    <img
                      src={profileMentor}
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
                        document.getElementById("profileImageUpload").click()
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
                    placeholder="Masukkan Nama Mentor"
                  />

                  <TextInput
                    type="text"
                    label="Pekerjeaan"
                    id="specialist"
                    value={editProfileData.specialist || ""}
                    onChange={(e) =>
                      setEditProfileData({
                        ...editProfileData,
                        specialist: e.target.value,
                      })
                    }
                    placeholder="Masukkan Pekerjaanmu"
                  />

                  <div className="flex justify-end">
                    <Button
                      label="Simpan"
                      size="small"
                      onClick={handleUpdateProfile}
                    />
                  </div>
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
