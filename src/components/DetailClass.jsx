import React from "react";

const DetailClass = ({
  name,
  path_photo,
  description,
  mentorName,
  mentorSpecialist,
}) => {
  return (
    <div>
      <h1 className="text-3xl font-bold">{name || "Nama tidak tersedia"}</h1>
      <img
        src={path_photo || "https://via.placeholder.com/400"}
        alt={name || "Image of the class"}
        className="mt-4 w-full max-h-[400px] object-cover"
      />
      <p className="mt-4 text-lg">
        {description || "Deskripsi tidak tersedia."}
      </p>
      <p className="mt-2 text-sm text-gray-600">
        Mentor: {mentorName || "Mentor tidak diketahui"} (
        {mentorSpecialist || "Spesialis tidak diketahui"})
      </p>
    </div>
  );
};

export default DetailClass;
