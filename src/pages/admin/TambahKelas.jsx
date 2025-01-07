import React, { useState, useEffect } from "react";
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
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
const TambahKelas = () => {
  const [accordions, setAccordions] = useState([]);
  const [openAccordionId, setOpenAccordionId] = useState(null);
  const [image, setImage] = useState(null);
  const [userData, setUserData] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    class_name: "",
    description: "",
    level: "pemula",
    price: "",
    price_discount: "",
    final_price: "",
    premium: true,
    mentor_id: "",
    category_id: "",
  });
  const [categories, setCategories] = useState([]);
  const [mentors, setMentors] = useState([]);
  const navigate = useNavigate();
  const token = Cookies.get("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        navigate("/masuk");
        return;
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      try {
        const categoriesRes = await axios.get(
          "https://be-course.serpihantech.com/api/categories",
          config
        );
        const mentorsRes = await axios.get(
          "https://be-course.serpihantech.com/api/mentors",
          config
        );

        setCategories(categoriesRes.data?.data || []);
        setMentors(mentorsRes.data?.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response?.status === 401) {
          navigate("/masuk");
        }
      }
    };
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
        setImage(
          "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png"
        );
        setProfileImage(
          "https://be-course.serpihantech.com/storage/Gambar.png"
        );
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
    fetchData();
  }, [token, navigate]);

  const addAccordion = () => {
    setAccordions([
      ...accordions,
      {
        id: accordions.length + 1,
        title: "",
        subMateri: [{ sub: "", media: "", desc: "lorem" }],
      },
    ]);
  };

  useEffect(() => {
    if (formData.price && formData.final_price) {
      const originalPrice = parseFloat(formData.price);
      const finalPrice = parseFloat(formData.final_price);

      if (!isNaN(originalPrice) && !isNaN(finalPrice) && originalPrice > 0) {
        const discountPercentage =
          ((originalPrice - finalPrice) / originalPrice) * 100;

        setFormData((prev) => ({
          ...prev,
          price_discount: discountPercentage.toFixed(0),
        }));
      }
    }
  }, [formData.price, formData.final_price]);

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
    Cookies.remove("accessToken");
    navigate("/masuk");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "price" || name === "final_price") {
      const numericValue = value.replace(/\D/g, "");

      if (name === "final_price" && formData.price) {
        const originalPrice = parseInt(formData.price);
        const finalPrice = parseInt(numericValue) || 0;
        if (finalPrice > originalPrice) {
          return;
        }
      }

      setFormData((prevData) => ({
        ...prevData,
        [name]: numericValue,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const courseFormData = new FormData(); // Create a new FormData instance
      courseFormData.append("class_name", formData.class_name);
      courseFormData.append("description", formData.description);
      courseFormData.append("level", formData.level);
      courseFormData.append("price", parseInt(formData.price) || 0);
      courseFormData.append(
        "price_discount",
        formData.price_discount ? parseInt(formData.price_discount) : null
      );
      courseFormData.append("premium", formData.premium ? 1 : 0);
      courseFormData.append("final_price", parseInt(formData.final_price) || 0);
      courseFormData.append("mentor_id", formData.mentor_id);
      courseFormData.append("category_id", formData.category_id);

      // Add profile photo if selected
      const imageInput = document.getElementById("profileImageUpload");
      if (imageInput && imageInput.files[0]) {
        courseFormData.append("course_photo", imageInput.files[0]); // Use the correct variable
      }

      const courseResponse = await axios.post(
        `https://be-course.serpihantech.com/api/courses`,
        courseFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const courseId = courseResponse.data.data.id;

      if (!courseId) {
        throw new Error("Course ID is not valid.");
      }

      for (let i = 0; i < accordions.length; i++) {
        const accordion = accordions[i];

        // Prepare the payload for creating a chapter
        const chapterData = {
          chapter_name: accordion.title,
          course_id: courseId,
        };

        // Make the API call to create the chapter
        const chapterResponse = await axios.post(
          `https://be-course.serpihantech.com/api/chapters`,
          chapterData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const chapterId = chapterResponse.data.data.id;

        // Submit videos for each chapter
        for (const [index, subMateri] of accordion.subMateri.entries()) {
          const videoData = new FormData();
          videoData.append("video_title", subMateri.sub);
          videoData.append("video_description", subMateri.desc);
          videoData.append("video_number", index + 1);
          videoData.append("video_url", subMateri.media);
          videoData.append("chapter_id", chapterId);

          await axios.post(
            `https://be-course.serpihantech.com/api/videos`,
            videoData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
        }
      }
      toast.success("data berhasil ditambahkan");
      navigate("/admin/kelas");
    } catch (error) {
      console.error("Error submitting data:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        toast.error(
          `Error: ${
            error.response.data.message ||
            "Terjadi kesalahan saat menyimpan data"
          }`
        );
      } else {
        toast.error("Terjadi kesalahan saat menyimpan data");
      }
    }
  };
  return (
    <section>
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
      <div className="flex-1 pl-60">
        <NavbarDashboard avatar={image} username={userData?.name} />
        <div className="flex flex-col space-y-4 p-6">
          <h1 className="text-2xl font-semibold"> Tambah Kelas</h1>
          <p className="text-lg font-semibold">Sampul Kelas</p>
          <div className="flex items-center justify-center">
            <img
              src={profileImage}
              alt="User  Profile"
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
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-full focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Pilih Kategori</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.category_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full">
                <label className="block mb-2">Nama Kelas</label>
                <input
                  type="text"
                  name="class_name"
                  value={formData.class_name}
                  onChange={handleInputChange}
                  placeholder="Masukkan Nama Kelas"
                  className="w-full p-2 border rounded-full focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div className="mt-4">
                <label className="block mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary ```javascript
                  focus:border-transparent"
                  rows="4"
                />
              </div>
              <div className="w-full">
                <label className="w-full block mb-4">Level</label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  className="w-full p-2 items-center border rounded-full focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="pemula">Pemula</option>
                  <option value="menengah">Menengah</option>
                  <option value="ahli">Ahli</option>
                </select>
              </div>
              <div className="w-full">
                <label className="block mb-2">Harga Normal</label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Masukkan Harga Normal"
                  className="w-full p-2 border rounded-full focus:ring-2 focus:ring-primary-500"
                />
                {formData.price && (
                  <span className="text-sm text-gray-500">
                    Rp {parseInt(formData.price).toLocaleString("id-ID")}
                  </span>
                )}
              </div>
              <div className="w-full">
                <label className="block mb-2">Harga Setelah Diskon</label>
                <input
                  type="text"
                  name="final_price"
                  value={formData.final_price}
                  onChange={handleInputChange}
                  placeholder="Masukkan Harga Setelah Diskon"
                  className="w-full p-2 border rounded-full focus:ring-2 focus:ring-primary-500"
                />
                {formData.final_price && (
                  <span className="text-sm text-gray-500">
                    Rp {parseInt(formData.final_price).toLocaleString("id-ID")}
                  </span>
                )}
              </div>
              <div className="w-full">
                <label className="block mb-2">Persentase Diskon</label>
                <input
                  type="text"
                  name="price_discount"
                  value={formData.price_discount}
                  readOnly
                  className="w-full p-2 border rounded-full bg-gray-50 focus:ring-2 focus:ring-primary-500"
                />
                {formData.price_discount && (
                  <span className="text-sm text-gray-500">
                    {formData.price_discount}%
                  </span>
                )}
              </div>
              <div className="w-full">
                <label className="w-full block mb-4">Mentor</label>
                <select
                  name="mentor_id"
                  value={formData.mentor_id}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-full focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Pilih Mentor</option>
                  {mentors.map((mentor) => (
                    <option key={mentor.id} value={mentor.id}>
                      {mentor.name}
                    </option>
                  ))}
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
                              <div className="w-full space-y-2">
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
