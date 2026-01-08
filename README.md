# FAKIE - Skateboarding Community Platform

A community-focused skateboarding website that celebrates inclusivity, authenticity, and street culture. FAKIE is a place where skaters of all backgrounds and skill levels can connect, share spots, and belong to a welcoming crew.

![FAKIE Skateboarding Community](https://images.unsplash.com/photo-1761772783144-a871bfa457ed?w=1200&h=400&fit=crop)

## 🛹 About FAKIE

FAKIE is more than just a website—it's a digital hub for the skateboarding community. The platform focuses on:

- **Inclusivity**: Welcoming skaters from all backgrounds, ages, and skill levels
- **Community**: Connecting local crews and sharing authentic stories
- **Spots**: Community-curated skate locations and parks
- **Events**: Local jams, sessions, and meetups
- **Culture**: Celebrating the values of respect, creativity, freedom, and progress

## ✨ Features

### 🏠 Hero Section
- Bold branding with "FAKIE" headline
- Atmospheric skateboarding photography
- Clear calls-to-action: "JOIN THE COMMUNITY" and "EXPLORE SPOTS"

### 👥 Community Section
- Real stories from skaters of all levels (Beginner, Intermediate, Pro)
- Community values showcase (All Levels Welcome, Support & Respect, Authentic Culture)
- Visual storytelling through member testimonials

### 📍 Skate Spots
- Community-shared skate locations
- Spot ratings and user comments
- Detailed descriptions with tips (lighting, security, obstacles)
- Categories: DIY/Street, Park, Beginner Friendly
- 6 featured spots across different neighborhoods

### 📅 Events & Sessions
- Upcoming community events and meetups
- Event details: date, time, location, attendees
- Event types: Weekly Meetups, Learning Sessions, Community Service, Open Sessions
- RSVP functionality

### 🎯 Culture & Values
- Core skateboarding values: Respect, Creativity, Freedom, Progress
- Mission statement and community story
- "Built by skaters, for skaters" philosophy

### 🔗 Footer
- Navigation links to resources
- Social media connections (Instagram, Twitter, YouTube)
- Legal links (Privacy, Terms, Contact)

## 🎨 Design Philosophy

### Visual Style
- **Dark Underground Aesthetic**: Black/asphalt base (#000000)
- **Warm Palette**: Off-white text (#e5e5e5), neutral grays
- **Accent Colors**: Muted olive, faded orange, worn red (subtle usage)
- **Grain Texture**: Subtle SVG noise overlay for authentic concrete feel
- **No Corporate UI**: Minimal rounded corners, no glossy effects, no gradients

### Typography
- Bold, condensed fonts for headings (tracking-tight)
- Clean, readable sans-serif for body text
- Natural hierarchy without aggressive styling
- Responsive font sizes (mobile-first)

### User Experience
- **Smooth Scrolling**: Anchor navigation between sections
- **Responsive Design**: Mobile-first approach, adapts to all screen sizes
- **Accessibility**: Semantic HTML, proper ARIA labels, high contrast
- **Performance**: Optimized images from Unsplash, minimal dependencies

## 🛠 Tech Stack

### Core
- **React 18.3.1** - UI library
- **Vite 7.2.7** - Build tool and dev server
- **TypeScript** - Type safety (via JSX)
- **Tailwind CSS v4** - Utility-first styling

### UI & Icons
- **Lucide React** - Icon library (MapPin, Star, Calendar, Users, etc.)
- **@radix-ui** - Accessible UI primitives (available)
- **Motion** - Animation library (available)

### Styling
- **@tailwindcss/vite** - Tailwind CSS v4 integration
- **Custom CSS** - Grain texture overlay, smooth scroll

### Images
- **Unsplash** - High-quality skateboarding photography
- **ImageWithFallback** - Custom component for reliable image loading

## 📁 Project Structure

```
fakie-skateboarding/
├── src/
│   ├── app/
│   │   ├── App.tsx                    # Main application component
│   │   └── components/
│   │       ├── Navigation.tsx         # Fixed top navigation
│   │       ├── Hero.tsx              # Hero section with CTA
│   │       ├── CommunitySection.tsx  # Community stories & values
│   │       ├── SpotsSection.tsx      # Skate spots directory
│   │       ├── EventsSection.tsx     # Events & sessions
│   │       ├── CultureSection.tsx    # Values & mission
│   │       ├── Footer.tsx            # Site footer
│   │       └── figma/
│   │           └── ImageWithFallback.tsx  # Image component
│   ├── styles/
│   │   ├── index.css                 # Main stylesheet (imports)
│   │   ├── tailwind.css              # Tailwind directives
│   │   ├── theme.css                 # Design tokens
│   │   └── fonts.css                 # Font imports
│   └── main.tsx                       # Application entry point
├── public/                            # Static assets
├── vite.config.ts                     # Vite configuration
├── postcss.config.mjs                 # PostCSS config (empty)
└── package.json                       # Dependencies
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ 
- **npm**, **yarn**, or **pnpm**

### Installation

1. **Clone or download the project**
   ```bash
   # If you have git
   git clone <repository-url>
   cd fakie-skateboarding
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

The production build will be created in the `dist/` directory.

## 🎯 Component Overview

### Navigation
- Fixed position navigation bar
- Smooth anchor scrolling to sections
- Links: Home, Community, Spots, Events, About

### Hero
- Full-screen hero with background image
- Large "FAKIE" headline
- Subtitle: "A place to skate, learn, and belong."
- Two CTA buttons with different styles
- Animated scroll indicator

### CommunitySection
- 3 skater stories with images and testimonials
- Color-coded accent borders (amber, lime, red)
- 3 value cards with icons and descriptions
- Grid layout (responsive)

### SpotsSection
- 6 skate spot cards with details
- Star ratings and comment counts
- Location, type, and description
- Hover effects for interactivity
- "Submit a Spot" CTA

### EventsSection
- 4 upcoming event cards
- Date, time, location, attendee count
- Event type badges (color-coded)
- "I'm Going" RSVP buttons
- "View All Events" link

### CultureSection
- 4 value cards with emoji icons
- Large description cards in 2x2 grid
- Mission statement with story
- "Join Us" CTA button

### Footer
- 4-column layout (responsive)
- Brand, Community, Resources, Connect sections
- Social media icons (Instagram, Twitter, YouTube)
- Copyright and legal links

## 🎨 Customization

### Colors
Edit `/src/styles/theme.css` to customize the color palette:
- Background colors
- Text colors
- Accent colors
- Border colors

### Content
Update component files to change:
- Skater stories (`CommunitySection.tsx`)
- Skate spots (`SpotsSection.tsx`)
- Events (`EventsSection.tsx`)
- Values and mission (`CultureSection.tsx`)

### Images
Replace Unsplash URLs in components with your own images. Images are currently sourced from:
- Hero: Concrete skate park
- Community: Skater portraits and action shots
- All images use the `ImageWithFallback` component

### Typography
Fonts can be customized in `/src/styles/fonts.css` and `/src/styles/theme.css`

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

Uses Tailwind's default breakpoints:
- `sm:` 640px
- `md:` 768px
- `lg:` 1024px
- `xl:` 1280px

## ♿ Accessibility

- Semantic HTML5 elements (`<nav>`, `<section>`, `<article>`, `<footer>`)
- ARIA labels for icon-only buttons
- High contrast text (WCAG AA compliant)
- Keyboard navigation support
- Focus states on interactive elements
- Alt text for all images

## 🤝 Contributing

This is a community-focused project. Ideas for contribution:
- Add more skate spots with real data
- Implement user authentication
- Create spot submission form
- Add map integration for spots
- Build event calendar functionality
- Implement photo gallery/feed

## 📄 License

MIT License - feel free to use this project for your own skateboarding community!

## 🙏 Credits

- **Photography**: [Unsplash](https://unsplash.com) - Skateboarding images
- **Icons**: [Lucide React](https://lucide.dev)
- **Design**: Inspired by authentic street skateboarding culture

## 📞 Contact

For questions, suggestions, or to share your local FAKIE community, reach out through the footer contact links.

---

**Keep pushing. Respect the spot. Hype the crew. 🛹**
