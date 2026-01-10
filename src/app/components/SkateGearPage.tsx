import { useState, useEffect } from 'react';
import { ImageWithFallback } from './res/ImageWithFallback';
import { Star, Edit2, Trash2, Plus, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SkateGearPageProps {
  onAddGearClick?: () => void;
  onEditGearClick?: () => void;
  onBackClick?: () => void;
}

type GearCategory = 'All' | 'Deck' | 'Trucks' | 'Wheels';

interface GearItem {
  id: number;
  name: string;
  category: 'deck' | 'truck' | 'wheel';
  brand: string;
  rating: number;
  description: string;
  image_url: string;
  created_by: number;
}

export function SkateGearPage({ onAddGearClick, onEditGearClick, onBackClick }: SkateGearPageProps) {
  const [activeCategory, setActiveCategory] = useState<GearCategory>('All');
  const [gearData, setGearData] = useState<GearItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchGear();
  }, []);

  const fetchGear = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/gear');
      const data = await response.json();
      if (data.success) {
        setGearData(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch gear', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredGear = activeCategory === 'All'
    ? gearData
    : gearData.filter(gear => {
      const map: Record<string, string> = { 'Deck': 'deck', 'Trucks': 'truck', 'Wheels': 'wheel' };
      return gear.category === map[activeCategory];
    });

  const categories: GearCategory[] = ['All', 'Deck', 'Trucks', 'Wheels'];

  return (
    <section className="relative min-h-screen bg-black py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl mb-6 text-neutral-100 tracking-tight">
            Skate Gear Reviews
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Real reviews from the crew. Find the gear that works for your style.
          </p>
        </div>

        {/* Back Button */}
        {onBackClick && (
          <button
            onClick={onBackClick}
            className="absolute top-6 left-6 z-20 flex items-center gap-2 text-neutral-400 hover:text-neutral-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        )}

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-sm transition-all ${activeCategory === category
                ? 'bg-neutral-100 text-black'
                : 'bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200 border border-neutral-800'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? <div className="text-center text-neutral-400">Loading gear...</div> : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredGear.map((gear) => (
              <div
                key={gear.id}
                className="bg-neutral-900 border border-neutral-800 rounded-sm overflow-hidden hover:border-neutral-600 transition-colors group"
              >
                {/* Image */}
                <div className="relative h-48 bg-neutral-800 overflow-hidden">
                  <ImageWithFallback
                    src={gear.image_url || 'https://images.unsplash.com/photo-1547447134-cd3f5c716030?auto=format&fit=crop&q=80&w=1080'} // Fallback
                    alt={gear.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl mb-1 text-neutral-100">{gear.name}</h3>
                      <p className="text-sm text-neutral-500">{gear.brand}</p>
                    </div>
                    <span className="text-xs px-3 py-1 bg-neutral-800 text-neutral-300 rounded-full whitespace-nowrap ml-2 capitalize">
                      {gear.category}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-600 text-amber-600" />
                      <span className="text-neutral-100">{gear.rating}</span>
                    </div>
                    <span className="text-neutral-600">•</span>
                    <span className="text-neutral-500 text-sm">Based on crew reviews</span>
                  </div>

                  {/* Description */}
                  <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                    {gear.description}
                  </p>

                  {/* Action Buttons - Only show for owner or admin */}
                  {(user && (user.id === gear.created_by || user.role === 'admin')) && (
                    <div className="flex items-center gap-2 pt-4 border-t border-neutral-800">
                      <button
                        onClick={onEditGearClick}
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
              </div>
            ))}
          </div>
        )}

        {/* Add Gear Button */}
        <div className="text-center">
          <button
            onClick={onAddGearClick}
            className="px-8 py-4 bg-neutral-100 text-black hover:bg-neutral-200 transition-colors rounded-sm inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Gear Review
          </button>
        </div>

        {/* Info Note */}
        <div className="mt-12 p-4 bg-neutral-900/80 border border-neutral-800 rounded-sm max-w-2xl mx-auto">
          <p className="text-neutral-400 text-sm text-center">
            Note: Share your experience with the gear you ride. Help the community make informed choices.
          </p>
        </div>
      </div>
    </section>
  );
}
