import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import EventForm from "../components/EventForm";
import { format, parseISO } from "date-fns";
import NoEventsIcon from "../assets/notion-icons/11.svg";
import { Event, Course } from "../types";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const Events = () => {
  const { events, setEvents, courses } = useContext(AppContext);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | undefined>(undefined);

  const addEvent = (event: Event) => {
    if (editingEvent) {
      setEvents(events.map((e: Event) => (e.name === editingEvent.name ? event : e)));
      setEditingEvent(undefined);
    } else {
      setEvents([...events, event]);
    }
    setShowForm(false);
  };

  const deleteEvent = (index: number) => {
    const updatedEvents = events.filter((_event: Event, i: number) => i !== index);
    setEvents(updatedEvents);
  };

  const editEvent = (index: number) => {
    setEditingEvent(events[index]);
    setShowForm(true);
  };

  const formatDate = (deadline: string) => format(parseISO(deadline), "MMMM do, yyyy");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Events</h2>

      <button
        onClick={() => setShowForm(true)}
        className="flex items-center gap-2 bg-white text-black border border-gray-300 px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 active:scale-95 transition-all mb-6"
      >
        + Add Event
      </button>

      {showForm && <EventForm onSave={addEvent} editingEvent={editingEvent} onCancel={() => setShowForm(false)} />}

      {events.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-10">
          <img src={NoEventsIcon} alt="No Events" className="w-40 h-40 opacity-70" />
          <p className="text-gray-500 mt-4">No events yet. You're free!</p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {events.map((event: Event, index: number) => {
            const course: Course | undefined = courses.find((c: Course) => c.name === event.course);
            const courseColor = course ? course.color : "#ddd";
            return (
              <div key={index} className="flex items-center bg-white shadow-md rounded-lg border border-gray-200 p-4">
                {/* circle course color */}
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: courseColor }}></div>

                <div className="ml-4 flex-1">
                  <p className="text-lg font-semibold">{event.name}</p>
                  <p className="text-gray-500">{formatDate(event.deadline)}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => editEvent(index)}
                    className="text-gray-600 hover:text-gray-900 transition"
                    title="Edit Event"
                  >
                    <AiOutlineEdit size={20} />
                  </button>
                  <button
                    onClick={() => deleteEvent(index)}
                    className="text-red-500 hover:text-red-700 transition"
                    title="Delete Event"
                  >
                    <AiOutlineDelete size={20} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Events;
