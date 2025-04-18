import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import CourseForm from "../components/CourseForm";
import CourseCard from "../components/CourseCard";
import { Course } from "../types";
import NoClassesIcon from "../assets/notion-icons/11.svg"; // ✅ Import Empty State Icon

const Courses = () => {
  const { courses, setCourses } = useContext(AppContext);
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | undefined>(undefined);

  const addCourse = (course: Course) => {
    if (editingCourse) {
      setCourses(courses.map((c: Course) => (c.name === editingCourse.name ? course : c)));
      setEditingCourse(undefined);
    } else {
      setCourses([...courses, course]);
    }
    setShowForm(false);
  };

  const cancelForm = () => {
    setEditingCourse(undefined);
    setShowForm(false);
  };

  const deleteCourse = (index: number) => {
    const updatedCourses = courses.filter((_course: Course, i: number) => i !== index);
    setCourses(updatedCourses);
  };

  const editCourse = (index: number) => {
    setEditingCourse(courses[index]);
    setShowForm(true);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Courses</h2>

      <button
        onClick={() => setShowForm(true)}
        className="flex items-center gap-2 bg-white text-black border border-gray-300 px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 active:scale-95 transition-all mb-6"
      >
        + Add Course
      </button>

      {showForm && <CourseForm onSave={addCourse} editingCourse={editingCourse} onCancel={cancelForm} />}

      {/* ✅ Empty State (Aligned Properly) */}
      {courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-60">
          <img src={NoClassesIcon} alt="No Classes" className="w-40 h-40 opacity-70 object-contain" />
          <p className="text-gray-500 mt-4">No classes yet. Nice!</p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course: Course, index: number) => (
            <CourseCard
              key={index}
              course={course}
              onEdit={() => editCourse(index)}
              onDelete={() => deleteCourse(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
