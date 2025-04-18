import React, { createContext, useState, useEffect } from "react";
import { loadData, saveData } from "../utils/storage";

export const AppContext = createContext<any>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [courses, setCourses] = useState([]);
  const [events, setEvents] = useState([]);
  const [stickyNotes, setStickyNotes] = useState([]);

  // Load data when app starts
  useEffect(() => {
    setCourses(loadData("courses"));
    setEvents(loadData("events"));
    setStickyNotes(loadData("stickyNotes"));
  }, []);

  // Save data when state updates
  useEffect(() => {
    saveData("courses", courses);
    saveData("events", events);
    saveData("stickyNotes", stickyNotes);
  }, [courses, events, stickyNotes]);

  return (
    <AppContext.Provider value={{ courses, setCourses, events, setEvents, stickyNotes, setStickyNotes }}>
      {children}
    </AppContext.Provider>
  );
};
