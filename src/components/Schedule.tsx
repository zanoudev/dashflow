import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { format, isThisWeek, isSameWeek, addWeeks, parseISO } from "date-fns";
import ChillTime from "../assets/illustrations/Chill-Time.svg"; // ✅ Empty State Image
import { Event, Course } from "../types"; // ✅ Import Correct Types

const isNextWeek = (date: Date) => {
  const nextWeekStart = addWeeks(new Date(), 1);
  return isSameWeek(date, nextWeekStart, { weekStartsOn: 1 });
};

const Schedule = () => {
  const { events, courses } = useContext(AppContext);

  // ✅ Ensure event has a valid deadline before parsing
  const safeParseDate = (dateStr: string | undefined) => {
    return dateStr ? parseISO(dateStr) : null;
  };

  const thisWeekEvents = events.filter((event: Event) => {
    const parsedDate = safeParseDate(event.deadline); // ✅ FIXED: Using `deadline` instead of `date`
    return parsedDate ? isThisWeek(parsedDate, { weekStartsOn: 1 }) : false;
  });

  const nextWeekEvents = events.filter((event: Event) => {
    const parsedDate = safeParseDate(event.deadline); // ✅ FIXED: Using `deadline`
    return parsedDate ? isNextWeek(parsedDate) : false;
  });

  const upcomingEvents = events.filter((event: Event) => {
    const parsedDate = safeParseDate(event.deadline); // ✅ FIXED: Using `deadline`
    return parsedDate ? !isThisWeek(parsedDate, { weekStartsOn: 1 }) && !isNextWeek(parsedDate) : false;
  });

  const formatDate = (dateStr: string | undefined) => {
    return dateStr ? format(parseISO(dateStr), "MMMM do, yyyy") : "No Date";
  };

  return (
    <div className="p-6">
      {/* ✅ Empty State */}
      {events.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-60">
          <img src={ChillTime} alt="No Events" className="w-40 h-40 opacity-70 object-contain" />
          <p className="text-gray-500 mt-4">Schedule is clear. Time to chill</p>
        </div>
      ) : (
        <div className="space-y-6">
          {thisWeekEvents.length > 0 && <EventSection title="This Week" events={thisWeekEvents} formatDate={formatDate} />}
          {nextWeekEvents.length > 0 && <EventSection title="Next Week" events={nextWeekEvents} formatDate={formatDate} />}
          {upcomingEvents.length > 0 && <EventSection title="Upcoming Weeks" events={upcomingEvents} formatDate={formatDate} />}
        </div>
      )}
    </div>
  );
};

const EventSection = ({ title, events, formatDate }: { title: string; events: Event[]; formatDate: (dateStr: string | undefined) => string }) => (
  <div>
    <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
    <div className="space-y-4">
      {events.map((event: Event, index: number) => (
        <EventItem key={index} event={event} formatDate={formatDate} />
      ))}
    </div>
  </div>
);

const EventItem = ({ event, formatDate }: { event: Event; formatDate: (dateStr: string | undefined) => string }) => {
  const { courses } = useContext(AppContext);
  const course = courses.find((c: Course) => c.name === event.course); // ✅ Defined `c` explicitly
  const courseColor = course ? course.color : "#ddd";

  return (
    <div className="p-4 bg-white shadow-md rounded-lg border border-gray-200 flex items-center">
      {/* ✅ Course Color Indicator */}
      <div className="w-4 h-4 rounded-full mr-4" style={{ backgroundColor: courseColor }}></div>

      {/* ✅ Event Details */}
      <div className="flex-1">
        <p className="text-lg font-semibold">{event.name}</p>
        <p className="text-gray-500">{formatDate(event.deadline)}</p> {/* ✅ FIXED: Using `deadline` */}
      </div>
    </div>
  );
};

export default Schedule;
