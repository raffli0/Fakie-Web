import { Calendar, Clock, Users } from 'lucide-react';

export function EventsSection() {
  const events = [
    {
      title: "Friday Night Session",
      date: "Jan 10, 2026",
      time: "7:00 PM",
      location: "Riverside DIY",
      attendees: 24,
      type: "Weekly Meetup",
      color: "border-amber-800/50"
    },
    {
      title: "Beginners Welcome Jam",
      date: "Jan 12, 2026",
      time: "2:00 PM",
      location: "Grove Community Park",
      attendees: 18,
      type: "Learning Session",
      color: "border-lime-800/50"
    },
    {
      title: "Street Cleanup & Skate",
      date: "Jan 15, 2026",
      time: "10:00 AM",
      location: "Market Street Banks",
      attendees: 31,
      type: "Community Service",
      color: "border-red-800/50"
    },
    {
      title: "Sunset Bowl Sesh",
      date: "Jan 17, 2026",
      time: "5:30 PM",
      location: "Sunset Ramps",
      attendees: 42,
      type: "Open Session",
      color: "border-amber-800/50"
    }
  ];

  return (
    <section id="events" className="py-24 px-6 bg-neutral-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl mb-6 text-neutral-100 tracking-tight">
            Events & Sessions
          </h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Local jams, meetups, and community gatherings. Roll through and meet the crew.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {events.map((event, index) => (
            <div 
              key={index}
              className={`p-8 bg-neutral-800/50 border-2 rounded-sm ${event.color}`}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl text-neutral-100">{event.title}</h3>
                <span className="text-xs px-3 py-1 bg-neutral-700 text-neutral-300 rounded-full whitespace-nowrap">
                  {event.type}
                </span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-neutral-400">
                  <Calendar className="w-5 h-5" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-3 text-neutral-400">
                  <Clock className="w-5 h-5" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-3 text-neutral-400">
                  <Users className="w-5 h-5" />
                  <span>{event.attendees} going</span>
                </div>
              </div>

              <div className="text-neutral-300 mb-6">
                📍 {event.location}
              </div>

              <button className="w-full py-3 bg-neutral-700 hover:bg-neutral-600 text-neutral-100 rounded-sm transition-colors">
                I'm Going
              </button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="px-8 py-4 border-2 border-neutral-600 text-neutral-100 hover:border-neutral-400 transition-colors rounded-sm">
            View All Events
          </button>
        </div>
      </div>
    </section>
  );
}
