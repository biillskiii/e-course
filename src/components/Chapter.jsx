import React from "react";
import Accordion from "../components/Accordion";
import Button from "./Button";
const Chapter = ({ price, accordionItems }) => {
  return (
    <div>
      {" "}
      <div className="flex flex-col gap-10">
        <div className="flex justify-between gap-x-64">
          <h1 className="font-bold text-4xl">Rp. {price}</h1>
          <Button
            type="button"
            size="small"
            variant="primary"
            label={"Beli Kelas"}
          />
        </div>
        <div className="">
          <h1 className="text-2xl font-bold mb-4">Modul</h1>
        </div>
      </div>
    </div>
  );
};

export default Chapter;
