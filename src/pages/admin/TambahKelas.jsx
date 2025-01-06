import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
  Edit,
  Trash,
} from "iconsax-react";
import NavbarDashboard from "../../components/NavbarDashboard";
import TextInput from "../../components/InputForm";

const TambahKelas = () => {
  const [accordions, setAccordions] = useState([]);
  const [openAccordionId, setOpenAccordionId] = useState(null);
  const [userProfile, setUserProfile] = useState({
    username: "",
    avatar: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    category: "",
    className: "",
    description: "",
    modulCount: 1,
    duration: "",
    level: "",
    normalPrice: "",
    discountPrice: "",
    mentor: "",
  });
  const navigate = useNavigate();

  const addAccordion = () => {
    setAccordions([
      ...accordions,
      {
        id: accordions.length + 1,
        title: "",
        subMateri: [{ sub: "", media: "" }],
      },
    ]);
  };

  const handleTitleChange = (id, value) => {
    setAccordions(
      accordions.map((accordion) =>
        accordion.id === id ? { ...accordion, title: value } : accordion
      )
    );
  };

  const handleSubMateriChange = (accordionId, index, field, value) => {
    setAccordions(
      accordions.map((accordion) =>
        accordion.id === accordionId
          ? {
              ...accordion,
              subMateri: accordion.subMateri.map((item, idx) =>
                idx === index ? { ...item, [field]: value } : item
              ),
            }
          : accordion
      )
    );
  };

  const addSubMateri = (id) => {
    setAccordions(
      accordions.map((accordion) =>
        accordion.id === id
          ? {
              ...accordion,
              subMateri: [...accordion.subMateri, { sub: "", media: "" }],
            }
          : accordion
      )
    );
  };

  const removeSubMateri = (accordionId, index) => {
    setAccordions(
      accordions.map((accordion) =>
        accordion.id === accordionId
          ? {
              ...accordion,
              subMateri: accordion.subMateri.filter((_, idx) => idx !== index),
            }
          : accordion
      )
    );
  };

  const removeAccordion = (id) => {
    setAccordions(accordions.filter((accordion) => accordion.id !== id));
  };

  const toggleAccordion = (id) => {
    setOpenAccordionId(openAccordionId === id ? null : id);
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

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    // Assuming you're using a library like js-cookie to manage cookies
    Cookies.remove("accessToken");
    navigate("/masuk");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Submit course
      const courseResponse = await axios.post(
        "https://be-course.serpihantech.com/api/courses",
        {
          name: formData.className,
          description: formData.description,
          category: formData.category,
          duration: formData.duration,
          level: formData.level,
          normal_price: formData.normalPrice,
          discount_price: formData.discountPrice,
          mentor_id: formData.mentor,
          image: profileImage, // Assuming the API accepts base64 image data
        }
      );

      const courseId = courseResponse.data.id;

      // Submit chapters and videos
      for (const accordion of accordions) {
        const chapterResponse = await axios.post(
          "https://be-course.serpihantech.com/api/chapters",
          {
            course_id: courseId,
            name: accordion.title,
          }
        );

        const chapterId = chapterResponse.data.id;

        for (const subMateri of accordion.subMateri) {
          await axios.post("https://be-course.serpihantech.com/api/videos", {
            chapter_id: chapterId,
            title: subMateri.sub,
            url: subMateri.media,
          });
        }
      }

      // Redirect or show success message
      navigate("/admin/kelas");
    } catch (error) {
      console.error("Error submitting data:", error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <section>
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
            active={true}
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
        <div className="flex-flex-col space-y-4 p-6">
          <h1 className="text-2xl font-semibold"> Tambah Kelas</h1>
          <p className="text-lg font-semibold">Sampul Kelas</p>
          <div className="flex items-center justify-center">
            <img
              src={profileImage}
              alt="User Profile"
              className="w-[320px] h-[180px] item rounded-lg object-cover bg-violet-200"
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
              className="absolute bg-white rounded-full p-1 text-primary-500 mt-28 ml-64 cursor-pointer"
            />
          </div>

          <div className="flex">
            <div className="w-full p-6 space-y-4">
              <p className="text-lg font-semibold">Informasi Kelas</p>
              <div>
                <label className="block mb-2">Kategori</label>
                <select
                  id="category"
                  className="w-full p-2 border rounded-full focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="UI/UX">UI/UX</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                </select>
              </div>
              <TextInput label="Nama Kelas" placeholder="Masukkan Nama Kelas" />
              <div className="mt-4">
                <label className="block mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows="4"
                />
              </div>
              <div className="flex w-full gap-4">
                <div className="w-full">
                  <label className="w-full block mb-4">Jumlah Modul</label>
                  <select
                    id="modul"
                    className="w-full p-2 border rounded-full focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
                <TextInput label={"Durasi Kelas"} placeholder={"Durasi"} />
                <div className="w-full">
                  <label className="w-full block mb-4">Kategori</label>
                  <select
                    id="category"
                    className="w-full p-2 items-center border rounded-full focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="pemula">Pemula</option>
                    <option value="menengah">Menengah</option>
                    <option value="ahli">Ahli</option>
                  </select>
                </div>
              </div>
              <TextInput label={"Harga Normal"} placeholder={"Harga Normal"} />
              <TextInput label={"Harga Diskon"} placeholder={"Harga Diskon"} />
              <div className="w-full">
                <label className="w-full block mb-4">Mentor</label>
                <select
                  id="mentor"
                  className="w-full p-2 border rounded-full focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="1">Sutejo</option>
                  <option value="2">Tejo</option>
                  <option value="3">Joko</option>
                </select>
              </div>
            </div>
            <div className="w-full p-6 space-y-4">
              <p className="text-lg font-semibold">Detail Kelas</p>
              <div className="w-full flex flex-col items-center py-5">
                <div className="w-full max-w-2xl space-y-4 mb-6">
                  {accordions.map((accordion) => (
                    <div
                      key={accordion.id}
                      className="border border-primary-100 rounded-3xl overflow-hidden"
                    >
                      {/* Header Accordion */}
                      <div
                        className="w-full flex justify-between items-center p-4 gap-2 cursor-pointer"
                        onClick={() => toggleAccordion(accordion.id)}
                      >
                        <input
                          type="text"
                          className="w-full border border-1 p-2 rounded-full focus:outline-none"
                          placeholder="Judul Materi"
                          value={accordion.title}
                          onChange={(e) =>
                            handleTitleChange(accordion.id, e.target.value)
                          }
                        />
                        <Trash
                          color="red"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeAccordion(accordion.id);
                          }}
                        />
                        <span
                          className={`ml-4 transform transition-transform duration-300 ${
                            openAccordionId === accordion.id
                              ? "rotate-180"
                              : "rotate-0"
                          }`}
                        >
                          ▼
                        </span>
                      </div>

                      {/* Konten Accordion */}
                      <div
                        className={`transition-all duration-300 overflow-hidden ${
                          openAccordionId === accordion.id
                            ? "max-h-screen"
                            : "max-h-0"
                        }`}
                      >
                        <div className="w-full p-4 bg-white space-y-4">
                          {accordion.subMateri.map((item, index) => (
                            <div
                              key={index}
                              className="w-full grid grid-cols-3 gap-4 items-center"
                            >
                              <div className="w-full space-y-2  ">
                                <label className="block text-sm font-medium text-gray-700">
                                  Sub Materi
                                </label>
                                <input
                                  type="text"
                                  className="w-full border rounded-full p-2"
                                  placeholder="Sub Materi"
                                  value={item.sub}
                                  onChange={(e) =>
                                    handleSubMateriChange(
                                      accordion.id,
                                      index,
                                      "sub",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700">
                                  Media
                                </label>
                                <input
                                  type="text"
                                  className="w-full border rounded-full p-2"
                                  placeholder="Link Media"
                                  value={item.media}
                                  onChange={(e) =>
                                    handleSubMateriChange(
                                      accordion.id,
                                      index,
                                      "media",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <Trash
                                className="items-center"
                                color="red"
                                onClick={() =>
                                  removeSubMateri(accordion.id, index)
                                }
                              />
                            </div>
                          ))}
                          <Button
                            label={"Tambah Sub Materi"}
                            variant="secondary"
                            onClick={() => addSubMateri(accordion.id)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button
                    label={"Tambah Materi"}
                    variant="secondary"
                    onClick={addAccordion}
                  />
                </div>
              </div>
            </div>
          </div>
          <Button size="small" label={"Simpan"} onClick={handleSubmit} />
        </div>
      </div>
    </section>
  );
};

export default TambahKelas;
