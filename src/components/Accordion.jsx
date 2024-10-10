import React, { useState, useRef, useEffect } from "react";
import { ArrowUp2, ArrowDown2 } from "iconsax-react";
import clsx from "clsx";

const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    // Set initial height of the content to be 0 for all items
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
              "w-full flex justify-between items-center pt-2 bg-white",
              activeIndex === index ? "mb-2" : "mb-6" // Only add margin when not active
            )}
            onClick={() => toggleAccordion(index)}
            aria-expanded={activeIndex === index}
            aria-controls={`accordion-panel-${index}`}
          >
            <div className="flex items-center">
              <div className="text-left">
                <p className="text-xl font-medium">{item.title}</p>
                <p className="text-sm text-black">{item.meta}</p>
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
            style={{ transitionProperty: "height" }} // Smooth transition of height
            aria-hidden={activeIndex !== index}
          >
            <div className="flex items-center gap-2 text-sm mb-6">
              {item.logo} {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
