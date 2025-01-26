import React from "react";

const Podcasts = () => {
  const podcasts = [
    {
      id: 1,
      title: "Tech Talks",
      description: "Stay updated with the latest in technology and innovation.",
      image: "https://th.bing.com/th/id/OIP.zWyPg0_OJkKOYqRtLCc1ewHaHa?rs=1&pid=ImgDetMain",
    },
    {
      id: 2,
      title: "Wellness Wonders",
      description: "Explore tips and stories for a healthier lifestyle.",
      image: "https://th.bing.com/th/id/OIP.zWyPg0_OJkKOYqRtLCc1ewHaHa?rs=1&pid=ImgDetMain",
    },
  ];

  return (
    <div className="mx-10">
      <h2 className="text-2xl mt-2 font-bold mb-6">Podcasts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-50">
        {podcasts.map((podcast) => (
          <div
            key={podcast.id}
            className="relative bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40"
              style={{ backgroundImage: `url(${podcast.image})` }}
            ></div>
            <div className="relative p-6 flex flex-col h-full">
              <h3 className="text-xl font-bold mb-20">{podcast.title}</h3>
              <p className="mt-20">{podcast.description}</p>
              <button className="mt-5 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-300">
                Listen Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Podcasts;
