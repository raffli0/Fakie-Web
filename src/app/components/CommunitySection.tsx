import { ImageWithFallback } from './res/ImageWithFallback';
import { Users, Heart, Sparkles } from 'lucide-react';

export function CommunitySection() {
  const stories = [
    {
      name: "Maya",
      level: "Beginner",
      story: "Started skating at 28. The crew welcomed me with open arms and taught me everything from pushing to my first ollie.",
      image: "https://images.unsplash.com/photo-1764567386739-d1fd15231329?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2F0ZWJvYXJkJTIwY29tbXVuaXR5fGVufDF8fHx8MTc2Nzg4MDkxNnww&ixlib=rb-4.1.0&q=80&w=1080",
      accent: "bg-amber-900/20 border-amber-800/30"
    },
    {
      name: "Tony",
      level: "Intermediate",
      story: "This community helped me find spots I never knew existed. Now I'm teaching others and giving back.",
      image: "https://images.unsplash.com/photo-1761069234652-9dd7fc92b845?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2F0ZWJvYXJkaW5nJTIwc3RyZWV0JTIwdXJiYW58ZW58MXx8fHwxNzY3ODgwOTE1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      accent: "bg-lime-900/20 border-lime-800/30"
    },
    {
      name: "Axel",
      level: "Pro",
      story: "Been skating for 15 years. FAKIE reminds me why I started—pure love for the board and the people.",
      image: "https://images.unsplash.com/photo-1577545726235-e3ac5e5b91f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2F0ZSUyMHBhcmslMjBkaXZlcnNlfGVufDF8fHx8MTc2Nzg4MDkxNnww&ixlib=rb-4.1.0&q=80&w=1080",
      accent: "bg-red-900/20 border-red-800/30"
    }
  ];

  return (
    <section id="community" className="py-24 px-6 bg-neutral-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl mb-6 text-neutral-100 tracking-tight">
            Our Community
          </h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            From first pushes to landing new tricks—everyone has a story. Here are just a few voices from our crew.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {stories.map((story, index) => (
            <div
              key={index}
              className={`border rounded-sm overflow-hidden ${story.accent} backdrop-blur-sm`}
            >
              <div className="h-64 overflow-hidden">
                <ImageWithFallback
                  src={story.image}
                  alt={`${story.name}'s story`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl text-neutral-100">{story.name}</h3>
                  <span className="text-sm px-3 py-1 bg-neutral-800/50 text-neutral-300 rounded-full">
                    {story.level}
                  </span>
                </div>
                <p className="text-neutral-300 leading-relaxed">
                  "{story.story}"
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-8 bg-neutral-800/50 border border-neutral-700 rounded-sm">
            <Users className="w-12 h-12 mx-auto mb-4 text-neutral-300" />
            <h3 className="text-xl mb-2 text-neutral-100">All Levels Welcome</h3>
            <p className="text-neutral-400">
              First timer? Seasoned vet? Everyone rolls together.
            </p>
          </div>
          <div className="p-8 bg-neutral-800/50 border border-neutral-700 rounded-sm">
            <Heart className="w-12 h-12 mx-auto mb-4 text-neutral-300" />
            <h3 className="text-xl mb-2 text-neutral-100">Support & Respect</h3>
            <p className="text-neutral-400">
              We celebrate progress, not perfection. Hype each other up.
            </p>
          </div>
          <div className="p-8 bg-neutral-800/50 border border-neutral-700 rounded-sm">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-neutral-300" />
            <h3 className="text-xl mb-2 text-neutral-100">Authentic Culture</h3>
            <p className="text-neutral-400">
              Real people, real sessions. No fake energy here.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
