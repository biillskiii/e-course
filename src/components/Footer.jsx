import React, { useState } from "react";
import { Instagram, Whatsapp } from "iconsax-react";
import { Icon } from "@iconify/react";

const Footer = () => {
  return (
    <footer className="bg-primary-600 text-white">
      <div className="container mx-auto grid  md:grid-cols-3 gap-4 py-14 px-28">
        {/* Left Section */}
        <div className="space-y-4">
          <h1 className="text-5xl font-bold pb-4 mango">PIXELCODE.</h1>
          <p className="pb-20">
            Tingkatkan keterampilan dan bangun masa depan digitalmu dengan
            pembelajaran yang inspiratif bersama kami.
          </p>
          <p className="text-sm">
            copyright Serpihan Tech @ 2024 - All Right Reserved
          </p>
        </div>

        {/* Middle and Right Sections wrapped together */}
        <div className="flex justify-end space-x-20 md:col-span-2">
          {/* Menu Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Menu</h2>
            <ul className="space-y-4 py-4">
              <li>
                <a href="#" className="hover:underline">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Kelas
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Webinar
                </a>
              </li>
            </ul>
          </div>

          {/* Media Sosial Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Media Sosial</h2>
            <ul className="space-y-4 py-4">
              <li>
                <a
                  href="https://www.instagram.com/serphiantech"
                  className="flex items-center space-x-2 hover:underline"
                >
                  <Instagram />
                  <span>@serpihantech</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:serphiantechsolution@gmail.com"
                  className="flex items-center space-x-2 hover:underline"
                >
                  <Icon icon="simple-icons:gmail" width={"24"} height={"18"} />
                  <span>serpihantechsolution@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/08515057822"
                  className="flex items-center space-x-2 hover:underline"
                >
                  <Whatsapp />
                  <span>08515057822</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
