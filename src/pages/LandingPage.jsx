import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../assets/hero.png";
import CardCategory from "../components/CardCategory";
import Card from "../components/Card";
import Avatar from "../assets/avatar1.png";
import CardWebinar from "../components/CardWebinar";
import Footer from "../components/Footer";
import Manfaat from "../assets/manfaat.png";
import Testi from "../components/Testi";
import Button from "../components/Button";
import { ArrowUp2, ArrowDown2 } from "iconsax-react";
const faqData = [
  {
    question: "Kelas apa saja yang tersedia di PIXELCODE?",
    answer:
      "Lorem ipsum dolor sit amet consectetur. Tempus ornare massa quisque gravida massa morbi pulvinar aenean neque...",
  },
  {
    question:
      "Apakah materi kelas baik yang berupa video, modul, dan materi lainnya dapat diunduh?",
    answer:
      "Lorem ipsum dolor sit amet consectetur. Tempus ornare massa quisque gravida massa morbi pulvinar aenean neque...",
  },
  {
    question:
      "Bagaimana cara mengajukan pertanyaan atau mendapat bantuan teknis?",
    answer:
      "Lorem ipsum dolor sit amet consectetur. Tempus ornare massa quisque gravida massa morbi pulvinar aenean neque...",
  },
  {
    question: "Apakah ada batasan waktu untuk menyelesaikan kelas?",
    answer:
      "Lorem ipsum dolor sit amet consectetur. Tempus ornare massa quisque gravida massa morbi pulvinar aenean neque...",
  },
  {
    question:
      "Apakah kelas yang telah dibeli dapat dibatalkan dan diajukan pengembalian?",
    answer:
      "Lorem ipsum dolor sit amet consectetur. Tempus ornare massa quisque gravida massa morbi pulvinar aenean neque...",
  },
];
const testimonials = [
  {
    testimonial:
      "PixelCode benar-benar mengubah cara saya memahami pemrograman...",
    name: "Austin B.",
    job: "Mentee",
    img: "https://via.placeholder.com/150",
  },
  {
    testimonial: "PixelCode memberikan pengalaman belajar yang luar biasa...",
    name: "Julia Tan",
    job: "Mentee",
    img: "https://via.placeholder.com/150",
  },
  {
    testimonial: "PixelCode memberikan pengalaman belajar yang luar biasa...",
    name: "Julia Tan",
    job: "Mentee",
    img: "https://via.placeholder.com/150",
  },
  {
    testimonial: "PixelCode memberikan pengalaman belajar yang luar biasa...",
    name: "Julia Tan",
    job: "Mentee",
    img: "https://via.placeholder.com/150",
  },
  {
    testimonial: "PixelCode memberikan pengalaman belajar yang luar biasa...",
    name: "Julia Tan",
    job: "Mentee",
    img: "https://via.placeholder.com/150",
  },
  // Add more testimonials as needed
];
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
  const [current, setCurrent] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const slidesPerView = 2; // Set how many slides to show at once
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const nextSlide = () => {
    setCurrent((prevIndex) =>
      prevIndex + slidesPerView >= testimonials.length
        ? 0 // Reset to the first slide if we've reached the end
        : prevIndex + slidesPerView
    );
  };

  const prevSlide = () => {
    setCurrent((prevIndex) =>
      prevIndex === 0
        ? testimonials.length - slidesPerView // Go to the last possible set of slides
        : prevIndex - slidesPerView
    );
  };

  // Autoplay feature
  useEffect(() => {
    let interval;
    if (isAutoPlay) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlay, current]);
  return (
    <div className="w-full min-h-screen">
      <div className="px-60 mx-auto">
        <Navbar />
      </div>
      <div className="">
        {/* Hero Section */}
        <section className="container mx-auto flex justify-center items-center gap-x-14 my-[80px]">
          <div className="w-[558px]">
            <p className="text-primary-400 font-bold text-2xl">
              👋 Ayo! belajar bersama
            </p>
            <h1 className="mango -mt-7 uppercase text-primary-500 text-[120px]">
              pixel<span className="text-secondary-500">code.</span>
            </h1>
            <p className="mb-5">
              Jelajahi dunia coding dan desain digital bersama kami. Pelajari
              keterampilan terbaru dalam pengembangan web, pemrograman, desain
              UI/UX, dan banyak lagi. Kursus interaktif, materi praktis, dan
              mentor berpengalaman siap membantu kamu berkembang di era digital.
            </p>
            <Button label={"Katalog kelas"} size="small" />
          </div>
          <div className="w-[584px]">
            <img src={Hero} alt="Hero" />
          </div>
        </section>

        {/* Kategori Section */}
        <section className="container mx-auto flex flex-col items-center mt-[160px]">
          <h1 className="text-3xl font-bold">Kategori Kelas & Webinar</h1>
          <div className="flex flex-wrap justify-center gap-6">
            {categories.map((category) => (
              <CardCategory key={category.id} label={category.title} />
            ))}
          </div>
        </section>

        {/* Kelas Populer Section */}
        <section className="container mx-auto flex flex-col items-start px-36 mt-[160px]">
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
        <section className="container mx-auto flex flex-col items-start px-36 mt-[160px]">
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
        <section className="container mx-auto flex items-center justify-center gap-x-32 px-36 mt-[160px]">
          <div className="">
            <img src={Manfaat} alt="manfaat" width={560} />
          </div>
          <div className="w-[560px] space-y-5">
            <h5 className="text-primary-500 font-bold text-3xl">
              Manfaat dan Fasilitas
            </h5>
            <h3 className="text-5xl">
              Dapatkan berbagai manfaat dan fasilitas!
            </h3>
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
        <div className="bg-teal-50 pt-32 h-[524px] mt-[160px]">
          <div className="container  mx-auto pl-32 flex justify-between items-center">
            <div className="w-[433px] mb-10 space-y-4">
              <h2 className="text-3xl font-bold text-primary-500">
                Testimonial
              </h2>
              <h3 className="text-5xl font-medium">Apa yang mereka katakan?</h3>

              {/* Controls for Carousel */}
              <div className="flex justify-start items-center gap-x-10">
                {/* Previous Button */}
                <button
                  onClick={prevSlide}
                  className="bg-white p-3 rounded-full shadow-lg flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6 text-teal-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                {/* Next Button */}
                <button
                  onClick={nextSlide}
                  className="bg-white p-3 rounded-full shadow-lg flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6 text-teal-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Testimonial Cards */}
            <div className="w-[846px] mx-5 relative">
              {/* Testimonial Slide */}
              <div className="relative overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${
                      (current / testimonials.length) * 100
                    }%)`,
                  }}
                >
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={index}
                      className={`w-8/12 px-4 py-2 min-w-8/12`} // Ensure two testimonials show at once
                    >
                      <Testi testimonial={testimonial} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="py-16">
          <div className="container mx-auto px-32 flex justify-between items-start">
            <div className="text-left w-full max-w-lg mt-16">
              <h2 className="text-primary-500 font-bold text-3xl">FAQs</h2>
              <h3 className="text-5xl font-medium mb-4 mt-4">
                Yang sering mereka tanyakan.
              </h3>
              <Button label={"Hubungi Kami"} size="small" />
            </div>

            <div className="mt-12 w-full space-y-10 max-w-2xl">
              {faqData.map((item, index) => (
                <div key={index} className="py-4">
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleFAQ(index)}
                  >
                    <h4 className="text-xl font-bold w-[515px]">
                      {item.question}
                    </h4>
                    {openIndex === index ? (
                      <div className="w-16 h-16 bg-gray-100 rounded-full hover:bg-primary-500  text-primary-500 hover:text-white flex justify-center items-center">
                        <ArrowUp2 size={24} />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-gray-100 rounded-full hover:bg-primary-500  text-primary-500 hover:text-white flex justify-center items-center">
                        <ArrowDown2 size={24} />
                      </div>
                    )}
                  </div>
                  {openIndex === index && (
                    <p className="mt-10 text-gray-600">{item.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="flex flex-col items-start mt-[160px]">
          <Footer />
        </section>
      </div>
    </div>
  );
};

export default Home;
