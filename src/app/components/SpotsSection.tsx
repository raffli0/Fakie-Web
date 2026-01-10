import { useState, useEffect } from 'react';
import { MapPin, Star, MessageCircle, Edit2, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface ComponentProps {
  onSubmitSpotClick?: () => void;
  onEditSpotClick?: (spotId: number) => void;
}

interface Spot {
  id: number;
  name: string;
  location: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  created_at: string;
  created_by: number;
}

export function SpotsSection({ onSubmitSpotClick, onEditSpotClick }: ComponentProps) {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchSpots();
  }, []);

  const fetchSpots = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/spots');
      const data = await response.json();
      if (data.success) {
        setSpots(data.data);
      } else {
        setError('Failed to load spots');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

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

        {loading ? (
          <div className="text-center text-neutral-400">Loading spots...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spots.map((spot) => (
              <div
                key={spot.id}
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
                  <span className={`text-xs px-3 py-1 rounded-full whitespace-nowrap capitalize 
                    ${spot.difficulty === 'easy' ? 'bg-green-900 text-green-300' :
                      spot.difficulty === 'medium' ? 'bg-yellow-900 text-yellow-300' :
                        'bg-red-900 text-red-300'}`}>
                    {spot.difficulty}
                  </span>
                </div>

                <p className="text-neutral-400 mb-4 text-sm leading-relaxed">
                  {spot.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-neutral-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-neutral-700 text-neutral-700" />
                    <span>-</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>-</span>
                  </div>
                </div>

                {/* Action Buttons - Only show for owner or admin */}
                {(user && (user.id === spot.created_by || user.role === 'admin')) && (
                  <div className="flex items-center gap-2 pt-4 border-t border-neutral-800">
                    <button
                      onClick={() => onEditSpotClick?.(spot.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-neutral-100 transition-colors rounded-sm text-sm"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-red-900/20 text-red-400 hover:bg-red-900/30 border border-red-900/30 hover:border-red-800/50 transition-colors rounded-sm text-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <button
            className="px-8 py-4 bg-neutral-800 text-neutral-100 hover:bg-neutral-700 transition-colors rounded-sm"
            onClick={onSubmitSpotClick}
          >
            Submit a Spot
          </button>
        </div>
      </div>
    </section>
  );
}
