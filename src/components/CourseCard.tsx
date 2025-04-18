import React, { useState } from "react";
import { FiMoreVertical, FiEdit, FiTrash2 } from "react-icons/fi";

const CourseCard = ({ course, onEdit, onDelete }: { course: any; onEdit: () => void; onDelete: () => void }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="p-4 rounded-lg shadow-md text-white flex justify-between items-center relative"
      style={{ backgroundColor: course.color }}
    >
      <div>
        <h3 className="text-lg font-bold">{course.name}</h3>
        <p>{course.semester} {course.year}</p>
      </div>

      {/* 3-Dot Menu Button */}
      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 text-white hover:bg-gray-400 rounded-full transition"
        >
          <FiMoreVertical size={20} />
        </button>

        {menuOpen && (
          <div 
            className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg p-2 z-50 border border-gray-200" 
            style={{ zIndex: 1000 }} // appears on top of other courses
          >
            {/* Edit Button */}
            <button
              onClick={() => { onEdit(); setMenuOpen(false); }}
              className="flex items-center gap-2 w-full px-4 py-2 text-black rounded-md transition hover:bg-gray-100"
            >
              <FiEdit size={16} /> Edit
            </button>
            
            {/* Delete Button */}
            <button
              onClick={() => { onDelete(); setMenuOpen(false); }}
              className="flex items-center gap-2 w-full px-4 py-2 text-red-600 rounded-md transition hover:bg-gray-100"
            >
              <FiTrash2 size={16} /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
