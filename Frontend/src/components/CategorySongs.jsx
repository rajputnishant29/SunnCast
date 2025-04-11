import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MusicCard from './MusicCard';

const CategorySongs = () => {
  const {categoryName} = useParams();
  const [songs,setSongs] = useState([]);

  useEffect(() => {
    if (categoryName) {
      axios
        .get(`http://localhost:3000/song/category/${categoryName}`)
        .then((response) => {
          console.log(response.data);  
          setSongs(response.data.songs); 
        })
        .catch((error) => console.error("Error fetching songs:", error));
    }
  }, [categoryName]);
  return (
    <div className="p-6">
    <h2 className="text-xl font-semibold mb-4">Songs in {categoryName}</h2>
    <div className="">
      {songs.length > 0 ? (
        songs.map((song) => ( 
          <MusicCard
          title={song.title}
          artist={song.artist}
          coverImage="https://via.placeholder.com/150" 
          onPlay={() => console.log(`Playing ${song.title}`)}
          onLike={() => console.log(`Liked ${song.title}`)}
          isLiked={false}
          musicUrl={song.url}
      />
        ))
      ) : (
        <p>No songs available in this category.</p>
      )}
    </div>
  </div>
  )
}

export default CategorySongs