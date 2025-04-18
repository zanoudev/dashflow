import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { v4 as uuidv4 } from "uuid";
import { StickyNote } from "../types";
import { IoMdColorPalette } from "react-icons/io";

const COLORS = ["#FDE047", "#FCA5A5", "#A7F3D0", "#93C5FD", "#E9D5FF", "#FCD34D", "#D1D5DB"];

const StickyNotes = () => {
  const { stickyNotes, setStickyNotes } = useContext(AppContext);
  const [showColorMenu, setShowColorMenu] = useState<string | null>(null);

  const addNote = () => {
    const newNote: StickyNote = {
      id: uuidv4(),
      content: "", // ✅ No default text inside the note
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
    setStickyNotes([...stickyNotes, newNote]);
  };

  const deleteNote = (id: string) => {
    setStickyNotes(stickyNotes.filter((note: StickyNote) => note.id !== id));
  };

  const updateNote = (id: string, content: string) => {
    setStickyNotes(stickyNotes.map((note: StickyNote) => (note.id === id ? { ...note, content } : note)));
  };

  const changeColor = (id: string, newColor: string) => {
    setStickyNotes(stickyNotes.map((note: StickyNote) => (note.id === id ? { ...note, color: newColor } : note)));
    setShowColorMenu(null); // ✅ Hide color picker after selecting a color
  };

  return (
    <div className="flex flex-wrap gap-6">
      <button
        onClick={addNote}
        className="w-48 h-48 flex items-center justify-center border border-gray-300 text-gray-600 text-4xl rounded-lg shadow-md hover:bg-gray-100 active:scale-95 transition"
      >
        +
      </button>

      {stickyNotes.map((note: StickyNote) => (
        <div
          key={note.id}
          className="relative w-48 h-48 p-4 rounded-lg shadow-md flex flex-col"
          style={{ backgroundColor: note.color }}
        >
          <textarea
            value={note.content}
            onChange={(e) => updateNote(note.id, e.target.value)}
            className="w-full h-full bg-transparent outline-none resize-none text-gray-800 mt-6" // ✅ Increased gap from delete button
          ></textarea>

          <div className="absolute top-2 right-2">
            <button
              onClick={() => setShowColorMenu(note.id === showColorMenu ? null : note.id)}
              className="text-gray-700 hover:text-gray-900"
            >
              <IoMdColorPalette size={20} />
            </button>

            {/* color options */}
            {showColorMenu === note.id && (
              <div className="absolute right-0 mt-1 bg-white shadow-md rounded-md p-2 flex gap-1">
                {COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => changeColor(note.id, color)}
                    className="w-6 h-6 rounded-full border border-gray-300"
                    style={{ backgroundColor: color }}
                  ></button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => deleteNote(note.id)}
            className="absolute top-2 left-2 text-gray-700 hover:text-red-500"
          >
            ✖
          </button>
        </div>
      ))}
    </div>
  );
};

export default StickyNotes;
