import React, { useState, useEffect } from "react";
import {
  Home,
  People,
  Monitor,
  MonitorRecorder,
  Wallet,
  Setting3,
  LogoutCurve,
  Teacher,
  Trash,
  Add,
} from "iconsax-react";
import NavbarDashboard from "../../components/NavbarDashboard";
import { userData } from "../../data";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import axios from "axios";
import TextInput from "../../components/InputForm";

const EditKelas = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [mentors, setMentors] = useState([]);
  const [formData, setFormData] = useState({
    // course_code: "",
    name: "",
    level: "pemula",
    description: "",
    premium: 1,
    price: "",
    final_price: "",
    price_discount: "",
    course_photo: null,
    mentor_id: "",
    category_id: 1,
  });

  const [finalPrice, setFinalPrice] = useState("");
  const [courses, setCourses] = useState([]);
  const [chapters, setChapters] = useState([
    { chapter_name: "", course_id: "" },
  ]);
  const [videos, setVideos] = useState([
    {
      video_number: "",
      video_title: "",
      video_url: "",
      video_description: "",
      chapter_id: "",
    },
  ]);
  const [availableChapters, setAvailableChapters] = useState([]);
  useEffect(() => {
    const fetchMentors = async () => {
      const token = sessionStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_API_KEY}/api/mentors`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.data) {
          setMentors(response.data.data);
          if (response.data.data.length > 0) {
            setFormData((prev) => ({
              ...prev,
              mentor_id: response.data.data[0].id,
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching mentors:", error);
        setError("Failed to load mentors data");
      }
    };

    fetchMentors();
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    if (id === "price" || id === "final_price") {
      const originalPrice =
        id === "price" ? Number(value) : Number(formData.price);
      const discountedPrice =
        id === "final_price" ? Number(value) : Number(formData.final_price);

      if (
        !isNaN(originalPrice) &&
        !isNaN(discountedPrice) &&
        originalPrice > 0 &&
        discountedPrice > 0
      ) {
        // Hitung persentase diskon
        const discountPercentage =
          ((originalPrice - discountedPrice) / originalPrice) * 100;

        setFormData((prevData) => ({
          ...prevData,
          price_discount: discountPercentage.toFixed(0),
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          price_discount: "",
        }));
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      course_photo: file,
    }));
    setError(null);
  };

  const validateForm = () => {
    const requiredFields = [
      // "course_code",
      "name",
      "description",
      "price",
      "mentor_id",
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      setError(
        `Please fill in all required fields: ${missingFields.join(", ")}`
      );
      return false;
    }

    if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      setError("Please enter a valid price");
      return false;
    }

    if (
      formData.price_discount &&
      (isNaN(Number(formData.price_discount)) ||
        Number(formData.price_discount) > 100)
    ) {
      setError("Discount percentage must be between 0 and 100");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formDataToSend = new FormData();

      const mapData = {
        // course_code: formData.course_code,
        class_name: formData.name,
        level: formData.level,
        description: formData.description,
        price: formData.price,
        price_discount: formData.price_discount || null,
        final_price: formData.final_price,
        premium: formData.premium,
        mentor_id: formData.mentor_id,
        category_id: formData.category_id,
        course_photo: formData.course_photo,
      };
      const token = sessionStorage.getItem("accessToken");
      Object.keys(mapData).forEach((key) => {
        if (mapData[key] !== null) {
          formDataToSend.append(key, mapData[key]);
        }
      });

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_API_KEY}/api/courses`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          timeout: 10000,
        }
      );

      if (response.data.success) {
        setSuccess(true);
        // setTimeout(() => {
        //   navigate("/admin/kelas0");
        // }, 2000);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to save course");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    navigate("/masuk");
  };
  useEffect(() => {
    const fetchCourses = async () => {
      const token = sessionStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          "https://be-course.serpihantech.com/api/courses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.data) {
          setCourses(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleChapterChange = (index, field, value) => {
    const newChapters = [...chapters];
    newChapters[index][field] = value;
    setChapters(newChapters);
  };

  const handleVideoChange = (index, field, value) => {
    const newVideos = [...videos];
    newVideos[index][field] = value;
    setVideos(newVideos);
  };

  const addChapter = () => {
    setChapters([...chapters, { chapter_name: "", course_id: "" }]);
  };

  const addVideo = () => {
    setVideos([
      ...videos,
      {
        video_number: "",
        video_title: "",
        video_url: "",
        video_description: "",
        chapter_id: "",
      },
    ]);
  };

  const removeChapter = (index) => {
    const newChapters = chapters.filter((_, i) => i !== index);
    setChapters(newChapters);
  };

  const removeVideo = (index) => {
    const newVideos = videos.filter((_, i) => i !== index);
    setVideos(newVideos);
  };

  const handleSubmitChapters = async () => {
    const token = sessionStorage.getItem("accessToken");
    try {
      const promises = chapters.map((chapter) =>
        axios.post("https://be-course.serpihantech.com/api/chapters", chapter, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      );
      await Promise.all(promises);
      // Fetch updated chapters for video section
      const response = await axios.get(
        "https://be-course.serpihantech.com/api/chapters",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAvailableChapters(response.data.data);
      setSuccess(true);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to save chapters");
    }
  };

  const handleSubmitVideos = async () => {
    const token = sessionStorage.getItem("accessToken");
    try {
      const promises = videos.map((video) =>
        axios.post("https://be-course.serpihantech.com/api/videos", video, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      );
      await Promise.all(promises);
      setSuccess(true);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to save videos");
    }
  };
  return (
    <div className="min-h-screen flex">
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
            onClick={() => handleNavigation("/admin/transaksi")}
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

      <div className="w-full ml-60 flex-1">
        <NavbarDashboard
          avatar={userData.avatar}
          username={userData.username}
        />

        <div className="container mx-auto px-4 py-6">
          <div className="bg-white rounded-lg p-6">
            {error && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
                Course saved successfully!
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">
                  Mentor <span className="text-red-500">*</span>
                </label>
                <select
                  id="mentor_id"
                  value={formData.mentor_id}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  disabled={isLoading}
                >
                  <option value="">Select Mentor</option>
                  {mentors.map((mentor) => (
                    <option key={mentor.id} value={mentor.id}>
                      {mentor.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <TextInput
                  label="Name"
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block mb-2">Level</label>
                <select
                  id="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  disabled={isLoading}
                >
                  <option value="pemula">Pemula</option>
                  <option value="menengah">Menengah</option>
                  <option value="ahli">Ahli</option>
                </select>
              </div>

              <div>
                <TextInput
                  label="Original Price"
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </div>

              <div>
                <TextInput
                  label="Discounted Price"
                  id="final_price"
                  type="number"
                  value={formData.final_price}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block mb-2">Discount Percentage</label>
                <input
                  type="text"
                  id="price_discount"
                  value={
                    formData.price_discount ? `${formData.price_discount}%` : ""
                  }
                  className="w-full p-2 border rounded bg-gray-100"
                  readOnly
                  disabled
                />
              </div>

              <div>
                <label className="block mb-2">
                  Course Image{" "}
                  <span className="text-xs text-gray-500">(Max 5MB)</span>
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  accept="image/*"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows="4"
                disabled={isLoading}
              />
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => navigate("/admin/kelas")}
                className="px-6 py-2 rounded border border-gray-300 hover:bg-gray-50"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`bg-primary-500 text-white px-6 py-2 rounded ${
                  isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-primary-600"
                }`}
              >
                {isLoading ? "Saving..." : "Save Course"}
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Add Chapters</h2>
            {chapters.map((chapter, index) => (
              <div key={index} className="mb-4 p-4 border rounded">
                <div className="flex justify-between mb-4">
                  <h3 className="text-lg font-medium">Chapter {index + 1}</h3>
                  <button
                    onClick={() => removeChapter(index)}
                    className="text-red-500"
                  >
                    <Trash size={20} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <TextInput
                      label="Chapter Name"
                      value={chapter.chapter_name}
                      onChange={(e) =>
                        handleChapterChange(
                          index,
                          "chapter_name",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Course</label>
                    <select
                      value={chapter.course_id}
                      onChange={(e) =>
                        handleChapterChange(index, "course_id", e.target.value)
                      }
                      className="w-full p-2 border rounded"
                    >
                      <option value="">Select Course</option>
                      {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.class_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-between mt-4">
              <button
                onClick={addChapter}
                className="flex items-center text-primary-500"
              >
                <Add size={20} className="mr-2" />
                Add Chapter
              </button>
              <button
                onClick={handleSubmitChapters}
                className="bg-primary-500 text-white px-6 py-2 rounded hover:bg-primary-600"
              >
                Save Chapters
              </button>
            </div>
          </div>

          {/* Videos Section */}
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Add Videos</h2>
            {videos.map((video, index) => (
              <div key={index} className="mb-4 p-4 border rounded">
                <div className="flex justify-between mb-4">
                  <h3 className="text-lg font-medium">Video {index + 1}</h3>
                  <button
                    onClick={() => removeVideo(index)}
                    className="text-red-500"
                  >
                    <Trash size={20} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <TextInput
                      label="Video Number"
                      type="number"
                      value={video.video_number}
                      onChange={(e) =>
                        handleVideoChange(index, "video_number", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <TextInput
                      label="Video Title"
                      value={video.video_title}
                      onChange={(e) =>
                        handleVideoChange(index, "video_title", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <TextInput
                      label="Video URL"
                      value={video.video_url}
                      onChange={(e) =>
                        handleVideoChange(index, "video_url", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Chapter</label>
                    <select
                      value={video.chapter_id}
                      onChange={(e) =>
                        handleVideoChange(index, "chapter_id", e.target.value)
                      }
                      className="w-full p-2 border rounded"
                    >
                      <option value="">Select Chapter</option>
                      {availableChapters.map((chapter) => (
                        <option key={chapter.id} value={chapter.id}>
                          {chapter.chapter_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block mb-2">Video Description</label>
                    <textarea
                      value={video.video_description}
                      onChange={(e) =>
                        handleVideoChange(
                          index,
                          "video_description",
                          e.target.value
                        )
                      }
                      className="w-full p-2 border rounded"
                      rows="3"
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-between mt-4">
              <button
                onClick={addVideo}
                className="flex items-center text-primary-500"
              >
                <Add size={20} className="mr-2" />
                Add Video
              </button>
              <button
                onClick={handleSubmitVideos}
                className="bg-primary-500 text-white px-6 py-2 rounded hover:bg-primary-600"
              >
                Save Videos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditKelas;
