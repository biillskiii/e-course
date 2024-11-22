import React, { useState } from "react";
import { ArrowDown2, ArrowUp2 } from "iconsax-react";
const Accordion = ({ items }) => {
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
            {chapter.name_chapter}
            <span>{openIndex === index ? <ArrowUp2 /> : <ArrowDown2 />}</span>
          </button>

          {/* Videos List */}
          {openIndex === index && (
            <div className="space-y-3">
              {chapter.video.map((video) => (
                <div
                  key={video.id}
                  className="flex justify-between items-center text-sm"
                >
                  <div>
                    <p className="font-medium">{video.video_title}</p>
                    <p className="text-gray-500">{video.video_description}</p>
                  </div>
                  <div className="text-primary-600">
                    {video.is_premium ? "Premium" : `${video.number} mnt`}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
