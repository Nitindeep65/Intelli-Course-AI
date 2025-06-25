import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-4 py-10 sm:px-6 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 md:flex-row md:justify-between">
        
        {/* Brand / Description */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-3">IntelliCourse</h1>
          <p className="text-sm text-gray-400 leading-relaxed">
            IntelliCourse is your go-to platform for mastering the latest in AI and machine learning. 
            Join us to enhance your skills with cutting-edge courses designed by industry experts.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/about" className="hover:text-white transition">About</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4">Connect</h2>
          <div className="flex space-x-5">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub className="text-2xl hover:text-gray-300 transition" />
            </a>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin className="text-2xl hover:text-gray-300 transition" />
            </a>
            <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter className="text-2xl hover:text-gray-300 transition" />
            </a>
            <a href="mailto:your@email.com" aria-label="Email">
              <FaEnvelope className="text-2xl hover:text-gray-300 transition" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-800 pt-5 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Intelli Course. All rights reserved.
      </div>
    </footer>
  );
}
