import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { courseData, userData } from "../../data";
import Button from "../../components/Button";
import NavbarDashboard from "../../components/NavbarDashboard";
import Cookies from "js-cookie";
import TransactionDetailCard from "../../components/TransactionDetailCard";
import { jwtDecode } from "jwt-decode";
import {
  Category,
  Home,
  LogoutCurve,
  Monitor,
  Ticket,
  Wallet,
  Cup,
} from "iconsax-react";

const DetailTransaksi = () => {
  const { transactionId } = useParams();
  const [transaction, setTransaction] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState("");
  const token = Cookies.get("accessToken");
  const handleNavigation = (path) => {
    navigate(path);
  };
  useEffect(() => {
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

  const handleCheckout = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_SERVER_API_KEY
        }/api/purchase-course/${transactionId}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      console.log(data); // Log the response to check for error details
      if (!response.ok) {
        throw new Error(
          `Error: ${data.message || "Failed to initiate checkout"}`
        );
      }

      if (data.snap_token) {
        const snapContainer = document.getElementById("snap-container");
        if (!snapContainer || snapContainer.childElementCount === 0) {
          document.body.style.overflow = "hidden";
          document.getElementById("snap-overlay").style.display = "flex";
          snapEmbed(data.snap_token, "snap-container", {
            onSuccess: (result) => {
              console.log("Payment success:", result);
              navigate(`/user/detail-transaksi/${transactionId}`);
            },
            onPending: (result) => {
              console.log("Payment pending:", result);
              navigate(`/pending/${transactionId}`);
            },
            onError: (result) => {
              console.error("Payment error:", result);
              navigate(`/error`);
            },
            onClose: () => {
              console.warn("Payment popup closed");
              closePopup();
            },
          });
        } else {
          console.warn("Snap instance is already active.");
        }
      } else {
        console.error("No snap_token found in response:", data);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const closePopup = () => {
    document.body.style.overflow = "auto";
    document.getElementById("snap-overlay").style.display = "none";
  };

  const course = Array.isArray(transaction)
    ? transaction.find((item) => item.transactionId === transactionId)
    : transaction;

  if (!course) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  const handleLogout = () => {
    Cookies.remove("accessToken");
    navigate("/masuk");
  };
  const isPending = course.status === "pending";

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
            />{" "}
            <Button
              label="Sertifikat"
              variant="side-primary"
              leftIcon={<Cup />}
              size="very-big"
              onClick={() => handleNavigation("/user/sertifikat")}
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
            isLoading={isLoading}
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
                onClick={handleCheckout}
                payment_method={
                  course.payment_method === "bank_transfer"
                    ? "VA"
                    : course.payment_method
                }
              />
              {isPending && (
                <Button
                  label="Beli ulang"
                  variant="primary"
                  size="small"
                  onClick={handleCheckout}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        id="snap-overlay"
        className="fixed inset-0 w-full z-50 bg-white bg-opacity-90 hidden justify-center items-center"
        onClick={closePopup}
      >
        <div
          id="snap-container"
          className="h-[70%] bg-white rounded-lg shadow-lg p-4 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        ></div>
      </div>
    </section>
  );
};

export default DetailTransaksi;
