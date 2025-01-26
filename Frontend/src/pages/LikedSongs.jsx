import React from "react";
import { useMusicStore } from "../utils/musicStore";
import MusicCard from "../components/MusicCard";

const LikedSongs = () => {
  const likedSongs = useMusicStore((state) => state.likedSongs);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Liked Songs</h2>
      <div className="space-y-4">
        {likedSongs.length === 0 ? (
          <p>No songs liked yet!</p>
        ) : (
          likedSongs.map((song) => (
            <MusicCard
              key={song.id}
              id={song.id}
              title={song.title}
              artist={song.artist}
              musicUrl={song.musicUrl}
              coverImage={song.coverImage}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default LikedSongs;
