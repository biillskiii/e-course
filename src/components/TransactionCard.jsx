import React from "react";

const TransactionCard = ({ course }) => {
  return (
    <div className="flex items-center p-4 bg-[#F6FCFB] rounded-lg shadow-lg">
      {/* Course Image */}
      <div className="flex-shrink-0 w-32 h-32 rounded-lg overflow-hidden">
        <img
          src={course.img}
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Course Info */}
      <div className="flex-grow px-4">
        <div className="text-sm text-gray-500">
          No. Tagihan {course.billNumber}
        </div>
        <h2 className="text-lg font-semibold">{course.title}</h2>
        <div className="text-xl font-bold text-gray-800">{course.price}</div>
        <div className="text-sm text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full inline-block">
          {course.status}
        </div>
      </div>

      {/* Details Link */}
      <div className="text-sm text-teal-600 ml-auto">
        <a href={course.detailLink} className="hover:underline">
          Lihat Detail
        </a>
      </div>
    </div>
  );
};

// Sample data to render the component

export default TransactionCard;
