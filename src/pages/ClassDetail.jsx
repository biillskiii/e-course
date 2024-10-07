import Navbar from "../components/Navbar";
import { Level } from "iconsax-react";
import { Book } from "iconsax-react";
import { Clock } from "iconsax-react";

function App() {
  return {};
}

export default App;
<section className="w-full min-h-screen">
  <div className="container px-10 mx-auto">
    <Navbar />
    <div>
      <div>
        <p>UI/UX Research & Design</p>
        <h4>UI/UX Fundamental</h4>
        <div className="flex flex-row"></div>
        <p>
          <Level /> Pemula
        </p>
        <p>
          <Book /> 6 Modul
        </p>
        <p>
          <Clock /> 3
        </p>
      </div>
      <div></div>
    </div>
  </div>
</section>;
