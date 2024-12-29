import React, { useState, useEffect } from "react";
import ClassHeader from "./ClassHeader";
import Chapter from "./Chapter";
import Accordion from "./Accordion";
import { TickCircle } from "iconsax-react";
import NavbarDashboard from "./Navbar";
import { useParams } from "react-router-dom";

const CourseDetail = () => {
  const { id } = useParams();
  const [classDetail, setClassDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Placeholder benefits list (you might want to fetch this from API or define elsewhere)
  const benefitsList = [
    "Materi berkualitas dari mentor berpengalaman",
    "Akses seumur hidup",
    "Sertifikat kelulusan",
    "Konsultasi dengan mentor",
  ];

  const fetchClassDetail = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_LOCAL_API_KEY}/api/courses/${id}`
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

  if (isLoading) {
    return (
      <div>
        <NavbarDashboard />
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
      <NavbarDashboard />
      <div className="flex justify-between px-32 my-20 gap-x-20">
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
                price={classDetail.price || "Harga Tidak Tersedia"}
                onClick={() =>
                  fetchOrder(
                    classDetail.order_code || "",
                    classDetail.user_id || "",
                    classDetail.id || ""
                  )
                }
              />

              {classDetail.chapters && classDetail.chapters.length > 0 ? (
                <Accordion items={classDetail.chapters} />
              ) : (
                <p className="text-gray-500">Tidak ada chapter tersedia</p>
              )}

              <div className="flex flex-col mt-10">
                <h1 className="text-2xl font-bold mb-4">
                  Yang akan kamu dapatkan
                </h1>
                <ul className="list-disc list-inside">
                  {benefitsList.map((benefit, index) => (
                    <li
                      key={index}
                      className="flex items-center mb-4 text-base"
                    >
                      <TickCircle size="24" className="mr-2 text-primary-500" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
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
