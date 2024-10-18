import React from "react";
import { DirectInbox, Whatsapp, Instagram } from "iconsax-react";
import Navbar from "../components/Navbar";
import InputBase from "../components/InputForm";
import Footer from "../components/Footer";
const ContactUs = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col  max-w-5xl mx-auto px-4 my-10 py-8">
        <h1 className="text-3xl font-bold mb-6">Hubungi Kami</h1>
        <p className="text-gray-600 mb-8">
          Silakan masukkan pertanyaan atau pesan yang ingin Anda sampaikan
          kepada kami.
        </p>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full h-[260px] border-2 border-primary-500/50 p-5 rounded-lg md:w-1/3">
            <h2 className="text-xl font-semibold mb-4">Kontak Kami</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <DirectInbox className="w-5 h-5 text-teal-500 mr-2" />
                <span>Email</span>
              </div>
              <div className="flex items-center">
                <Whatsapp className="w-5 h-5 text-teal-500 mr-2" />
                <span>WhatsApp</span>
              </div>
              <div className="flex items-center">
                <Instagram className="w-5 h-5 text-teal-500 mr-2" />
                <span>Instagram</span>
              </div>
            </div>
          </div>

          <div className="w-full border-primary-500/50 border-2 p-5 rounded-lg md:w-2/3">
            <form className="space-y-4">
              <InputBase
                label="Nama"
                id="name"
                type="text"
                placeholder="Masukkan nama lengkap Anda"
              />
              <InputBase
                label="Email"
                id="email"
                type="email"
                placeholder="Masukkan alamat email Anda"
              />
              <InputBase
                label="Subjek"
                id="subject"
                type="text"
                placeholder="Masukkan subjek pesan Anda"
              />
              <div>
                <InputBase
                  label="Pesan"
                  id="message"
                  type="textarea"
                  placeholder="Masukkan pesan yang ingin Anda sampaikan"
                  rows={6} // Optionally specify the number of rows
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Kirim
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
