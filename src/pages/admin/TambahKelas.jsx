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
} from "iconsax-react";
// import { Alert, AlertDescription } from "@/components/ui/alert";
import NavbarDashboard from "../../components/NavbarDashboard";
import { userData } from "../../data";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import axios from "axios";

const EditKelas = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [mentors, setMentors] = useState([]); // New state for mentor options
  const [formData, setFormData] = useState({
    course_code: "",
    name: "",
    level: "pemula",
    description: "",
    premium: 1,
    price: "", // Add this
    final_price: "",
    price_discount: "",
    course_photo: null,
    mentor_id: "",
    category_id: 1,
  });

  const [finalPrice, setFinalPrice] = useState("");
  // New useEffect to fetch mentors
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get(
          "https://be-course.serpihantech.com/api/mentors"
        );
        if (response.data.data) {
          setMentors(response.data.data);
          // Set default mentor_id if mentors are available
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
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "price" || name === "price_discount") {
      const price = name === "price" ? Number(value) : Number(formData.price);
      const discount =
        name === "price_discount"
          ? Number(value)
          : Number(formData.price_discount);

      if (!isNaN(price) && price > 0) {
        const discountedPrice = price * (1 - discount / 100);
        const finalPriceValue = discountedPrice > 0 ? discountedPrice : 0;
        setFinalPrice(finalPriceValue);
        // Update final_price in formData
        setFormData((prevData) => ({
          ...prevData,
          final_price: finalPriceValue,
        }));
      } else {
        setFinalPrice("");
        setFormData((prevData) => ({
          ...prevData,
          final_price: "",
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
      "course_code",
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
        Number(formData.price_discount) >= Number(formData.price))
    ) {
      setError("Discount price must be less than regular price");
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
        course_code: formData.course_code,
        name: formData.name,
        level: formData.level,
        description: formData.description,
        price: formData.final_price, // Use final_price here
        price_discount: formData.price_discount || null,
        premium: formData.premium,
        mentor_id: formData.mentor_id,
        category_id: formData.category_id,
        course_photo: formData.course_photo,
      };

      Object.keys(mapData).forEach((key) => {
        if (mapData[key] !== null) {
          formDataToSend.append(key, mapData[key]);
        }
      });

      const response = await axios.post(
        "https://be-course.serpihantech.com/api/courses",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 10000,
        }
      );

      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/admin/kelas");
        }, 2000);
      }
    } catch (error) {
      // Error handling remains the same
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar code remains the same... */}
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
            variant="side-primary"
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
          <Button
            label="Pengaturan"
            variant="side-primary"
            leftIcon={<Setting3 />}
            size="very-big"
          />
        </div>
        <Button
          label="Keluar"
          variant="side-danger"
          leftIcon={<LogoutCurve />}
          size="very-big"
        />
      </div>
      {/* Main Content */}
      <div className="w-full ml-60 flex-1">
        <NavbarDashboard
          avatar={userData.avatar}
          username={userData.username}
        />

        <div className="container mx-auto px-4 py-6">
          <div className="bg-white rounded-lg p-6">
            {error && alert(error)}
            {success && alert("sukses")}

            <div className="grid grid-cols-2 gap-4">
              {/* Existing form fields... */}

              {/* New Mentor dropdown */}
              <div>
                <label className="block mb-2">
                  Mentor <span className="text-red-500">*</span>
                </label>
                <select
                  name="mentor_id"
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

              {/* Rest of your existing form fields... */}
              <div>
                <label className="block mb-2">
                  Course Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="course_code"
                  value={formData.course_code}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block mb-2">Level</label>
                <select
                  name="level"
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
                <label className="block mb-2">
                  Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block mb-2">Price Discount</label>
                <input
                  type="number"
                  name="price_discount"
                  value={formData.price_discount}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  disabled={isLoading}
                />
              </div>
              <div>
                <label className="block mb-2">Final Price</label>
                <input
                  type="text"
                  name="final_price"
                  value={
                    formData.final_price === ""
                      ? `Rp ${finalPrice}`
                      : `Rp ${formData.final_price}`
                  }
                  className="w-full p-2 border rounded bg-gray-100"
                  readOnly
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
                name="description"
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
        </div>
      </div>
    </div>
  );
};

export default EditKelas;
