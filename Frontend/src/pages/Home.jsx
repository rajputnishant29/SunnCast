import React, { useState, useEffect } from 'react';
import MusicCard from '../components/MusicCard';

const Home = () => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/music/allsongs')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch songs');
                }
                return response.json();
            })
            .then((data) => {
                setSongs(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching songs:', error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading songs...</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Home</h1>
            <div>
                {songs.map((song) => (
                    <MusicCard
                        key={song.id}
                        id={song.id}
                        title={song.title}
                        artist={song.artist.join(', ')}
                        coverImage="https://via.placeholder.com/150"
                        onPlay={() => console.log(`Playing ${song.title}`)}
                        onLike={() => console.log(`Liked ${song.title}`)}
                        isLiked={false}
                        musicUrl={song.url}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;
