import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import CourseCard from "../components/CourseCard";
import Schedule from "../components/Schedule";
import StickyNotes from "../components/StickyNotes";
import { Course } from "../types";
import NoClassesIcon from "../assets/notion-icons/11.svg"; // ✅ Import Empty State Icon

const Dashboard = () => {
  const { courses, events, stickyNotes } = useContext(AppContext);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* ✅ Courses Section with Subtle Drop Shadow */}
      <div className="col-span-1 p-4 rounded-xl shadow-md bg-white">
        <h2 className="text-2xl font-bold mb-4">Your Courses</h2>
        {courses.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-10">
            <img src={NoClassesIcon} alt="No Classes" className="w-40 h-40 opacity-70" />
            <p className="text-gray-500 mt-4">No classes yet. Nice!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {courses.map((course: Course, index: number) => (
              <CourseCard key={index} course={course} onEdit={() => {}} onDelete={() => {}} />
            ))}
          </div>
        )}
      </div>

      {/* ✅ Schedule Section with Subtle Drop Shadow */}
      <div className="col-span-2 p-4 rounded-xl shadow-md bg-white">
        <h2 className="text-2xl font-bold mb-4">Your Schedule</h2>
        <Schedule />
      </div>

      {/* ✅ Sticky Notes Section with Subtle Drop Shadow */}
      <div className="col-span-3 mt-6 p-4 rounded-xl shadow-md bg-white">
        <h2 className="text-2xl font-bold mb-4">Sticky Notes</h2>
        <StickyNotes notes={stickyNotes} />
      </div>
    </div>
  );
};

export default Dashboard;
