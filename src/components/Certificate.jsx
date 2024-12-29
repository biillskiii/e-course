import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import Sertifikat from "../assets/sertif.png";
import Pita from "../assets/pita.png";
import { QRCodeSVG } from "qrcode.react";
import Button from "./Button";
import { DocumentDownload } from "iconsax-react";
import { useNavigate } from "react-router-dom";

const CertificateGenerator = ({ name, course, code, date, onClick }) => {
  const certificateRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  }
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return `${formattedDate}`;
  };

  
  const generatePDF = async () => {
    try {
      const certificate = certificateRef.current;

      const canvas = await html2canvas(certificate, {
        scale: 5,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF("l", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`certificate-${name.replace(/\s+/g, "-").toLowerCase()}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };
  return (
    <div
      className="relative flex flex-col items-center gap-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ width: "320px", height: "224px" }}
    >
      {/* Dark overlay on hover */}
      {isHovered && (
        <div
          className="absolute inset-0 bg-black bg-opacity-40 z-20"
          style={{ width: "320px", height: "224px" }}
        />
      )}

      {/* Button appears on hover */}
      {isHovered && (
        <div className="absolute inset-0 flex items-center justify-center z-30">
          <Button
            label="Lihat Sertifikat"
            rightIcon={<DocumentDownload />}
            size="big"
            onClick={generatePDF}
          />
        </div>
      )}

      <div
        ref={certificateRef}
        style={{
          width: "320px",
          height: "224px",
          position: "relative",
          zIndex: "10",
        }}
      >
        <img
          src={Sertifikat}
          alt="Certificate Background"
          style={{
            position: "absolute",
            width: "320px",
            height: "224px",
            objectFit: "cover",
            transition: "all 0.3s ease",
          }}
        />
        <div className="flex flex-col items-center justify-start pt-2">
          <h1 className="mango text-center text-primary-500 text-[16px]">
            PIXEL<span className="text-secondary-500">CODE.</span>
          </h1>

          <p className="text-center font-bold text-[5px] text-primary-500">
            No: {code}
          </p>

          <p className="text-center font-bold text-sm">
            CERTIFICATE OF COMPLETION
          </p>
          <p className="text-center text-[7px] mt-1">
            This certificate is proudly presented to
          </p>
          <h1 className="text-primary-500 text-base mt-1 font-semibold">
            {name}
          </h1>
          <p className="text-center text-[5px] mt-1">
            Has successfully completed
          </p>
          <p className="text-center font-semibold text-[8px] capitalize">
            {course}
          </p>
          <p className="text-center font-semibold text-[4px] mt-1">
            {formatTimestamp(date)}
          </p>
        </div>
        <div className="flex items-center justify-center w-[320px] gap-x-5 px-5 mt-2">
          <div className="flex flex-col items-center">
            <p className="font-bold text-[5px] text-primary-500">SIGN</p>
            <hr className="w-[40px] mt-5" />
            <p className="font-bold mt-1 text-[5px]">Arif Saifunnasrullah</p>
            <p className="font-semibold text-[5px]">Director</p>
          </div>
          <img src={Pita} alt="pita" width={31.48} />
          <div className="flex flex-col items-center">
            <QRCodeSVG value={`https://localhost:5173/${code}`} size={32} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateGenerator;
