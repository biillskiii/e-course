import React from "react";
import { Icon } from "@iconify/react"; // Pastikan Anda menginstal iconify/react

const reviewsData = [
  {
    id: 1,
    name: "Anna Wilson",
    date: "24 Juni 2024",
    rating: 5,
    comment:
      "Kelasnya sangat membantu untuk pemula seperti saya karena materi mudah dipahami.",
  },
  {
    id: 2,
    name: "Mia Reed",
    date: "5 Februari 2024",
    rating: 5,
    comment: "Materinya simpel dan cocok untuk pemula.",
  },
  {
    id: 3,
    name: "Ethan Brooks",
    date: "8 Desember 2023",
    rating: 4,
    comment: "Materi yang disajikan sangat simpel dan mudah dicerna.",
  },
];

const Rating = () => {
  const totalReviews = reviewsData.length;
  const totalRating = reviewsData.reduce(
    (sum, review) => sum + review.rating,
    0
  );
  const averageRating = (totalRating / totalReviews).toFixed(1);

  // Fungsi untuk menghitung persentase bintang
  const starPercentage = (star) =>
    (reviewsData.filter((review) => review.rating === star).length /
      totalReviews) *
    100;

  // Fungsi render untuk bintang
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          icon="material-symbols:star"
          key={i}
          width={8}
          color={i <= rating ? "#F1C644" : "#e4e5e9"}
        />
      );
    }
    return stars;
  };

  return (
    <div className="mx-auto">
      <div className="flex w-[576px] my-4">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-[68px] font-bold">{averageRating}</h1>
          <p>{totalReviews} ULASAN</p>
        </div>

        {/* Bar Rating */}
        <div className="space-y-2 ml-5 w-full">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center">
              <span className="flex items-center gap-1 mr-2">
                {star}
                <Icon icon="material-symbols:star" color="#F1C644" />
              </span>
              <div className="bg-primary-100 w-full h-2 rounded">
                <div
                  className="bg-primary-500 h-2 rounded"
                  style={{ width: `${starPercentage(star)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div>
        {reviewsData.map((review) => (
          <div key={review.id} className="flex mb-4">
            <div className="flex items-center mb-2">
              <div className="flex">
                <img
                  src={`https://i.pravatar.cc/40?img=${review.id}`}
                  alt="avatar"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div className="flex flex-col">
                  <p className="font-bold text-sm">{review.name}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {renderStars(review.rating)}{" "}
                      {/* Render bintang untuk masing-masing ulasan */}
                    </div>
                    <p className="text-[10px]">{review.date}</p>
                  </div>
                  <p className="text-sm text-gray-300">{review.comment}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rating;
