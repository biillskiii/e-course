import { Home } from "iconsax-react";
import Button from "../components/Button";
import Label from "../components/Label";
import InputBase from "../components/InputForm";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";
import { useState } from "react";
import Card from "../components/Card";
import CardWebinar from "../components/CardWebinar";
import Avatar from "../assets/avatar1.png";
import Testi from "../components/Testi";
const cardData = [
  {
    img: Avatar,
    title: "UI/UX Fundamental",
    name: "John Doe",
    job: "Software Engineer",
    level: "Beginner",
    rating: 4,
    price: 200000,
    hasDiscount: 50,
    ratingNum: "4.5",
  },
  {
    img: Avatar,
    title: "Basic Frontend Development",
    name: "Jane Smith",
    job: "Frontend Developer",
    level: "Intermediate",
    rating: 5,
    isFree: true,
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
    // price: 500000,
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
const testimonials = [
  {
    testimonial:
      "This platform helped me improve my UI/UX design skills and build my personal brand. The content is clear and the instructors are very knowledgeable!",
    img: "https://via.placeholder.com/50", // Ganti dengan URL gambar sebenarnya
    name: "John Doe",
    job: "UI/UX Designer",
  },
  {
    testimonial:
      "I attended the webinar on personal branding and it was really eye-opening. Highly recommend this platform for anyone looking to grow professionally!",
    img: "https://via.placeholder.com/50", // Ganti dengan URL gambar sebenarnya
    name: "Jane Smith",
    job: "Product Manager",
  },
  {
    testimonial:
      "The webinars here are top-notch! The instructors are experts in their fields, and the sessions are always engaging and informative.",
    img: "https://via.placeholder.com/50", // Ganti dengan URL gambar sebenarnya
    name: "Michael Johnson",
    job: "Frontend Developer",
  },
];

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // Example total pages

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="space-y-5 px-10">
      {/* Button */}
      <p>Regular button</p>
      <Button label="Button" variant="primary" />
      <Button label={"Button"} variant="secondary" />
      <Button label={"Button"} variant="tertiary" />
      <Button label={"Button"} variant="disable" />
      {/* Submenu button */}
      <p>Submenu Button</p>
      <Button label={"Button"} variant="submenu" />
      <Button label={"Button"} variant="submenu-active" />
      <Button label={"Button"} variant="submenu-disable" />
      {/* Icon Button */}
      <p>Regular button with Icon</p>
      <Button
        label="Button"
        variant="primary"
        leftIcon={<Home />}
        rightIcon={<Home />}
      />
      <Button
        label={"Button"}
        variant="secondary"
        leftIcon={<Home />}
        rightIcon={<Home />}
      />
      <Button
        label={"Button"}
        variant="tertiary"
        leftIcon={<Home />}
        rightIcon={<Home />}
      />
      <Button
        label={"Button"}
        variant="disable"
        leftIcon={<Home />}
        rightIcon={<Home />}
      />
      {/* Submenu */}
      <p>Submenu Button with Icon</p>
      <Button
        label={"Button"}
        variant="submenu"
        leftIcon={<Home />}
        rightIcon={<Home />}
      />
      <Button
        label={"Button"}
        variant="submenu-active"
        leftIcon={<Home />}
        rightIcon={<Home />}
      />
      <Button
        label={"Button"}
        variant="submenu-disable"
        leftIcon={<Home />}
        rightIcon={<Home />}
      />
      {/* Label */}
      <p>Label</p>
      <Label label="Label" variant={"failed"} size="very-big" />
      <Label label={"Label"} variant={"success"} size="very-big" />
      <Label label={"Label"} variant={"pending"} size="very-big" />
      <p>Checkbox</p>
      <InputBase type={"checkbox"} />
      <InputBase type={"checkbox"} disabled={true} />
      {/* Sidebar */}
      <div className="w-60 min-h-screen bg-white shadow-lg flex flex-col items-center">
        <h1 className="mango text-center text-secondary-500 text-[40px]">
          PIXEL<span className="text-primary-500">CODE.</span>
        </h1>
        <div className="mt-10 space-y-6">
          <Button
            label="Dashboard"
            variant="side-primary"
            leftIcon={<Home />}
            size="very-big"
          />
          <Button
            label="Dashboard"
            variant="side-primary"
            leftIcon={<Home />}
            size="very-big"
          />
          <Button
            label="Dashboard"
            variant="side-primary"
            leftIcon={<Home />}
            size="very-big"
          />
          <Button
            label="Dashboard"
            variant="side-primary"
            leftIcon={<Home />}
            size="very-big"
          />
          <Button
            label="Dashboard"
            variant="side-primary"
            leftIcon={<Home />}
            size="very-big"
          />
          <Button
            label="Dashboard"
            variant="side-primary"
            leftIcon={<Home />}
            size="very-big"
          />
          <Button
            label="Dashboard"
            variant="side-primary"
            leftIcon={<Home />}
            size="very-big"
          />
        </div>
      </div>

      <p>Pagination</p>
      <div className="flex justify-start">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            isFree={card.isFree}
            hasDiscount={card.hasDiscount}
            discountPrice={card.discountPrice}
            ratingNum={card.ratingNum}
          />
        ))}
      </div>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        <div className="space-y-20">
          {testimonials.map((testi, index) => (
            <Testi
              key={index}
              testimonial={testi.testimonial}
              img={testi.img}
              name={testi.name}
              job={testi.job}
            />
          ))}
        </div>
      </div>
      {/*Footer*/}
      <p>Footer</p>
      <Footer />
    </div>
  );
}

export default App;
