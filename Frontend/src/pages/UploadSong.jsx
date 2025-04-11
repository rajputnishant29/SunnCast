import React, { useState } from "react";
import axios from "axios";

const UploadSongs = () => {
  const categories = [
    { name: "Music" },
    { name: "Dance" },
    { name: "Rock" },
    { name: "Drums" },
    { name: "Headphones" },
    { name: "Favorites" },
    { name: "Bollywood" },
    { name: "Cultural" },
    { name: "Sad" },
    { name: "Romantic" },
    { name: "Love" },
    { name: "Motivational" },
    { name: "Slowed" },
    { name: "Focus" },
    { name: "Exercise" },
    { name: "Feel Good" },
  ];

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Only set the file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !artist || !file || !selectedCategory) {
      setMessage("Title, Artist, and MP3 file are required.");
      return;
    }

    const formData = new FormData();
    formData.append("mp3file", file);
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("category", selectedCategory);


    try {
      const response = await axios.post("http://localhost:3000/music/upload-music", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Song added successfully!");
      setUploadStatus("File uploaded and song added!");
      setTitle("");
      setArtist("");
      setFile(null);
      setSelectedCategory("");

      window.location.href = "/";
    } catch (error) {
      console.error(error); // Add error logging for debugging
      setMessage(error.response?.data?.error || "Something went wrong. Please try again.");
      setUploadStatus("");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Add a New Song</h1>

      {message && (
        <div
          className={`p-4 mb-4 text-sm ${
            message.includes("successfully")
              ? "text-green-700 bg-green-100"
              : "text-red-700 bg-red-100"
          } rounded-lg`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Song Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="artist" className="block text-sm font-medium text-gray-700">
            Artist(s) (comma-separated)
          </label>
          <input
            type="text"
            id="artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="category">
            <select
              name="category"
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category, index) => (
                <option key={index} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label htmlFor="file" className="block text-sm font-medium text-gray-700">
            Upload MP3 File
          </label>
          <input
            type="file"
            accept=".mp3"
            onChange={handleFileChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Add Song
        </button>
      </form>

      {uploadStatus && <p className="mt-4 text-center">{uploadStatus}</p>}
    </div>
  );
};

export default UploadSongs;
