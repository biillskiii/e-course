import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../assets/hero.png";
import CardCategory from "../components/CardCategory";
import Card from "../components/Card";
import CardWebinar from "../components/CardWebinar";
import Footer from "../components/Footer";
import Manfaat from "../assets/manfaat.png";
import Testi from "../components/Testi";
import Button from "../components/Button";
import { ArrowUp2, ArrowDown2, Next, Previous } from "iconsax-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
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
  const [classes, setClasses] = useState([]);
  const [webinars, setWebinars] = useState([]);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const slidesPerView = 2;
  const [openIndex, setOpenIndex] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();
  const token = Cookies.get("accessToken");
  const settings = {
    nextArrow: <Next />,
    prevArrow: <Previous />,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  const fetchProfileData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API_KEY}/api/user`, // Endpoint API
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      // setProfileData(result.user);
      setProfileImage(
        result.user.path_photo ||
          "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png"
      );
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };

  const handleCardClick = (classId) => {
    if (!checkAuth()) {
      navigate("/masuk");
    } else {
      navigate(`/user/detail/${classId}`);
    }
  };

  const handleButtonClick = () => {
    if (!checkAuth()) {
      navigate("/masuk");
    } else {
      navigate("/user/catalog");
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API_KEY}/api/courses`
      );
      const result = await response.json();
      setClasses(result.data);
      console.log(result.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const nextSlide = () => {
    setCurrent((prevIndex) =>
      prevIndex + slidesPerView >= testimonials.length
        ? 0
        : prevIndex + slidesPerView
    );
  };

  const prevSlide = () => {
    setCurrent((prevIndex) =>
      prevIndex === 0
        ? testimonials.length - slidesPerView
        : prevIndex - slidesPerView
    );
  };

  useEffect(() => {
    let interval;
    if (isAutoPlay) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlay, current]);

  useEffect(() => {
    fetchProfileData();
    fetchClasses();
  }, []);

  return (
    <div>
      <Navbar avatar={profileImage} />
      <div className="w-full min-h-screen">
        <div className="container mx-auto"></div>
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
                mentor berpengalaman siap membantu kamu berkembang di era
                digital.
              </p>
              <Button
                label={"Katalog kelas"}
                size="small"
                onClick={handleButtonClick}
              />
            </div>
            <div className="w-[584px]">
              <img src={Hero} alt="Hero" />
            </div>
          </section>

          {/* Kategori Section */}
          <section className="container mx-auto flex flex-col items-center mt-[160px]">
            <h1 className="text-3xl font-bold mb-10">
              Kategori Kelas & Webinar
            </h1>
            <div className="flex flex-wrap justify-center gap-6">
              {categories.map((category) => (
                <CardCategory key={category.id} label={category.title} />
              ))}
            </div>
          </section>

          {/* Kelas Populer Section */}
          <section className="container mx-auto flex flex-col items-start px-36 mt-[160px]">
            <h1 className="text-3xl font-bold">Kelas Populer</h1>
            <Slider {...settings} className="w-full mt-10 flex items-center">
              {classes.length > 0 ? (
                classes.map((kelas) => (
                  <Card
                    key={kelas.id}
                    img={kelas.path_photo}
                    mentorImg={kelas.mentor.path_photo}
                    title={kelas.class_name}
                    name={kelas.mentor.name}
                    job={kelas.mentor.specialist}
                    price={kelas.price}
                    level={kelas.level}
                    rating={kelas.avg_star}
                    label={"Daftar Kelas"}
                    onClick={() => handleCardClick(kelas.id)}
                  />
                ))
              ) : (
                <div className="w-full text-center text-primary-500 font-bold">
                  Tidak ada kelas yang tersedia
                </div>
              )}
            </Slider>
          </section>

          {/* Manfaat Section */}
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

          {/* Testimonial Section */}
          <div className="bg-teal-50 pt-32 h-[524px] mt-[160px]">
            <div className="container mx-auto pl-32 flex justify-between items-center">
              <div className="w-[433px] mb-10 space-y-4">
                <h2 className="text-3xl font-bold text-primary-500">
                  Testimonial
                </h2>
                <h3 className="text-5xl font-medium">
                  Apa yang mereka katakan?
                </h3>

                <div className="flex justify-start items-center gap-x-10">
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

              <div className="w-[846px] mx-5 relative">
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
                        className={`w-8/12 px-4 py-2 min-w-8/12`}
                      >
                        <Testi testimonial={testimonial} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <section className="py-16">
            <div className="container mx-auto px-32 flex justify-between items-start">
              <div className="text-left w-full max-w-lg mt-16 space-y-8">
                <h2 className="text-primary-500 font-bold text-3xl mb-5">
                  FAQs
                </h2>
                <h3 className="text-5xl font-medium">
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

          {/* Footer Section */}
          <section className="flex flex-col items-start mt-[160px]">
            <Footer />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
