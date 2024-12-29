import React, { useState } from "react";
import { ArrowDown2, ArrowUp2, VideoSquare } from "iconsax-react";

const Accordion = ({ items = [] }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((chapter, index) => (
        <div key={chapter.id} className="border-b pb-4">
          {/* Chapter Header */}
          <button
            onClick={() => toggleAccordion(index)}
            className="flex justify-between w-full py-4 text-lg font-semibold focus:outline-none"
          >
            {chapter.chapter_name}
            <span>{openIndex === index ? <ArrowUp2 /> : <ArrowDown2 />}</span>
          </button>

          {/* Videos List */}
          {openIndex === index && (
            <div className="space-y-3">
              {chapter.videos && chapter.videos.length > 0 ? (
                chapter.videos.map((video) => (
                  <div
                    key={video.id}
                    className="flex justify-between items-center text-sm"
                  >
                    <div className="flex gap-x-3 items-center">
                      <VideoSquare size="24" color="#111" />
                      <div>
                        <p className="font-medium">{video.video_title}</p>
                        <p className="text-gray-500">
                          {video.video_description || "Tidak ada deskripsi"}
                        </p>
                      </div>
                    </div>
                    <div className="text-primary-600">
                      {video.is_premium ? "Premium" : "Video"}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">
                  Tidak ada video tersedia
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
