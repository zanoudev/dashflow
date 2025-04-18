import React from "react";

interface Event {
  name: string;
  deadline: string;
  color: string;
}

const EventList: React.FC<{ events: Event[] }> = ({ events }) => {
  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-bold mb-2">Upcoming Events</h3>
      <ul>
        {events.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()).map((event, index) => (
          <li key={index} className="p-2 border-b" style={{ color: event.color }}>
            {event.name} - {event.deadline}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
