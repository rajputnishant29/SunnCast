import useUserStore from "../utils/useUserStore";

const LikeButton = ({ songId }) => {
  const { likedSongs, likeSong, unlikeSong } = useUserStore();
  const isLiked = likedSongs?.includes(songId);

  const handleLike = () => {
    if (isLiked) {
      console.log('liked')
      unlikeSong(songId);
    } else {
      console.log('unliked');
      likeSong(songId);
    }
  };

  return (
    <button
      onClick={handleLike}
      className={`text-2xl transition duration-200 ${
        isLiked ? "text-red-500" : "text-gray-400 hover:text-red-500"
      }`}
    >
      {isLiked ? "❤️" : "🤍"}
    </button>
  );
};

export default LikeButton;
