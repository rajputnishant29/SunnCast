import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  FaMusic, 
  FaPodcast, 
  FaGuitar, 
  FaDrum, 
  FaHeadphones, 
  FaHeart, 
  FaBolt, 
  FaSmile, 
  FaRunning, 
  FaRegSadCry, 
  FaRegGrinHearts 
} from "react-icons/fa";
import { 
  MdSlowMotionVideo, 
  MdMovie, 
  MdOutlineAutoAwesomeMosaic 
} from "react-icons/md";
const Categories = () => {
  const categories = [
    { name: "Music", icon: <FaMusic /> },
  { name: "Dance", icon: <FaBolt /> },
  { name: "Rock", icon: <FaGuitar /> },
  { name: "Drums", icon: <FaDrum /> },
  { name: "Headphones", icon: <FaHeadphones /> },
  { name: "Favorites", icon: <FaHeart /> },
  { name: "Bollywood", icon: <MdMovie /> },
  { name: "Cultural", icon: <MdOutlineAutoAwesomeMosaic /> }, // Replaced MdCulture
  { name: "Sad", icon: <FaRegSadCry /> },
  { name: "Romantic", icon: <FaRegGrinHearts /> },
  { name: "Love", icon: <FaHeart /> },
  { name: "Motivational", icon: <FaBolt /> },
  { name: "Slowed", icon: <MdSlowMotionVideo /> },
  { name: "Focus", icon: <FaHeadphones /> }, // Updated focus to a relevant icon
  { name: "Exercise", icon: <FaRunning /> },
  { name: "Feel Good", icon: <FaSmile /> },
  ];


  return (
    <div className="p-6">
      <div className="text-2xl font-semibold mb-6">Categories</div>
      <div className="w-[80%] mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.name}
            className="flex flex-col items-center justify-center bg-gray-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-36 h-36 text-gray-700 hover:text-blue-500 cursor-pointer"
            to={`/category/${category.name}`}
          >
            <div className="text-4xl mb-2">{category.icon}</div>
            <div className="text-sm font-medium">{category.name}</div>
          </Link>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Categories;
