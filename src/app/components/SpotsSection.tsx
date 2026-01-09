import { MapPin, Star, MessageCircle, Edit2 } from 'lucide-react';

interface SpotsSectionProps {
  onSubmitSpotClick?: () => void;
  onEditSpotClick?: () => void;
}
export function SpotsSection({ onSubmitSpotClick, onEditSpotClick }: SpotsSectionProps) {
  const spots = [
    {
      name: "Riverside DIY",
      location: "East Side",
      type: "DIY / Street",
      rating: 4.8,
      comments: 23,
      description: "Handbuilt quarter pipes and rails. Chill vibe, good lighting till 9pm."
    },
    {
      name: "Lincoln Skatepark",
      location: "Downtown",
      type: "Park",
      rating: 4.5,
      comments: 47,
      description: "All concrete, bowl and street sections. Gets crowded on weekends."
    },
    {
      name: "3rd Ave Plaza",
      location: "North District",
      type: "Street Spot",
      rating: 4.2,
      comments: 18,
      description: "Smooth ground, ledges, and stairs. sWatch out for security after 6pm."
    },
    {
      name: "Sunset Ramps",
      location: "West End",
      type: "Park",
      rating: 4.9,
      comments: 31,
      description: "Best transitions in town. Sunset sessions are magical here."
    },
    {
      name: "Market Street Banks",
      location: "Central",
      type: "Street Spot",
      rating: 4.6,
      comments: 29,
      description: "Classic marble banks and gaps. Historic spot, respect the legacy."
    },
    {
      name: "Grove Community Park",
      location: "South Side",
      type: "Beginner Friendly",
      rating: 4.4,
      comments: 15,
      description: "Perfect for learning. Flat ground and small obstacles."
    },
  ];

  return (
    <section id="spots" className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl mb-6 text-neutral-100 tracking-tight">
            Skate Spots
          </h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Community-shared locations. From DIY spots to official parks find your session.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spots.map((spot, index) => (
            <div
              key={index}
              className="p-6 bg-neutral-900 border border-neutral-800 rounded-sm hover:border-neutral-600 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl mb-1 text-neutral-100">{spot.name}</h3>
                  <div className="flex items-center gap-2 text-neutral-500 text-sm">
                    <MapPin className="w-4 h-4" />
                    {spot.location}
                  </div>
                </div>
                <span className="text-xs px-3 py-1 bg-neutral-800 text-neutral-300 rounded-full whitespace-nowrap">
                  {spot.type}
                </span>
              </div>

              <p className="text-neutral-400 mb-4 text-sm leading-relaxed">
                {spot.description}
              </p>

              <div className="flex items-center gap-4 text-sm text-neutral-500">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-600 text-amber-600" />
                  <span>{spot.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{spot.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              className="px-8 py-4 bg-neutral-800 text-neutral-100 hover:bg-neutral-700 transition-colors rounded-sm"
              onClick={onSubmitSpotClick}
            >
              Submit a Spot
            </button>
            <button
              className="px-8 py-4 bg-neutral-800 text-neutral-100 hover:bg-neutral-700 hover:cursor-pointer transition-colors rounded-sm flex items-center gap-2"
              onClick={onEditSpotClick}
            >
              <Edit2 className="w-4 h-4" />
              Edit Demo Spot
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
