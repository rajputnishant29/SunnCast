import React, { useEffect } from "react";
import { useRef, useState } from "react";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useMusicStore } from "../utils/musicStore";

const MusicCard = ({ id , title, artist,musicUrl, coverImage, onPlay, onLike, isLiked }) => {
  const playerRef = useRef(null);
  const currentPlayingID = useMusicStore((state)=> state.currentPlayingID);
  const setCurrentPlayingID = useMusicStore((state) => state.setCurrentPlayingID);
  const likedSongs = useMusicStore((state) => state.likedSongs);
  const addToLikedSongs = useMusicStore((state) => state.addToLikedSongs);
  const removeFromLikedSongs = useMusicStore((state) => state.removeFromLikedSongs);


  useEffect(() => {
    console.log('currentPlayingID in useEffect:', currentPlayingID);
    if(currentPlayingID !== id && playerRef.current) {
      playerRef.current.audio.current.pause();
    }
  },[currentPlayingID, id]);

  const handlePlay = () => {
    console.log('Setting currentPlayingID to:', id);
    setCurrentPlayingID(id);
  };

  const handlePause = () => {
    console.log(currentPlayingID)
    if (currentPlayingID === id) {
      setCurrentPlayingID(null);
    }
  };
  
  const handleLike = () => {
    if (isLiked) {
      console.log('removed from like')
      removeFromLikedSongs(id);
    } else {
      console.log('added to like')
      addToLikedSongs({ id, title, artist, musicUrl, coverImage });
    }
  };

  return (
    <div className="bg-white shadow-md mx-10 my-2 rounded-lg p-4 flex items-center space-x-4 hover:shadow-lg transition-shadow duration-300">
      <img
        src={'https://th.bing.com/th/id/OIP.zWyPg0_OJkKOYqRtLCc1ewHaHa?rs=1&pid=ImgDetMain'}
        alt={`${title} cover`}
        className="w-16 h-16 rounded-md object-cover"
      />

      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{artist}</p>
      </div>


      <div className="flex items-center w-[60%] space-x-2">

<AudioPlayer
        src={musicUrl} 
        onPlay={() => console.log(`Playing: ${title}`)}
        showJumpControls={true} 
        customAdditionalControls={[]}
        layout="horizontal"
        listenInterval={100}
        onCanPlay={handlePlay}
        onPause={handlePause}
      />
    </div>

    <button
          onClick={handleLike}
          className={`p-2 rounded-full ${isLiked ? 'bg-red-500' : 'bg-gray-200'}`}
        >
          ❤️
        </button>
  </div>
  );
};

export default MusicCard;
