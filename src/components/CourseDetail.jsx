import React, { useState, useEffect } from "react";
import ClassHeader from "./ClassHeader";
import Chapter from "./Chapter";
import Accordion from "./Accordion";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import useSnap from "../hooks/useSnap";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const CourseDetail = () => {
  const { id } = useParams();
  const [classDetail, setClassDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPurchased, setIsPurchased] = useState(false);
  const navigate = useNavigate();
  const { snapEmbed } = useSnap();
  const [profileImage, setProfileImage] = useState(null);
  const token = Cookies.get("accessToken");
  const handleCheckout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API_KEY}/api/purchase-course/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to initiate checkout");
      }

      const data = await response.json();

      if (data.snap_token) {
        // Check if Snap is already in view
        const snapContainer = document.getElementById("snap-container");
        if (!snapContainer || snapContainer.childElementCount === 0) {
          document.body.style.overflow = "hidden";
          document.getElementById("snap-overlay").style.display = "flex";
          snapEmbed(data.snap_token, "snap-container");
          if (data.snap_token) {
            const snapContainer = document.getElementById("snap-container");
            if (!snapContainer || snapContainer.childElementCount === 0) {
              document.body.style.overflow = "hidden";
              document.getElementById("snap-overlay").style.display = "flex";
              snapEmbed(data.snap_token, "snap-container", {
                onSuccess: function (result) {
                  console.log("Payment success:", result);
                  navigate(`/user/detail-transaksi/${id}`);
                },
                onPending: function (result) {
                  console.log("Payment pending:", result);
                  navigate(`/pending/${id}`);
                },
                onError: function (result) {
                  console.error("Payment error:", result);
                  navigate(`/error`);
                },
                onClose: function () {
                  console.warn("Payment popup closed");
                  closePopup();
                },
              });
            } else {
              console.warn("Snap instance is already active.");
            }
          }
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
  const fetchProfileData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API_KEY}/api/user`, // Endpoint API
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      // setProfileData(result.user);
      setProfileImage(
        result.user.path_photo ||
          "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png"
      );
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };
  const fetchClassDetail = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API_KEY}/api/courses/${id}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setClassDetail(result.data);
    } catch (error) {
      console.error("Error fetching class detail:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const checkPurchaseStatus = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API_KEY}/api/usertransactions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const transactions = await response.json();
      const hasPurchased = transactions.some(
        (transaction) => transaction.course.id === parseInt(id)
      );

      setIsPurchased(hasPurchased);
    } catch (error) {
      console.error("Error checking purchase status:", error);
    }
  };

  useEffect(() => {
    fetchProfileData();
    fetchClassDetail();
    checkPurchaseStatus();
  }, [id]);

  const closePopup = () => {
    document.body.style.overflow = "auto";
    document.getElementById("snap-overlay").style.display = "none";
  };

  if (isLoading) {
    return (
      <div>
        <Navbar avatar={profileImage} />
        <div className="flex justify-center items-center h-screen">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <NavbarDashboard />
        <div className="flex justify-center items-center h-screen text-red-500">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar avatar={profileImage} />
      <div className="flex justify-between px-32 my-20 gap-x-32">
        {classDetail ? (
          <>
            <ClassHeader
              category={
                classDetail.category.category_name ||
                "Nama Kelas Tidak Tersedia"
              }
              title={classDetail.class_name || "Nama Kelas Tidak Tersedia"}
              imgMentor={classDetail.mentor?.path_photo || ""}
              img={classDetail.path_photo || ""}
              description={classDetail.description || "Tidak ada deskripsi"}
              name={classDetail.mentor?.name || "Nama Mentor Tidak Tersedia"}
              job={classDetail.mentor?.specialist || "Spesialis Tidak Tersedia"}
            />
            <div className="w-full">
              <Chapter
                price={classDetail.price}
                hasDiscount={classDetail.price_discount}
                label={isPurchased ? "Kelas Sudah Dibeli" : "Beli Kelas"}
                onClick={() => handleCheckout()}
                isDisabled={isPurchased}
                variant={isPurchased ? "disable" : "primary"}
                size={isPurchased ? "big" : "small"}
              />
              {classDetail.chapters && classDetail.chapters.length > 0 ? (
                <Accordion items={classDetail.chapters} />
              ) : (
                <p className="text-gray-500">Tidak ada chapter tersedia</p>
              )}
            </div>
          </>
        ) : (
          <div className="w-full text-center text-gray-500">
            Tidak ada detail kelas tersedia
          </div>
        )}
      </div>

      {/* Overlay */}
      <div
        id="snap-overlay"
        className="fixed inset-0 w-full z-50 bg-white bg-opacity-90 hidden justify-center items-center"
        onClick={closePopup}
      >
        <div
          id="snap-container"
          className=" h-[70%] bg-white rounded-lg shadow-lg p-4 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        ></div>
      </div>
    </div>
  );
};

export default CourseDetail;
