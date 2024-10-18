import React from "react";
import { VideoSquare, TickCircle, Book } from "iconsax-react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import ClassHeader from "../components/ClassHeader";
import Avatar from "../assets/avatar1.png";
import Button from "../components/Button";
import Accordion from "../components/Accordion";
import Rating from "../components/RatingReview";

const benefitsList = [
  "Akses kelas seumur hidup",
  "Video Materi",
  "Materi Baca",
  "Sertifikat",
];

const accordionItems = [
  {
    title: "Pengenalan UI/UX",
    subItems: [
      {
        content: "3 Video",
        logo: <VideoSquare size={16} />,
        duration: "7:21 mnt",
      },
      {
        content: "2 Modul",
        logo: <Book size={16} />,
        duration: "5:15 mnt",
      },
      {
        content: "1 Quiz",
        logo: <Book size={16} />,
        duration: "10:00 mnt",
      },
      // Add more sub-items as needed, up to 5
    ],
  },
  {
    title: "Pengantar Design Thinking",
    subItems: [
      {
        content: "4 Video",
        logo: <VideoSquare size={16} />,
        duration: "15:30 mnt",
      },
      {
        content: "3 Modul",
        logo: <Book size={16} />,
        duration: "20:00 mnt",
      },
      // Add more sub-items as needed, up to 5
    ],
  },
  {
    title: "UI/UX Dalam Dunia Digital",
    subItems: [
      {
        content: "2 Video",
        logo: <VideoSquare size={16} />,
        duration: "10:45 mnt",
      },
      // Add more sub-items as needed, up to 5
    ],
  },
  {
    title: "Tools untuk Desain UI/UX",
    subItems: [
      {
        content: "5 Video",
        logo: <VideoSquare size={16} />,
        duration: "25:00 mnt",
      },
      // Add more sub-items as needed, up to 5
    ],
  },
  {
    title: "Proses Desain UI/UX",
    subItems: [
      {
        content: "3 Modul",
        logo: <Book size={16} />,
        duration: "30:00 mnt",
      },
      // Add more sub-items as needed, up to 5
    ],
  },
  {
    title: "Tren Masa Kini Terkait UI/UX",
    subItems: [
      {
        content: "2 Video",
        logo: <VideoSquare size={16} />,
        duration: "12:30 mnt",
      },
      // Add more sub-items as needed, up to 5
    ],
  },
];

const classData = {
  category: "UI/UX Research & Design",
  title: "UI/UX Fundamental",
  level: "Pemula",
  module: "6 Modul",
  time: "3 Jam Belajar",
  img: Avatar,
  name: "John Doe",
  job: "Software Engineer",
  description:
    "Kursus UI/UX Fundamental ini dirancang untuk memberikan pemahaman mendalam bagi siapa pun yang ingin memulai karier di bidang desain antarmuka pengguna (UI) dan pengalaman pengguna (UX). Kursus ini menawarkan materi komprehensif bagi pemula, termasuk pengenalan UI/UX, pengantar konsep Design Thinking, serta peran penting UI/UX dalam pengembangan produk digital. Peserta akan diajak memahami bagaimana desain yang baik mampu meningkatkan kepuasan pengguna dan keberhasilan produk. Peserta juga akan diperkenalkan pada tools populer seperti Figma dan Adobe XD untuk membuat desain antarmuka dan prototipe interaktif. Peserta juga akan belajar proses lengkap desain UI/UX, mulai dari riset pengguna, pembuatan wireframe, hingga pengujian prototipe untuk memastikan produk memenuhi kebutuhan pengguna. Kursus ini juga membahas tren terbaru dalam UI/UX, seperti desain responsif dan microinteractions, sehingga peserta dapat terus mengikuti perkembangan di dunia desain.",
};

function App() {
  return (
    <div className="w-full min-h-screen">
      <div className="container mx-auto px-7">
        <Navbar />
      </div>
      <div className="flex items-start  gap-x-16 justify-center py-10 px-[120px]">
        <ClassHeader
          category={classData.category}
          title={classData.title}
          level={classData.level}
          module={classData.module}
          time={classData.time}
          img={classData.img}
          job={classData.job}
          name={classData.name}
          description={classData.description}
        />
        <div className="flex flex-col gap-10">
          <div className="flex justify-between gap-x-64">
            <h1 className="font-bold text-4xl">Rp.700.000</h1>
            <Button
              type="button"
              size="small"
              variant="primary"
              label={"Beli Kelas"}
            />
          </div>
          <div className="">
            <h1 className="text-2xl font-bold mb-4">Modul</h1>
            <Accordion items={accordionItems} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold mb-4">Yang akan kamu dapatkan</h1>
            <ul className="list-disc list-inside">
              {benefitsList.map((benefit, index) => (
                <li key={index} className="flex items-center mb-4 text-base">
                  <TickCircle size="24" className="mr-2" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
          <div className="">
            <h1 className="text-2xl font-bold">Ulasan</h1>
            <Rating />
          </div>
        </div>
      </div>
      <div className="flex items-start gap-x-16 justify-start py-10 px-[120px]">
        <h1 className="text-4xl font-bold">Kelas Lainnya</h1>
      </div>
    </div>
  );
}

export default App;
