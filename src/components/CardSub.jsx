import React, { useState } from "react";
import { ArrowUp2, ArrowDown2 } from "iconsax-react";

const SubMateriComponent = () => {
  // State for title and subMateri
  const [title, setTitle] = useState("Pengenalan UI/UX"); // Editable title
  const [subMateri, setSubMateri] = useState([{ title: "", media: "" }]);
  const [isExpanded, setIsExpanded] = useState(false); // State for visibility

  const addSubMateri = () => {
    // Add a new empty sub-material item to the state
    setSubMateri([...subMateri, { title: "", media: "" }]);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded); // Toggle the visibility
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value); // Update the title state
  };

  const handleSubMateriTitleChange = (index, value) => {
    const updatedSubMateri = [...subMateri];
    updatedSubMateri[index].title = value; // Update title for subMateri
    setSubMateri(updatedSubMateri); // Set the updated state
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <div className="flex gap-x-5 justify-between items-center mb-4">
        <input
          type="text"
          value={title}
          className="text-lg font-semibold border rounded-xl p-2 w-full"
          onChange={handleTitleChange} // Handle title change
        />
        <button onClick={toggleExpand} className="text-xl">
          {isExpanded ? (
            <ArrowDown2 size="24" color="#111" />
          ) : (
            <ArrowUp2 size="24" color="#111" />
          )}
        </button>
      </div>

      {isExpanded && ( // Conditional rendering based on isExpanded
        <>
          {subMateri.map((item, index) => (
            <div key={index} className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium">Sub Materi</label>
                <input
                  type="text"
                  value={item.title}
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="Sub Materi"
                  onChange={(e) =>
                    handleSubMateriTitleChange(index, e.target.value)
                  } // Update subMateri title on change
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Media</label>
                <input
                  type="text"
                  value={item.media}
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="Media"
                  readOnly // Keep media input read-only
                />
              </div>
            </div>
          ))}

          <button
            onClick={addSubMateri}
            className="mt-4 px-4 py-2 border rounded-full text-teal-600 border-teal-600 hover:bg-teal-600 hover:text-white transition"
          >
            Tambah Sub Materi
          </button>
        </>
      )}
    </div>
  );
};

export default SubMateriComponent;
