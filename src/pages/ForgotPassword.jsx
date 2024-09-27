import { useState } from "react";
import Wave from "../assets/login.png";
import TextInput from "../components/InputForm";
import Button from "../components/Button";

function App() {
  const [email, setEmail] = useState("");
  return (
    <div className="bg-white flex justify-center items-center max-h-screen overflow-hidden gap-x-10">
      <div className="w-full">
        <img
          src={Wave}
          alt="ForgotPassword"
          className="w-[660px] py-10 pl-20 min-h-screen"
        />
      </div>
      <div className="w-full flex flex-col justify-center items-center px-28">
        <h1 className="text-3xl font-bold mb-5">Lupa Kata Sandi</h1>
        <form className="w-full">
          <TextInput
            type="email"
            label="Email"
            id="email"
            placeholder="Masukkan alamat email kamu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" label="Kirim Email" className="w-full mt-5" />
        </form>
      </div>
    </div>
  );
}

export default App;
