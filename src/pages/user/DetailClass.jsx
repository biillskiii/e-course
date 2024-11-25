import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClassHeader from "../../components/ClassHeader";
import Navbar from "../../components/Navbar";
import Chapter from "../../components/Chapter";
import Accordion from "../../components/Accordion";
import { benefitsList } from "../../data";
import { TickCircle } from "iconsax-react";
const DetailClassPage = () => {
  const { id } = useParams();
  const [classDetail, setClassDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [benefit, setBenefit] = useState([benefitsList]);

  const fetchClassDetail = async () => {
    try {
      const response = await fetch(
        `https://be-course.serpihantech.com/api/courses/${id}`
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

  useEffect(() => {
    fetchClassDetail();
  }, [id]);

  // Debugging log untuk classDetail
  useEffect(() => {
    console.log("Current classDetail state:", classDetail);
  }, [classDetail]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="p-10 text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="flex justify-between px-32 my-20">
        {classDetail ? (
          <>
            {/* Tambahkan log tambahan */}
            {console.log("Rendering DetailClass with:", classDetail)}
            <ClassHeader
              title={classDetail.course.name}
              imgMentor={classDetail.course.mentor?.path_photo}
              img={classDetail.course.path_photo}
              description={classDetail.course.description}
              name={classDetail.course.mentor?.name}
              job={classDetail.course.mentor?.specialist}
            />
          </>
        ) : (
          <p>Tidak ada detail kelas</p>
        )}
        <div>
          <Chapter price={classDetail.course.price} />
          <Accordion items={classDetail.chapter} />
          <div className="flex flex-col mt-10"></div>
          <h1 className="text-2xl font-bold mb-4">Yang akan kamu dapatkan</h1>
          <ul className="list-disc list-inside">
            {benefitsList.map((benefit, index) => (
              <li key={index} className="flex items-center mb-4 text-base">
                <TickCircle size="24" className="mr-2 text-primary-500" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DetailClassPage;
