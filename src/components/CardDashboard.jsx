import React from "react";
import BgCard from "../assets/Cards.png";
import { Monitor, MonitorRecorder, Teacher, People } from "iconsax-react";

const CardDashboard = ({ type, sum, id }) => {
  const renderIcon = (id) => {
    switch (id) {
      case 1:
        return <Monitor color="#1DA599" />;
      case 2:
        return <MonitorRecorder color="#1DA599" />;
      case 3:
        return <Teacher color="#1DA599" />;
      case 4:
        return <People color="#1DA599" />;
      default:
        return <Monitor color="#1DA599" />;
    }
  };

  return (
    <div
      className="w-[300px] h-[180.5px] rounded-[24px] p-6 relative overflow-hidden"
      style={{
        backgroundImage: `url(${BgCard})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Content container */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Icon and type container */}
        <div className="space-y-3">
          {/* Icon container */}
          <div className="inline-flex p-2 bg-white rounded-lg">
            {renderIcon(id)}
          </div>
          {/* Type text */}
          <p className="text-white text-base font-medium">{type}</p>
        </div>

        {/* Sum value */}
        <div className="mt-auto">
          <p className="text-white text-[56px] font-bold leading-none">{sum}</p>
        </div>
      </div>

      {/* Optional: Add overlay to ensure text readability */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-transparent to-emerald-600/10"
        style={{ mixBlendMode: "multiply" }}
      />
    </div>
  );
};

export default CardDashboard;
