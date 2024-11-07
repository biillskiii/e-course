import React, { useState } from "react";
import {
  Home,
  People,
  Monitor,
  MonitorRecorder,
  Wallet,
  Setting3,
  LogoutCurve,
  Teacher,
  SearchNormal1,
  Filter,
  Edit2,
  Trash,
} from "iconsax-react";
import NavbarDashboard from "../../components/NavbarDashboard";
import { userData } from "../../data";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import SubMateriComponent from "../../components/CardSub";
import Contoh from "../../assets/contoh.png";
const EditKelas = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    kodeKelas: "1234",
    kategori: "UX/UX Research & Design",
    namaKelas: "UI/UX Fundamental",
    deskripsiKelas: "Lorem ipsum dolor sit amet",
    jumlahModul: "5",
    durasiKelas: "5",
    level: "Pemula",
    tipe: "berbayar",
    harga: "500000",
    hargaDiskon: "450000",
    mentors: ["Jay Thee"],
  });
  const [mentorInput, setMentorInput] = useState("");
  const [subMateriComponents, setSubMateriComponents] = useState([]);

  const handleAddSubMateri = () => {
    setSubMateriComponents([...subMateriComponents, {}]); // Add an empty object or any data structure you need
  };
  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleInputChange = (e, index = null) => {
    const { name, value } = e.target;

    if (name === "mentor") {
      setFormData((prevData) => {
        const newMentors = [...prevData.mentors];
        newMentors[index] = value;
        return { ...prevData, mentors: newMentors };
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const addMentorField = () => {
    setFormData((prevData) => ({
      ...prevData,
      mentors: [...prevData.mentors, ""],
    }));
  };

  const handleNext = () => {
    setActiveStep(2);
  };

  const handleBack = () => {
    if (activeStep === 1) {
      navigate("/admin/kelas");
    } else {
      setActiveStep(1);
    }
  };

  const handleAddMentor = () => {
    if (mentorInput.trim()) {
      setFormData((prevData) => ({
        ...prevData,
        mentors: [...prevData.mentors, mentorInput],
      }));
      setMentorInput("");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-60 min-h-screen fixed bg-white shadow-lg flex flex-col justify-between items-center p-5">
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
          />
          <Button
            label="Mentor"
            variant="side-primary"
            leftIcon={<Teacher />}
            size="very-big"
          />
          <Button
            label="Daftar Transaksi"
            variant="side-primary"
            leftIcon={<Wallet />}
            size="very-big"
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
          onClick={() => handleNavigation("/login")}
        />
      </div>

      {/* Main Content */}
      <div className="w-full ml-60 flex-1">
        <NavbarDashboard
          avatar={userData.avatar}
          username={userData.username}
        />

        {/* Stepper */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-x-5 justify-between px-6 mb-8">
            <div className="w-[520px] flex gap-x-3 border-b-2 pb-3 border-primary-500">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activeStep >= 1 ? "bg-primary-500 text-white" : "bg-gray-200"
                }`}
              >
                1
              </div>
              <div className="">
                <p className="text-primary-500 text-sm">Langkah 1</p>
                <p className="font-medium text-base">Informasi Kelas</p>
              </div>
            </div>

            <div
              className={`w-[520px] flex gap-x-3 border-b-2 pb-3 border-primary-200/50 ${
                activeStep >= 2 && "border-primary-500"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activeStep >= 2
                    ? "bg-primary-500 text-white"
                    : "bg-primary-200/50 text-white"
                }`}
              >
                2
              </div>
              <div className="">
                <p className="text-primary-500 text-sm">Langkah 2</p>
                <p className="font-medium text-base">Modul & Media</p>
              </div>
            </div>
          </div>

          <div className="w-full p-6 mx-auto">
            <h2 className="text-xl font-semibold mb-6">
              {activeStep === 1 ? "Edit Informasi Kelas" : "Edit Modul & Media"}
            </h2>

            {activeStep === 1 ? (
              <div className="bg-white rounded-lg w-full">
                <div className="flex justify-between w-full gap-x-10">
                  {/* Left Column */}
                  <div className="w-full items-start">
                    <div className="flex gap-x-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Kode Kelas
                        </label>
                        <input
                          type="number"
                          name="kodeKelas"
                          value={formData.kodeKelas}
                          onChange={handleInputChange}
                          className="w-[104px] text-primary-500 p-2 border border-gray-300 rounded-md"
                          placeholder="1234"
                        />
                      </div>

                      <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Kategori
                        </label>
                        <select
                          name="kategori"
                          value={formData.kategori}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          <option>UX/UX Research & Design</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nama Kelas
                      </label>
                      <input
                        type="text"
                        name="namaKelas"
                        value={formData.namaKelas}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="UI/UX Fundamental"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Deskripsi Kelas
                      </label>
                      <textarea
                        name="deskripsiKelas"
                        value={formData.deskripsiKelas}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="w-full">
                    <div className="grid grid-cols-3 gap-x-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Jumlah Modul
                        </label>
                        <select
                          name="jumlahModul"
                          value={formData.jumlahModul}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          <option>5</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Durasi Kelas
                        </label>
                        <select
                          name="durasiKelas"
                          value={formData.durasiKelas}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          <option>5 jam</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Level
                        </label>
                        <select
                          name="level"
                          value={formData.level}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          <option>Pemula</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tipe
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="tipe"
                            value="gratis"
                            checked={formData.tipe === "gratis"}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          Gratis
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="tipe"
                            value="berbayar"
                            checked={formData.tipe === "berbayar"}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          Berbayar
                        </label>
                      </div>
                    </div>

                    {formData.tipe === "berbayar" && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Harga Normal
                          </label>
                          <input
                            type="text"
                            name="harga"
                            value={formData.harga}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="500000"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Harga Diskon
                          </label>
                          <input
                            type="text"
                            name="hargaDiskon"
                            value={formData.hargaDiskon}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-sm font-medium text-gray-700">
                          Mentor
                        </label>
                        <button
                          onClick={addMentorField}
                          className="text-primary-500 text-sm"
                        >
                          + Tambah Mentor
                        </button>
                      </div>
                      {formData.mentors.map((mentor, index) => (
                        <input
                          key={index}
                          type="text"
                          name="mentor"
                          value={mentor}
                          onChange={(e) => handleInputChange(e, index)}
                          className="w-full p-2 border border-gray-300 rounded-md mb-2"
                          placeholder="Nama Mentor"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex gap-x-5">
                <div className="w-full bg-white rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Sampul Kelas</h3>
                  <div className="rounded-lg w-[320px] flex items-center space-x-4">
                    <img
                      src={Contoh}
                      alt="Course thumbnail"
                      className="rounded-lg"
                    />
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 w-full">
                  <h3 className="font-semibold mb-4">Modul Kelas</h3>

                  <div className="bg-white space-y-5 rounded-lg w-full">
                    {/* Render SubMateriComponent or any additional logic for Step 2 */}
                    {subMateriComponents.map((_, index) => (
                      <SubMateriComponent key={index} />
                    ))}
                    <button
                      onClick={handleAddSubMateri}
                      className="mt-4 w-full bg-primary-500 text-white py-2 px-4 rounded-xl font-semibold"
                    >
                      Tambah Sub Materi
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end mt-6 space-x-4">
              {activeStep === 2 && (
                <button
                  onClick={() => setActiveStep(1)}
                  className="px-6 py-2 border border-gray-300 rounded-md"
                >
                  Sebelumnya
                </button>
              )}
              <button
                onClick={activeStep === 1 ? handleNext : () => {}}
                className="px-6 py-2 bg-primary-500 text-white rounded-md"
              >
                {activeStep === 1 ? "Selanjutnya" : "Update"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditKelas;
