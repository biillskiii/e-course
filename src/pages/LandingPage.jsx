import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../assets/hero.png";
import CardCategory from "../components/CardCategory";

// Example category data (you can customize this)
const categories = [
  {
    id: 1,
    title: "FrontEnd Development",
  },
  {
    id: 2,
    title: "Backend Development",
  },
  {
    id: 3,
    title: "Android Development",
  },
  {
    id: 4,
    title: "UI/UX Research & Design",
  },
  {
    id: 5,
    title: "Data Science",
  },
];

const Home = () => {
  return (
    <div className="w-full min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="flex justify-center items-center gap-x-14 my-[80px]">
        <div className="w-[558px]">
          <p className="text-primary-400 font-bold text-2xl">
            👋 Ayo! belajar bersama
          </p>
          <h1 className="mango -mt-7 uppercase text-primary-500 text-[120px]">
            pixel<span className="text-secondary-500">code.</span>
          </h1>
          <p>
            Jelajahi dunia coding dan desain digital bersama kami. Pelajari
            keterampilan terbaru dalam pengembangan web, pemrograman, desain
            UI/UX, dan banyak lagi. Kursus interaktif, materi praktis, dan
            mentor berpengalaman siap membantu kamu berkembang di era digital.
          </p>
        </div>
        <div className="w-[584px]">
          <img src={Hero} alt="Hero" />
        </div>
      </section>

      {/* Kategori Section */}
      <section className="flex flex-col items-center mt-[160px]">
        <h1 className="text-3xl font-bold">Kategori Kelas & Webinar</h1>
        <div className="flex flex-wrap justify-center gap-6 mt-10">
          {categories.map((category) => (
            <CardCategory key={category.id} label={category.title} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
