import React, { useState, useRef, useEffect } from "react";
import { ArrowUp2, ArrowDown2, VideoSquare, Book } from "iconsax-react";
import clsx from "clsx";

const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    contentRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.style.height =
          activeIndex === index ? `${ref.scrollHeight}px` : "0px";
      }
    });
  }, [activeIndex]);

  return (
    <div className="w-full mx-auto">
      {items.map((item, index) => (
        <div key={index} className="">
          {/* Accordion Header */}
          <button
            className={clsx(
              "w-full flex justify-between items-center py-4 bg-white",
              activeIndex === index ? "mb-2" : ""
            )}
            onClick={() => toggleAccordion(index)}
            aria-expanded={activeIndex === index}
            aria-controls={`accordion-panel-${index}`}
          >
            <div className="flex items-center">
              <div className="text-left">
                <p className="text-xl font-medium">{item.title}</p>
              </div>
            </div>
            <span>
              {activeIndex === index ? (
                <ArrowUp2 size="24" className="text-black" />
              ) : (
                <ArrowDown2 size="24" className="text-black" />
              )}
            </span>
          </button>

          {/* Accordion Panel */}
          <div
            id={`accordion-panel-${index}`}
            ref={(el) => (contentRefs.current[index] = el)}
            className={clsx(
              "transition-all duration-300 ease-in-out overflow-hidden",
              activeIndex === index ? "max-h-screen" : "max-h-0"
            )}
            style={{ transitionProperty: "height" }}
            aria-hidden={activeIndex !== index}
          >
            {item.subItems.map((subItem, subIndex) => (
              <div key={subIndex} className="flex justify-between text-sm py-2">
                <div className="flex items-center gap-x-2">
                  {subItem.logo}
                  <span>{subItem.content}</span>
                </div>
                <div className="text-primary-500 text-sm font-medium">
                  {subItem.duration}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;