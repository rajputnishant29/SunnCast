import { useEffect } from "react";
import useUserStore from "../utils/useUserStore";

const LikedSongs = () => {
  const { likedSongs, fetchLikedSongs } = useUserStore();

  useEffect(() => {
    fetchLikedSongs();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Liked Songs</h1>
      {likedSongs.length === 0 ? (
        <p>No liked songs yet.</p>
      ) : (
        <ul>
          {likedSongs.map((song) => (
            <li key={song._id} className="flex items-center gap-2">
              <span>{song.title} - {song.artist}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LikedSongs;
