export function CultureSection() {
  const values = [
    {
      title: "Respect",
      description: "The spot, the locals, the board. We look out for each other and take care of where we skate.",
    },
    {
      title: "Creativity",
      description: "Every skater has their own style. Express yourself, try new lines, make the spot yours.",
    },
    {
      title: "Freedom",
      description: "Skating is about freedom no rules, no judgement. Just you, your board, and the street.",
    },
    {
      title: "Progress",
      description: "Land a trick or eat concrete both are part of the journey. Keep pushing, keep learning.",
    }
  ];

  return (
    <section id="about" className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl mb-6 text-neutral-100 tracking-tight">
            What We Stand For
          </h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            The culture that brings us together—values we live by on and off the board.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {values.map((value, index) => (
            <div
              key={index}
              className="p-10 bg-neutral-900/50 border border-neutral-800 rounded-sm"
            >
              {/* <div className="text-5xl mb-6">{value.icon}</div> */}
              <h3 className="text-3xl mb-4 text-neutral-100">{value.title}</h3>
              <p className="text-neutral-400 text-lg leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto text-center p-12 bg-neutral-900 border border-neutral-800 rounded-sm">
          <h3 className="text-3xl mb-6 text-neutral-100">
            Built by skaters, for skaters
          </h3>
          <p className="text-neutral-400 text-lg leading-relaxed mb-8">
            FAKIE started as a small crew sharing spots and session times.
            Now we're a growing community where everyone from kids learning to push
            to seasoned street skaters can find their place. This is more than a
            website; it's a hub for real people who love skateboarding.
          </p>
          <button className="px-8 py-4 bg-neutral-100 text-black hover:bg-neutral-200 transition-colors rounded-sm">
            Join Us
          </button>
        </div>
      </div>
    </section>
  );
}
