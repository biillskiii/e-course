import { useState } from "react";
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
} from "iconsax-react";
import Button from "../../components/Button";
import NavbarDashboard from "../../components/NavbarDashboard";
import TextInput from "../../components/InputForm";

const Pengaturan = () => {
  const navigate = useNavigate();
  const [kelasStatus, setKelasStatus] = useState("Dalam Progress");

  const handleNavigation = (path) => {
    navigate(path);
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
              variant="side-primary"
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
                <div className="flex flex-col border-2 w-[360px] h-[160px] p-6 mr-10 rounded-2xl border-primary-500 border-opacity-20 gap-6">
                  <Button
                    label={"Edit Profil"}
                    variant="submenu"
                    size="small"
                    leftIcon={<UserEdit className="font-primary-500" />}
                  />
                  <Button
                    label={"Ubah Kata Sandi"}
                    variant="submenu"
                    size="big"
                    leftIcon={<Key className="font-primary-500" />}
                  />
                </div>
                <div className="flex flex-col w-full border-2 p-6 rounded-2xl border-primary-500 border-opacity-20 space-y-6">
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
                    id={"nomor"}
                    placeholder={"Masukkan nomor telepon kamu"}
                  />
                  <div className="flex  w-full gap-4">
                    <TextInput
                      type={"text"}
                      label={"Tempat"}
                      id={"tempat"}
                      placeholder={"Masukkan tempat tinggal kamu"}
                    />
                    <TextInput
                      type={"date"}
                      label={"Tanggal Lahir"}
                      id={"name"}
                      placeholder={"Masukkan nama lengkap kamu"}
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
