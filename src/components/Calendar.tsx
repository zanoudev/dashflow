import React from "react";

interface Event {
  name: string;
  deadline: string;
  color: string;
}

const Calendar: React.FC<{ events: Event[] }> = ({ events }) => {
  return (
    <div className="border p-4 rounded shadow-md">
      <h3 className="text-lg font-bold mb-2">Calendar</h3>
      <ul>
        {events.map((event, index) => (
          <li key={index} className="p-2 border-b" style={{ color: event.color }}>
            {event.name} - {event.deadline}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;
