import React, { useState } from "react";
import MusicCard from "../components/MusicCard";
import axios from "axios";

const Search = () => {
  const [query, setQuery] = useState('');
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if(!query) return
    setError("");
    setLoading(true);

    try {

      const response = await axios.get(`https://sunncast-1.onrender.com/music/search?query=${query}`)
      setSongs(response.data)
      setSearchResults(response.data); // Update state with the fetched results
    } catch (err) {
      console.error(err);
      setError("Failed to fetch songs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center py-4 bg-gray-800">
        <form onSubmit={handleSearch} className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search for music, artists, or podcasts..."
            value={query}
            onChange={handleInputChange}
            className="w-full px-4 py-2 text-sm text-white bg-gray-700 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white px-4 py-1 rounded-full bg-blue-500 hover:bg-blue-600 focus:outline-none"
          >
            Search
          </button>
        </form>
      </div>

      {loading && <div className="text-center text-white py-4">Loading...</div>}

      {error && <div className="text-center text-red-500 py-4">{error}</div>}

      <div>
        {songs.length > 0 ? (
          songs.map((song) => (
            <MusicCard
              title={song.title}
              artist={song.artist.join(", ")}
              coverImage={song.coverImage || "https://via.placeholder.com/150"}
              onPlay={() => console.log(`Playing ${song.title}`)}
              onLike={() => console.log(`Liked ${song.title}`)}
              isLiked={song.isLiked || false}
              musicUrl={song.url}
            />
          ))
        ) : (
          !loading && !error && <div className="text-center text-white py-4">No songs found.</div>
        )}
      </div>
    </div>
  );
};

export default Search;
