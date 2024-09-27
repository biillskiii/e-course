import { useState } from "react";
import Wave from "../assets/login.png";
import TextInput from "../components/InputForm";
import Button from "../components/Button";
import { Google } from "iconsax-react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <div className="bg-white flex justify-center items-center max-h-screen overflow-hidden gap-x-10">
      <div className="w-full">
        <img
          src={Wave}
          alt="SignUp"
          className="w-[660px] py-10 pl-20 min-h-screen"
        />
      </div>
      <div className="w-full flex flex-col justify-center items-center px-28">
        <h1 className="text-3xl font-bold mb-5">Daftar Akun</h1>
        <form className="w-full">
          <TextInput
            type="text"
            label="Nama Lengkap"
            id="name"
            placeholder="Masukkan nama kamu"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextInput
            type="email"
            label="Email"
            id="email"
            placeholder="Masukkan alamat email kamu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextInput
            type="password"
            label="Kata sandi"
            id="password"
            placeholder="Masukkan kata sandi kamu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextInput
            type="password"
            label="Kata sandi"
            id="password"
            placeholder="Masukkan kata sandi kamu"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="submit" label="Daftar Akun" className="w-full mt-5" />
          <div className="flex justify-center items-center gap-x-5 my-5">
            <hr className="w-full" />
            <p>Atau</p>
            <hr className="w-full" />
          </div>
          <Button
            type="button"
            variant="secondary"
            label="Daftar dengan Google"
            className="w-full mt-5"
            leftIcon={<Google variant="Bold" />}
          />
          <a href="" className="flex justify-center gap-x-1 mt-5">
            Sudah Punya Akun?
            <span className="text-primary-500 font-bold"> Masuk Akun</span>
          </a>
        </form>
      </div>
    </div>
  );
}

export default App;
