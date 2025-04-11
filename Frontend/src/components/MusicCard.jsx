import React from "react";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import LikeButton from "./LikeButton";

const MusicCard = ({ title, artist,musicUrl }) => {

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
      />
      <LikeButton/>
    </div>
  </div>
  );
};

export default MusicCard;
