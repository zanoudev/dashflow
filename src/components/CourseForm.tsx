import React, { useState, useEffect } from "react";
import { Course } from "../types";
import ColorPicker from "./ColorPicker";
import { FiX } from "react-icons/fi"; // ✅ Import X icon

const CourseForm = ({ onSave, editingCourse, onCancel }: { onSave: (course: Course) => void; editingCourse?: Course; onCancel: () => void }) => {
  const [course, setCourse] = useState<Course>({
    name: "",
    semester: "Fall",
    year: new Date().getFullYear(),
    color: "#3498db",
  });

  useEffect(() => {
    if (editingCourse) setCourse(editingCourse);
  }, [editingCourse]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  return (
    <form
      className="relative p-6 pt-10 border rounded-lg shadow-lg bg-white mt-6"
      onSubmit={(e) => {
        e.preventDefault();
        onSave(course);
      }}
    >
      {/* ✅ Close Button (X) with Rounder Edge */}
      <button
        type="button"
        onClick={onCancel}
        className="absolute top-3 right-3 p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-200 transition"
      >
        <FiX size={18} />
      </button>

      <input
        type="text"
        name="name"
        placeholder="Course Name"
        value={course.name}
        onChange={handleChange}
        className="block w-full p-2 mb-2 border rounded-lg"
      />
      <select name="semester" value={course.semester} onChange={handleChange} className="block w-full p-2 mb-2 border rounded-lg">
        <option value="Fall">Fall</option>
        <option value="Winter">Winter</option>
        <option value="Summer">Summer</option>
      </select>
      <input
        type="number"
        name="year"
        value={course.year}
        onChange={handleChange}
        className="block w-full p-2 mb-2 border rounded-lg"
      />

      <label className="block mb-2">Pick a color:</label>
      <ColorPicker selectedColor={course.color} onChange={(color) => setCourse({ ...course, color })} />

      <div className="flex gap-2 mt-6">
        <button
          type="submit"
          className="w-full bg-gray-300 text-black p-2 rounded-lg shadow-md transition-transform transform hover:scale-[1.02] active:scale-95 hover:bg-gray-400"
        >
          {editingCourse ? "Update Course" : "Save Course"}
        </button>
      </div>
    </form>
  );
};

export default CourseForm;
