import React, { useState, useEffect } from "react";
import ClassHeader from "../../components/ClassHeader";
import Chapter from "../../components/Chapter";
import Accordion from "../../components/Accordion";
import { TickCircle } from "iconsax-react";
import NavbarDashboard from "../../components/NavbarDashboard";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import ProgressBar from "../../components/ProgressBar";
const CourseDetail = () => {
  const { id } = useParams();
  const [classDetail, setClassDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userProfile, setUserProfile] = useState("");
  const navigate = useNavigate();
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

  const fetchClassDetail = async () => {
    const token = sessionStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_LOCAL_API_KEY}/api/courses/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      // Logging tambahan untuk debugging
      console.log("Full API Response:", result);
      console.log("Data yang akan diset:", result.data);
      setClassDetail(result.data);
    } catch (error) {
      console.error("Error fetching class detail:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  // Placeholder fetchOrder function (implement actual implementation)
  const fetchOrder = (order_code, user_id, course_id) => {
    // Implement order processing logic
    console.log("Processing order", { order_code, user_id, course_id });
  };
  useEffect(() => {
    fetchClassDetail();
  }, [id]);

  const hasToken = !!sessionStorage.getItem("accessToken");

  return (
    <div>
      <NavbarDashboard
        avatar={userProfile?.avatar} // Gunakan data avatar dari API
        username={userProfile?.username} // Gunakan username dari API
      />
      <div className="flex justify-center px-32 my-20">
        {classDetail ? (
          <div className="flex gap-x-20">
            <div className="w-full">
              <ClassHeader
                level={classDetail.level}
                time={"3 Jam Belajar"}
                module={classDetail.chapters ? classDetail.chapters.length : 0}
                category={classDetail.category.category_name || ""}
                title={classDetail.class_name || "Nama Kelas Tidak Tersedia"}
                imgMentor={classDetail.mentor?.path_photo || ""}
                img={classDetail.path_photo || ""}
                description={classDetail.description || "Tidak ada deskripsi"}
                name={classDetail.mentor?.name || "Nama Mentor Tidak Tersedia"}
                job={
                  classDetail.mentor?.specialist || "Spesialis Tidak Tersedia"
                }
              />
            </div>
            <div className="w-full">
              {/* Cek apakah memiliki token */}
              {!hasToken && (
                <Chapter
                  onClick={() =>
                    fetchOrder(
                      classDetail.order_code || "",
                      classDetail.user_id || "",
                      classDetail.id || ""
                    )
                  }
                  price={classDetail.price || 0}
                  accordionItems={classDetail.chapters || []}
                />
              )}
              <div className="border-2 border-gray-100 p-4 rounded-3xl">
                <p className="font-bold text-2xl">Materi Kelas</p>
                <div className="my-5">
                  <ProgressBar progress={10} variant="above" />
                </div>
                {classDetail.chapters && classDetail.chapters.length > 0 ? (
                  <Accordion items={classDetail.chapters} />
                ) : (
                  <p className="text-gray-500">Tidak ada chapter tersedia</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full text-center text-gray-500">
            Tidak ada detail kelas tersedia
          </div>
        )}
      </div>
    </div>
  );
};
export default CourseDetail;
