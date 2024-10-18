import React, { useState } from "react";
import { Instagram, Whatsapp } from "iconsax-react";
import { Icon } from "@iconify/react";

const Footer = () => {
  return (
    <footer className="bg-primary-600 text-white px-60">
      <div className=" mx-auto grid  md:grid-cols-3 gap-4 py-14 ">
        {/* Left Section */}
        <div className="space-y-4">
          <h1 className="text-5xl font-bold pb-4 mango">PIXELCODE.</h1>
          <p className="pb-10">
            Tingkatkan keterampilan dan bangun masa depan digitalmu dengan
            pembelajaran yang inspiratif bersama kami.
          </p>
          <h1 className=" font-bold text-sm">Alamat Kantor</h1>
          <p className="text-sm">
            AD Premier Lantai 17 Suite 04 B, Jl. TB. SImatupang No. 5 Desa/Kel.
            Ragunan, Kec. Pasar Minggu, Kota ADM. Jakarta Selatan. <br /> <br />
            Perum D Livia Gading No. 3, Kel. Kalisegoro, Kec. Gunungpati, Kota
            Semarang
          </p>
        </div>

        {/* Middle and Right Sections wrapped together */}
        <div className="flex justify-end space-x-20 md:col-span-2">
          {/* Menu Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Menu</h2>
            <ul className="space-y-10 py-4">
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
              <li>
                <a href="#" className="hover:underline">
                  Hubungi Kami
                </a>
              </li>
            </ul>
          </div>

          {/* Media Sosial Section */}
          <div className="space-y-4 flex flex-col ">
            <h2 className="text-xl font-semibold">Media Sosial</h2>
            <ul className="space-y-10 py-4">
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
      <p className="font-bold flex justify-end pb-8">Syarat & Ketentuan Layanan Kami</p>
    </footer>
  );
};

export default Footer;
