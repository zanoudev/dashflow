import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Event, Course } from "../types"; // ✅ Import Correct Types

interface EventFormProps {
  onSave: (event: Event) => void;
  onCancel: () => void;
  editingEvent?: Event;
}

const EventForm: React.FC<EventFormProps> = ({ onSave, onCancel, editingEvent }) => {
  const { courses } = useContext(AppContext);

  const [name, setName] = useState(editingEvent?.name || "");
  const [deadline, setDeadline] = useState(editingEvent?.deadline || new Date().toISOString().split("T")[0]);
  const [weight, setWeight] = useState(editingEvent?.weight || "");
  const [description, setDescription] = useState(editingEvent?.description || "");
  const [course, setCourse] = useState(editingEvent?.course || (courses.length > 0 ? courses[0].name : ""));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!course) {
      alert("Please select a course!");
      return;
    }

    onSave({ name, deadline, weight: Number(weight), description, course });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-4 space-y-4">
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            required
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            required
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Weight (%)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            required
          />
        </div>
      </div>

      {/* ✅ Course Selection Dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Course</label>
        <select
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          required
        >
          {courses.length > 0 ? (
            courses.map((c: Course) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))
          ) : (
            <option value="" disabled>
              No courses available
            </option>
          )}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
        ></textarea>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg text-gray-700 border border-gray-300 hover:bg-gray-100 transition">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-900 transition">
          Save
        </button>
      </div>
    </form>
  );
};

export default EventForm;
