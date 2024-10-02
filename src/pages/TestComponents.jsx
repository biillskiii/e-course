import { Home } from "iconsax-react";
import Button from "../components/Button";
import Label from "../components/Label";
import InputBase from "../components/InputForm";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";
import { useState } from "react";
import Card from "../components/Card";
import Avatar from "../assets/avatar1.png";
const cardData = [
  {
    img:  Avatar,
    title: "Learn React",
    name: "John Doe",
    job: "Software Engineer",
    level: "Beginner",
    rating: 4,
    price: "Rp.500.000,00",
    ratingNum: "4.5",
  },
  {
    img: Avatar,
    title: "Master JavaScript",
    name: "Jane Smith",
    job: "Frontend Developer",
    level: "Intermediate",
    rating: 5,
    price: "Rp.500.000,00",
    ratingNum: "5.0",
  },
  {
    img: Avatar,
    title: "CSS for Beginners",
    name: "Robert Johnson",
    job: "UI/UX Designer",
    level: "Beginner",
    rating: 3,
    price: "Rp.500.000,00",
    ratingNum: "3.0",
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
            ratingNum={card.ratingNum}
          />
        ))}
      </div>
      {/*Footer*/}
      <p>Footer</p>
      <Footer />
    </div>
  );
}

export default App;
