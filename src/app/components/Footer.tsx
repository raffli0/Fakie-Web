import { Instagram, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-16 px-6 bg-neutral-950 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="text-3xl mb-4 text-neutral-100">FAKIE</div>
            <p className="text-neutral-500 text-sm">
              A skateboarding community for everyone. Keep pushing.
            </p>
          </div>

          <div>
            <h4 className="text-neutral-100 mb-4">Community</h4>
            <ul className="space-y-2 text-neutral-500 text-sm">
              <li><a href="#" className="hover:text-neutral-300 transition-colors">Member Stories</a></li>
              <li><a href="#" className="hover:text-neutral-300 transition-colors">Code of Conduct</a></li>
              <li><a href="#" className="hover:text-neutral-300 transition-colors">Get Involved</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-neutral-100 mb-4">Resources</h4>
            <ul className="space-y-2 text-neutral-500 text-sm">
              <li><a href="#" className="hover:text-neutral-300 transition-colors">Find Spots</a></li>
              <li><a href="#" className="hover:text-neutral-300 transition-colors">Events Calendar</a></li>
              <li><a href="#" className="hover:text-neutral-300 transition-colors">Learning Resources</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-neutral-100 mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="text-neutral-500 hover:text-neutral-300 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-500 hover:text-neutral-300 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-500 hover:text-neutral-300 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4 text-neutral-600 text-sm">
          <p>© 2026 FAKIE. Built with love by the community.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-neutral-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-neutral-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-neutral-400 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
