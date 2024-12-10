import React, { useState, useEffect } from "react";
import ClassHeader from "./ClassHeader";
import Chapter from "./Chapter";
import Accordion from "./Accordion";
import { TickCircle } from "iconsax-react";
import NavbarDashboard from "./NavbarDashboard";
import { useParams } from "react-router-dom";

const CourseDetail = () => {
  const { id } = useParams();
  const [classDetail, setClassDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
  useEffect(() => {
    fetchClassDetail();
  }, [id]);

  return (
    <div>
      {" "}
      <div>
        <NavbarDashboard />
        <div className="flex justify-between px-32 my-20">
          {classDetail ? (
            <>
              <ClassHeader
                title={classDetail.name}
                imgMentor={classDetail.mentor?.path_photo}
                img={classDetail.path_photo}
                description={classDetail.description}
                name={classDetail.mentor?.name}
                job={classDetail.mentor?.specialist}
              />
            </>
          ) : (
            <p>Tidak ada detail kelas</p>
          )}
          <div>
            <Chapter
              price={classDetail.price}
              onClick={() => fetchOrder(order_code, user_id, course_id)}
            />
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
    </div>
  );
};

export default CourseDetail;
