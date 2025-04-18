import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Events from "./pages/Events";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { AppProvider } from "./context/AppContext";

const App = () => {
  const location = useLocation(); // ✅ Get the current path

  return (
    <AppProvider>
      <div className="flex flex-col min-h-screen bg-white text-gray-900">
        {/* ✅ Updated Navigation */}
        <nav className="flex justify-between items-center p-4 bg-white">
          {/* Left: App Name with Dynamic Dot */}
          <div className="flex items-center gap-2 text-xl font-semibold">
            <span className="w-3 h-3 rounded-full bg-black dark:bg-white"></span> {/* Dynamic dot */}
            <span>Dashflow</span>
          </div>

          {/* ✅ Center: No Extra Padding on Sides + No Purple */}
          <div className="flex gap-6 px-2 py-2 border border-gray-300 rounded-full">
            {[
              { path: "/", label: "Dashboard" },
              { path: "/courses", label: "Courses" },
              { path: "/events", label: "Events" }
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-full text-black no-underline transition-all duration-200 ease-in-out
                  ${
                    location.pathname === item.path
                      ? "bg-gray-200 font-semibold" // ✅ Active state (Gray BG, bold text)
                      : "hover:bg-gray-100"
                  } hover:text-black visited:text-black active:text-black focus:text-black`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* ✅ Right: Profile & Settings (Fixed Text Color) */}
          <div className="flex gap-4">
            <button className="px-4 py-2 rounded-full bg-black text-white hover:bg-gray-900 hover:-translate-y-1 transition-all duration-200 ease-in-out">
              <Link to="/profile" className="text-white no-underline hover:text-white focus:text-white visited:text-white active:text-white">
                Profile
              </Link>
            </button>
            <button className="px-4 py-2 rounded-full bg-black text-white hover:bg-gray-900 hover:-translate-y-1 transition-all duration-200 ease-in-out">
              <Link to="/settings" className="text-white no-underline hover:text-white focus:text-white visited:text-white active:text-white">
                Settings
              </Link>
            </button>
          </div>
        </nav>

        {/* Page Content */}
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/events" element={<Events />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </AppProvider>
  );
};

export default App;
