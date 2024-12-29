import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { courseData, userData } from "../../data";
import Label from "../../components/Label";
import {
  Copy,
  Home,
  Monitor,
  Ticket,
  Wallet,
  Category,
  LogoutCurve,
} from "iconsax-react";
import Button from "../../components/Button";
import NavbarDashboard from "../../components/NavbarDashboard";
import Mandiri from "../../assets/mandiri.png";
import Qris from "../../assets/qris.png";
import QrisQRCode from "../../assets/QRCode.png";
import TransactionDetailCard from "../../components/TransactionDetailCard";
import { jwtDecode } from "jwt-decode";
const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
  // Optionally add a toast/notification here
};

const DetailTransaksi = () => {
  const { transactionId } = useParams();
  const [transaction, setTransaction] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState("");
  const handleNavigation = (path) => {
    navigate(path);
  };
  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      navigate("/masuk");
      return;
    }
    try {
      const decodedToken = jwtDecode(token);
      setUserProfile({
        username: decodedToken.name || "",
        avatar:
          decodedToken.avatar ||
          "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png",
      });
    } catch (error) {
      console.error("Error decoding token:", error);
      navigate("/masuk");
    }
  }, [navigate]);

  const fetchClasses = async () => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      console.error("No token found.");
      navigate("/masuk");
      return;
    }

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_SERVER_API_KEY
        }/api/usertransactions/${transactionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setTransaction(result);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching classes:", error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchClasses();
  }, [transactionId]);

  // Handle single object or array response
  const course = Array.isArray(transaction)
    ? transaction.find((item) => item.transactionId === transactionId)
    : transaction; // Use directly if it's an object

  if (!course) {
    return (
      <tr className="w-full h-screen flex justify-center items-center">
        <td colSpan="4" className="py-10 text-center">
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        </td>
      </tr>
    );
  }

  const isPending = course.status === "Menunggu Pembayaran";
  const isSuccessful = course.status === "Pembayaran Berhasil";

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    navigate("/masuk");
  };

  return (
    <section>
      <div>
        {/* Sidebar */}
        <div className="w-60 fixed min-h-screen bg-white shadow-lg flex flex-col justify-between items-center p-5">
          <div className="space-y-6">
            <a href="/">
              <h1 className="mango  text-center text-secondary-500 text-[40px] mb-10">
                PIXEL<span className="text-primary-500">CODE.</span>
              </h1>
            </a>
            <Button
              label="Dashboard"
              variant="side-primary"
              leftIcon={<Home />}
              size="very-big"
              onClick={() => handleNavigation("/user/dashboard")}
            />
            <Button
              label="Kelas"
              variant="side-primary"
              leftIcon={<Monitor />}
              size="very-big"
              onClick={() => handleNavigation("/user/kelas")}
            />
            <Button
              label="Webinar"
              variant="disable"
              leftIcon={<Ticket />}
              size="very-big"
              onClick={() => handleNavigation("/user/webinar")}
            />
            <Button
              label="Daftar Transaksi"
              active={true}
              variant="side-primary"
              leftIcon={<Wallet />}
              size="very-big"
              onClick={() => handleNavigation("/user/daftar-transaksi")}
            />
            <Button
              label="Pengaturan"
              variant="side-primary"
              leftIcon={<Category />}
              size="very-big"
              onClick={() => handleNavigation("/user/pengaturan")}
            />
          </div>
          <div className="mt-20">
            <Button
              label="Keluar"
              variant="side-danger"
              leftIcon={<LogoutCurve />}
              size="very-big"
              onClick={handleLogout}
            />
          </div>
        </div>
        <div className="w-full pl-60">
          <NavbarDashboard
            avatar={userProfile.avatar}
            username={userProfile.username}
            isLoading={true}
          />
          <div className="w-full flex flex-col p-10">
            <div className="flex flex-col gap-8">
              <h1 className="font-bold text-3xl">Detail Transaksi</h1>
              <TransactionDetailCard
                img={course.course.path_photo}
                transaction_id={course.transaction_id}
                title={course.course.class_name}
                price={course.course.price}
                status={course.status}
                date={course.updated_at}
                payment_method={
                  course.payment_method === "bank_transfer"
                    ? "VA"
                    : course.payment_method
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailTransaksi;
