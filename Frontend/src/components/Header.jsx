import React from "react";
import { FaSearch, FaMicrophoneAlt, FaUserAlt } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { IoMdCloudUpload } from "react-icons/io";
import { Link } from "react-router-dom";
import useAuthStore from "../utils/useAuthStore"; 
const Header = () => {
  const { userId, logout } = useAuthStore();
  return (
    <div className="w-full shadow-md flex justify-center items-center">
      <div className="w-full m-3 flex justify-between items-center">
        {/* Logo */}
        <Link to={"/"}>
          <div className="flex hover:scale-105">
            <img
              className="w-14"
              src="https://static.vecteezy.com/system/resources/previews/009/003/345/original/note-icon-illustration-design-free-vector.jpg"
              alt="Logo"
            />
            <h3 className="text-lg font-bold my-auto text-orange-600">SunnCast</h3>
          </div>
        </Link>

        {/* Navigation */}
        <div className="flex justify-between gap-10 text-md font-semibold">
          <Link to={"/search"}>
            <div className="flex justify-center items-center gap-2">
              <FaSearch /> Search
            </div>
          </Link>

          <Link to={"/categories"}>
            <div className="flex justify-center items-center gap-2">
              <BiSolidCategory /> Categories
            </div>
          </Link>

          <Link to={"/podcast"}>
            <div className="flex justify-center items-center gap-2">
              <FaMicrophoneAlt /> Podcasts
            </div>
          </Link>

          <Link to={"/upload"}>
            <div className="flex justify-center items-center gap-2">
              <IoMdCloudUpload /> Upload
            </div>
          </Link>

          {userId && (
            <Link to={"/liked-songs"}>
              <div className="flex justify-center items-center gap-2">
                ❤️ Liked Songs
              </div>
            </Link>
          )}

          {userId ? (
            <button onClick={logout} className="flex justify-center items-center gap-2 text-red-500">
              <FaUserAlt /> Logout
            </button>
          ) : (
            <Link to={"/login"}>
              <div className="flex justify-center items-center gap-2">
                <FaUserAlt /> Login
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
