import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../assets/hero.png";
import CardCategory from "../components/CardCategory";
import Card from "../components/Card";
import Avatar from "../assets/avatar1.png";
import CardWebinar from "../components/CardWebinar";
import Footer from "../components/Footer";
import Manfaat from "../assets/manfaat.png";
const cardData = [
  {
    img: Avatar,
    title: "UI/UX Fundamental",
    name: "John Doe",
    job: "Software Engineer",
    level: "Beginner",
    rating: 4,
    price: 200000,
    ratingNum: "4.5",
  },
  {
    img: Avatar,
    title: "Basic Frontend Development",
    name: "Jane Smith",
    job: "Frontend Developer",
    level: "Intermediate",
    rating: 5,
    price: 200000,
    ratingNum: "5.0",
  },
  {
    img: Avatar,
    title: "Belajar Membuat Component",
    name: "Robert Johnson",
    job: "UI/UX Designer",
    level: "Beginner",
    rating: 3,
    price: 200000,
    hasDiscount: 20,
    ratingNum: "3.0",
  },
];

const cardWebinar = [
  {
    img: Avatar,
    name: "John Doe",
    job: "Software Engineer",
    title: "Bangun Personal Brandingmu Sebagai UI/UX Designer",
    date: "Senin, 13 Desember 2025",
    hours: "13.00 - 15.00 WIB",
    price: 500000,
    isFree: true,
  },
  {
    img: Avatar,
    name: "John Doe",
    job: "Software Engineer",
    title: "Bangun Personal Brandingmu Sebagai UI/UX Designer",
    date: "Senin, 13 Desember 2025",
    hours: "13.00 - 15.00 WIB",
    price: 500000,
    hasDiscount: 50,
  },
  {
    img: Avatar,
    name: "John Doe",
    job: "Software Engineer",
    title: "Bangun Personal Brandingmu Sebagai UI/UX Designer",
    date: "Senin, 13 Desember 2025",
    hours: "13.00 - 15.00 WIB",
    price: 500000,
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
        <div className="flex flex-wrap justify-center gap-6">
          {categories.map((category) => (
            <CardCategory key={category.id} label={category.title} />
          ))}
        </div>
      </section>

      {/* Kelas Populer Section */}
      <section className="flex flex-col items-start px-36 mt-[160px]">
        <h1 className="text-3xl font-bold">Kelas Populer</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {cardData.map((card, index) => (
            <Card
              key={index}
              img={card.img}
              title={card.title}
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

      {/* Webinar Section */}
      <section className="flex flex-col items-start px-36 mt-[160px]">
        <h1 className="text-3xl font-bold">Webinar Terbaru</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {cardWebinar.map((webinar, index) => (
            <CardWebinar
              key={index}
              img={webinar.img}
              title={webinar.title}
              name={webinar.name}
              job={webinar.job}
              date={webinar.date}
              hours={webinar.hours}
              price={webinar.price}
              isFree={webinar.isFree}
              hasDiscount={webinar.hasDiscount}
              discountPrice={webinar.discountPrice}
            />
          ))}
        </div>
      </section>
      <section className="flex items-center justify-center gap-x-32 px-36 mt-[160px]">
        <div className="">
          <img src={Manfaat} alt="manfaat" width={560} />
        </div>
        <div className="w-[560px] space-y-5">
          <h5 className="text-primary-500 font-bold text-3xl">
            Manfaat dan Fasilitas
          </h5>
          <h3 className="text-5xl">Dapatkan berbagai manfaat dan fasilitas!</h3>
          <ul className="text-base space-y-6">
            <li>Video Materi</li>
            <li>Materi Baca</li>
            <li>Portofolio Proyek</li>
            <li>Live Webinar</li>
            <li>Akses Seumur Hidup</li>
            <li>Sertifikat</li>
          </ul>
        </div>
      </section>
      <section className="flex flex-col items-start mt-[160px]">
        <Footer />
      </section>
    </div>
  );
};

export default Home;
