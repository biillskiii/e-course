import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import {
  Home,
  People,
  Monitor,
  MonitorRecorder,
  Wallet,
  Setting3,
  LogoutCurve,
  Teacher,
  Filter,
  SearchNormal1,
  Edit2,
  Edit,
  Trash,
} from "iconsax-react";
import NavbarDashboard from "../../components/NavbarDashboard";
import TextInput from "../../components/InputForm";

const TambahMentor = () => {
  const [userProfile, setUserProfile] = useState({
    username: "",
    avatar: "",
  });
  const [editProfileData, setEditProfileData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  //   useEffect(() => {
  //     if (!token) {
  //       navigate("/masuk");
  //       return;
  //     }

  //     try {
  //       const decodedToken = jwtDecode(token);

  //       if (decodedToken.role_id != 1) {
  //         navigate("/masuk");
  //         return;
  //       }

  //       setUserProfile({
  //         username: decodedToken.name || "Admin",
  //         avatar:
  //           decodedToken.avatar ||
  //           "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png",
  //       });
  //     } catch (error) {
  //       console.error("Error decoding token:", error);
  //       navigate("/masuk");
  //     }
  //   }, [navigate]);
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
  const handleNavigation = (path) => {
    navigate(path);
  };
  const handleLogout = () => {
    Cookies.remove("accessToken");
    navigate("/masuk");
  };
  const EditProfile = () => {
    const [editProfileData, setEditProfileData] = useState({
      name: "",
      work: "",
      company: "",
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      // Lakukan sesuatu dengan `editProfileData` dan `profileImage`
      console.log(editProfileData, profileImage);
    };

    return true;
  };

  return (
    <div className="flex">
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

      {/* Main Content */}
      <div className="flex-1 pl-60">
        <NavbarDashboard
          avatar={userProfile.avatar}
          username={userProfile.username}
        />

        {/* Header Section */}
        <div className="flex flex-col p-6">
          <h1 className="text-2xl font-semibold"> Tambah Mentor</h1>
          <div className="flex">
            <div className="flex p-6 ">
              <img
                src={profileImage}
                alt="User Profile"
                className="w-[312px] h-[312px] rounded-full object-cover"
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
                className="absolute bg-white rounded-full p-1 text-primary-500 mt-60 ml-60"
              />
            </div>
            <div className="w-full p-6 space-y-6">
              <TextInput
                label="ID"
                value={editProfileData.id}
                onChange={(e) =>
                  setEditProfileData({
                    ...editProfileData,
                    name: e.target.value,
                  })
                }
                placeholder={"ID Mentor"}
              />
              <TextInput
                label="Nama Lengkap"
                value={editProfileData.name}
                onChange={(e) =>
                  setEditProfileData({
                    ...editProfileData,
                    name: e.target.value,
                  })
                }
                placeholder={"Masukkan Nama Lengkap"}
              />
              <TextInput
                label="Pekerjaan"
                value={editProfileData.work}
                onChange={(e) =>
                  setEditProfileData({
                    ...editProfileData,
                    name: e.target.value,
                  })
                }
                placeholder={"Masukkan Pekerjaan"}
              />
              <TextInput
                label="Perusahaan"
                value={editProfileData.company}
                onChange={(e) =>
                  setEditProfileData({
                    ...editProfileData,
                    name: e.target.value,
                  })
                }
                placeholder={"Masukkan Perusahaan"}
              />
              <div className="flex justify-end">
                <Button label="Simpan" size="small" />
              </div>
            </div>
          </div>

          <div></div>
        </div>
      </div>
    </div>
  );
};

export default TambahMentor;
