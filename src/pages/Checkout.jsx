import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { ArrowUp2, ArrowDown2, Camera, Check, Copy } from "iconsax-react";
import Briva from "../assets/briva.png";
import Bca from "../assets/bca.png";
import Bni from "../assets/bni.png";
import Mandiri from "../assets/mandiri.png";
import Button from "../components/Button";
import Label from "../components/Label";
import Footer from "../components/Footer";

const CheckoutStep = ({ number, title, isActive, isCompleted }) => (
  <div
    className={`w-[346px] flex justify-start items-center gap-2 pb-3 border-b ${
      isActive || isCompleted ? "border-primary-500" : "border-primary-200"
    }`}
  >
    <div
      className={`flex items-center justify-center font-semibold rounded-full w-14 h-14 ${
        isActive || isCompleted
          ? "bg-primary-500 text-white"
          : "bg-primary-200 text-white"
      }`}
    >
      {isCompleted ? number : number}
    </div>
    <div>
      <p
        className={
          isActive || isCompleted
            ? "text-primary-500 text-xs"
            : "text-primary-500 text-xs"
        }
        j
      >
        Langkah {number}
      </p>
      <p
        className={`text-base font-medium ${
          isActive || isCompleted ? "text-black" : "text-black"
        }`}
      >
        {title}
      </p>
    </div>
  </div>
);

const PaymentOption = ({ bank, logo, isSelected, onClick }) => (
  <div
    className={`flex justify-between items-center p-4 border-b  ${
      isSelected ? "bg-primary-50" : ""
    } cursor-pointer`}
    onClick={onClick}
  >
    <div className="flex items-center gap-4">
      <input type="radio" checked={isSelected} readOnly />
      <span>{bank}</span>
    </div>
    <img src={logo} alt={`${bank} logo`} className="h-8" />
  </div>
);

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);
  const [virtualAccountNumber] = useState("88810123456789");

  useEffect(() => {
    const savedStep = localStorage.getItem("activeStep");
    if (savedStep) {
      setActiveStep(parseInt(savedStep, 10));
    }
  }, []);

  // Simpan nilai activeStep ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem("activeStep", activeStep);
  }, [activeStep]);

  const steps = [
    { number: 1, title: "Pembelian" },
    { number: 2, title: "Metode Pembayaran" },
    { number: 3, title: "Pembayaran" },
  ];

  const banks = [
    { name: "BRI", logo: Briva },
    { name: "BCA", logo: Bca },
    { name: "BNI", logo: Bni },
    { name: "MANDIRI", logo: Mandiri },
  ];

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  const handleBankSelection = (bankName) => {
    setSelectedBank(bankName);
    setActiveStep(2); // Pindah ke step 2 setelah bank dipilih
  };

  const goToNextStep = () => {
    setActiveStep(2);
  };

  const goToPreviousStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const handlePayment = () => {
    setActiveStep(3); // Pindah ke step 3
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Optionally add a toast/notification here
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Navbar variant="logo-only" />
      <div className="flex px-[120px] justify-center items-center mt-20">
        <div className="flex gap-32">
          {steps.map((step) => (
            <CheckoutStep
              key={step.number}
              number={step.number}
              title={step.title}
              isActive={step.number === activeStep}
              isCompleted={step.number < activeStep}
            />
          ))}
        </div>
      </div>
      {activeStep === 1 && (
        <div className="mt-16 px-[120px] pb-20">
          <h2 className="text-2xl font-bold mb-6">Produk</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-start gap-6">
              <div className="w-48 h-48 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Camera size={64} className="text-yellow-500" />
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-semibold">UI/UX Fundamental</h3>
                <p className="text-3xl font-bold mt-2">Rp560.000</p>
                <div className="mt-4">
                  <label
                    htmlFor="promo"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Kode Promo
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="text"
                      name="promo"
                      id="promo"
                      className="flex-grow focus:ring-primary-500 focus:border-primary-500 block w-full rounded-full sm:text-sm border-gray-500"
                      placeholder="Masukkan kode promo"
                    />
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Pakai
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h4 className="font-semibold mb-4">Rincian Pembelian</h4>
              <div className="flex justify-between items-center mb-2">
                <span>Harga</span>
                <span>Rp560.000</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span>PPN 10%</span>
                <span>Rp56.000</span>
              </div>
              <div className="flex justify-between items-center font-bold mt-4 pt-4 border-t border-primary-300">
                <span>Total Bayar</span>
                <span>Rp616.000</span>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              {activeStep === 1 && (
                <button
                  onClick={goToNextStep}
                  className="px-6 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
                >
                  Pilih Metode Pembayaran
                </button>
              )}
              {activeStep === 2 && (
                <button
                  onClick={goToPreviousStep}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors mr-4"
                >
                  Kembali ke Pembelian
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      {activeStep === 2 && (
        <div className="gap-x-32 flex mt-16 pb-20 px-[120px]">
          <div className="w-full">
            <p className="font-bold text-2xl">Metode Pembayaran</p>
            <p className="mt-8"> Virtual Account (Pengecekkan Otomatis)</p>
            <div className="mt-4 border-2 border-primary-500 rounded-lg overflow-hidden">
              <div
                className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
                onClick={toggleAccordion}
              >
                <span className="font-medium">
                  Virtual Account (Pengecekkan Otomatis)
                </span>
                {isAccordionOpen ? <ArrowUp2 /> : <ArrowDown2 />}
              </div>
              {isAccordionOpen && (
                <div>
                  {banks.map((bank) => (
                    <PaymentOption
                      key={bank.name}
                      bank={bank.name}
                      logo={bank.logo}
                      isSelected={selectedBank === bank.name}
                      onClick={() => handleBankSelection(bank.name)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="w-full">
            <p className="font-bold text-2xl">Rincian Pembelian</p>
            <div className="flex justify-between items-center mt-8">
              <p className="">Harga</p>
              <p className="">Rp560.000</p>
            </div>
            <div className="flex border-b pb-8   border-primary-500 justify-between items-center mt-8">
              <p className="">PPN 10%</p>
              <p className="">Rp.56.000</p>
            </div>
            <div className="flex justify-between items-center mt-8">
              <p className="font-bold">Total Bayar</p>
              <p className="">Rp.56.000</p>
            </div>
            <div className="flex gap-4 mt-14 justify-end items-center w-full pl-72">
              <Button
                label={"Kembali"}
                variant="secondary"
                onClick={goToPreviousStep}
              />
              <Button
                label={"Bayar"}
                variant="primary"
                onClick={handlePayment}
                disabled={!selectedBank}
              />
            </div>
          </div>
        </div>
      )}
      {activeStep === 3 && (
        <div className="flex items-start gap-x-16 justify-center pt-10 pb-20 px-[120px]">
          <div className="w-full">
            <h1 className="text-2xl font-bold mb-6">Pembayaran</h1>
            <div className="w-full flex gap-x-10">
              <div>
                <p>Batas Waktu Pembayaran</p>
                <h1 className="text-2xl font-bold">59:27</h1>
              </div>
              <div>
                <p>Kode Pembayaran</p>
                <div className="flex gap-x-4">
                  <h1 className="text-2xl font-bold">{virtualAccountNumber}</h1>
                  <button
                    onClick={() => copyToClipboard(virtualAccountNumber)}
                    className=""
                  >
                    <Copy size={24} className="text-primary-500" />
                  </button>
                </div>
              </div>
            </div>
            <div className="border-2 border-primary-300 border-opacity-40 rounded-3xl p-4 mt-10">
              <h1 className="text-2xl font-bold ">Cara Pembayaran</h1>
              <div className="mt-6">
                <div className="space-y-6">
                  <h1 className="text-xl font-medium">ATM Mandiri</h1>
                  <ol className="space-y-6">
                    <li>Masukkan Kartu ATM dan PIN ATM</li>
                    <li>Pilih menu Bayar/Beli</li>
                    <li>Pilih opsi Lainnya ? Multipayment</li>
                    <li>
                      Masukkan kode biller perusahaan (biasanya sudah tercantum
                      di instruksi pembayaran)
                    </li>
                    <li>Masukkan nomor Virtual account ? Benar</li>
                    <li>
                      Masukkan angka yang diminta untuk memilih tagihan ? Ya
                    </li>
                  </ol>
                </div>
                <hr className="my-8 border-2 border-primary-300 border-opacity-40"></hr>
                <div className="space-y-6">
                  <h1 className="text-xl font-medium">M-Banking</h1>
                  <ol className="space-y-6">
                    <li>Masuk aplikasi Livin by Mandiri</li>
                    <li>Klik Menu Bayar/VA pada beranda</li>
                    <li>
                      Klik menu merchant atau masukkan VA di kolom pencarian
                    </li>
                    <li>Pilih sumber dana</li>
                    <li>Klik Lanjutkan</li>
                    <li>Masukkan PIN Livin</li>
                    <li>Bayar tagihan berhasil</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <h1 className="text-2xl font-bold mb-6">Ringkasan Pembelian</h1>
            <div className="w-full flex items-start justify-center">
              <div className="w-full mb-8 space-y-2">
                <p>No. Tagihan</p>
                <h1 className="text-2xl font-bold">AB20240701</h1>
              </div>
              <div className="w-full space-y-2">
                <p>Total Tagihan</p>
                <h1 className="text-2xl font-bold">Rp616.000</h1>
              </div>
            </div>
            <div className="w-full flex items-start justify-center">
              <div className="w-full space-y-2">
                <p>Metode Pembayaran</p>
                <img src="src/assets/mandiri.png" className="w-[90px]"></img>
              </div>
              <div className="w-full space-y-2">
                <p>Status Pembayaran</p>
                <div className="pr-16">
                  <Label
                    label="Menunggu Pembayaran"
                    variant={"pending"}
                    size="w-[233px] h-[44px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Checkout;
