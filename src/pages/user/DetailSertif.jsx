import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import Sertifikat from "../../assets/sertif.png";
import Pita from "../../assets/pita.png";
import { QRCodeSVG } from "qrcode.react";

const CertificateDetail = () => {
  const { certificate_code } = useParams(); // Get the certificate ID from the URL params
  const [certificate, setCertificate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const certificateRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_LOCAL_API_KEY
          }/api/certificate/${certificate_code}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();
        setCertificate(result);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching certificate details:", error);
      }
    };

    fetchCertificate();
  }, [certificate_code]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const generatePDF = async () => {
    try {
      const certificateElem = certificateRef.current;

      const canvas = await html2canvas(certificateElem, {
        scale: 5,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      // Convert to PDF
      const imgData = canvas.toDataURL("image/jpeg", 1.0);

      const pdf = new jsPDF("l", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(
        `certificate-${certificate.user.name
          .replace(/\s+/g, "-")
          .toLowerCase()}.pdf`
      );
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!certificate) {
    return <div>Certificate not found.</div>;
  }

  return (
    <div className="certificate-detail">
      <h1 className="text-2xl font-bold">Certificate Detail</h1>

      <div ref={certificateRef} style={{ width: "320px", height: "224px" }}>
        <img
          src={Sertifikat}
          alt="Certificate Background"
          style={{
            position: "absolute",
            width: "320px",
            height: "224px",
            objectFit: "cover",
          }}
        />
        <div className="flex flex-col items-center justify-start pt-2">
          <h1 className="mango text-center text-primary-500 text-[16px]">
            PIXEL<span className="text-secondary-500">CODE.</span>
          </h1>
          <p className="text-center font-bold text-[5px] text-primary-500">
            No: {certificate.certificate_code}
          </p>
          <p className="text-center font-bold text-sm">
            CERTIFICATE OF COMPLETION
          </p>
          <p className="text-center text-[7px] mt-1">
            This certificate is proudly presented to
          </p>
          <h1 className="text-primary-500 text-base mt-1 font-semibold">
            {certificate.user.name}
          </h1>
          <p className="text-center text-[5px] mt-1">
            Has successfully completed
          </p>
          <p className="text-center font-semibold text-[8px] capitalize">
            {certificate.course.class_name}
          </p>
          <p className="text-center font-semibold text-[4px] mt-1">
            {formatTimestamp(certificate.created_at)}
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
            <QRCodeSVG
              value={`https://localhost:51567/${certificate.certificate_code}`}
              size={32}
            />
          </div>
        </div>
      </div>

      <button
        onClick={generatePDF}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Download Certificate as PDF
      </button>

      <button onClick={() => navigate(-1)} className="mt-4 text-blue-500">
        Go Back
      </button>
    </div>
  );
};

export default CertificateDetail;
