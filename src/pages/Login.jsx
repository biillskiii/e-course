import { useState } from "react";
import Wave from "../assets/login.png";
import TextInput from "../components/InputForm";
import Button from "../components/Button";
import { Google } from "iconsax-react";
function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="bg-white flex justify-center items-center max-h-screen overflow-hidden gap-x-10">
      <div className="w-full">
        <img
          src={Wave}
          alt="login"
          className="w-[660px] py-10 pl-20 min-h-screen"
        />
      </div>
      <div className="w-full flex flex-col justify-center items-center px-28">
        <h1 className="text-3xl font-bold mb-5">Masuk Akun</h1>
        <form className="w-full">
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
          <a className="flex justify-end my-5 font-bold">Lupa kata sandi?</a>
          <Button
            label={"Masuk Akun"}
            variant="primary"
            size="full"
            type="submit"
          />
          <div className="flex justify-center items-center gap-x-5 my-5">
            <hr className="w-full" />
            <p>Atau</p>
            <hr className="w-full" />
          </div>
          <Button
            label={"Masuk dengan Google"}
            variant="secondary"
            size="full"
            type="submit"
            leftIcon={<Google variant="Bold" />}
          />
          <a href="" className="flex justify-center gap-x-1 mt-5">
            Belum Punya Akun? 
            <span className="text-primary-500 font-bold"> Daftar Akun</span>
          </a>
        </form>
      </div>
    </div>
  );
}

export default App;
0;
