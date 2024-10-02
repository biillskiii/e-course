import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../assets/hero.png";
import CardCategory from "../components/CardCategory";
import Card from "../components/Card";
import Avatar from "../assets/avatar1.png";
const cardData = [
  {
    img: Avatar,
    title: "UI/UX Fundamental",
    name: "John Doe",
    job: "Software Engineer",
    level: "Beginner",
    rating: 4,
    price: "Rp.500.000,00",
    ratingNum: "4.5",
  },
  {
    img: Avatar,
    title: "Basic Frontend Development",
    name: "Jane Smith",
    job: "Frontend Developer",
    level: "Intermediate",
    rating: 5,
    price: "Rp.500.000,00",
    ratingNum: "5.0",
  },
  {
    img: Avatar,
    title: "Belajar Membuat Component",
    name: "Robert Johnson",
    job: "UI/UX Designer",
    level: "Beginner",
    rating: 3,
    price: "Rp.500.000,00",
    ratingNum: "3.0",
  },
];

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
        <div className="flex flex-wrap justify-center gap-6 ">
          {categories.map((category) => (
            <CardCategory key={category.id} label={category.title} />
          ))}
        </div>
      </section>
      <section className="flex flex-col items-start px-36 mt-[160px]">
        <h1 className="text-3xl font-bold ">Kelas Populer</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {cardData.map((card, index) => (
            <Card
              key={index}
              img={card.img}
              title={card.title}
              avatar={card.avatar}
              name={card.name}
              job={card.job}
              level={card.level}
              rating={card.rating}
              price={card.price}
              ratingNum={card.ratingNum}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
