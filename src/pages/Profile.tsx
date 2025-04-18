import React, { useState } from "react";
import { FaUserCircle, FaEdit } from "react-icons/fa";
import profileData from "../data/profile.json"; // ✅ Import profile data
import { writeFile } from "../utils/fileUtils"; // ✅ Utility function to update JSON

interface ProfileData {
  profileImage: string | null;
  username: string;
  bio: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<ProfileData>({
    profileImage: profileData.profileImage || null,
    username: profileData.username || "Your Name",
    bio: profileData.bio || "Write something about yourself...",
  });

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // ✅ Handle Image Upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          const newProfile: ProfileData = { ...profile, profileImage: e.target.result as string };
          setProfile(newProfile);
          writeFile("src/data/profile.json", newProfile); // ✅ Save to JSON
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ Handle Text Changes
  const handleChange = (field: keyof ProfileData, value: string) => {
    const newProfile: ProfileData = { ...profile, [field]: value };
    setProfile(newProfile);
    writeFile("src/data/profile.json", newProfile); // ✅ Save to JSON
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      {/* ✅ Profile Picture Section */}
      <div className="relative w-32 h-32">
        {profile.profileImage ? (
          <img
            src={profile.profileImage}
            alt="Profile"
            className="w-full h-full rounded-full object-cover border border-gray-300 shadow-md"
          />
        ) : (
          <FaUserCircle className="w-full h-full text-gray-400 border border-gray-300 rounded-full shadow-md" />
        )}

        {/* ✅ Edit Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-1 right-1 bg-white border border-gray-300 rounded-full p-2 shadow-md hover:bg-gray-100 transition"
        >
          <FaEdit className="text-gray-600" />
        </button>
        <input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={handleImageUpload} />
      </div>

      {/* ✅ Editable Username */}
      <input
        type="text"
        value={profile.username}
        onChange={(e) => handleChange("username", e.target.value)}
        className="mt-4 text-xl font-semibold text-center border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
      />

      {/* ✅ Editable Bio */}
      <textarea
        value={profile.bio}
        onChange={(e) => handleChange("bio", e.target.value)}
        className="mt-2 text-center border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 transition resize-none w-80"
        rows={3}
      ></textarea>
    </div>
  );
};

export default Profile;
