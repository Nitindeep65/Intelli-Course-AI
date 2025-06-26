import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-6 py-12 sm:px-8 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 md:flex-row md:justify-between">
        
        {/* Brand Section */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-3">
            IntelliCourse
          </h1>
          <p className="text-sm text-gray-400 leading-relaxed">
            IntelliCourse is your go-to platform for mastering the latest in AI and software development.
            Learn from industry experts and level up your skills with personalized, interactive, AI-powered content.
          </p>
          <p className="mt-4 text-xs text-gray-500 italic">
            Version 1.0 - Built with passion and innovation by the IntelliCourse team. 
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="/" className="hover:text-indigo-400 transition">Home</a></li>
            <li><a href="/about" className="hover:text-indigo-400 transition">About</a></li>
            <li><a href="/features" className="hover:text-indigo-400 transition">Features</a></li>
            <li><a href="/contact" className="hover:text-indigo-400 transition">Contact</a></li>
            <li><a href="/login" className="hover:text-indigo-400 transition">Login</a></li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4">Connect with Us</h2>
          <div className="flex space-x-5">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub className="text-2xl hover:text-indigo-400 transition" />
            </a>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin className="text-2xl hover:text-indigo-400 transition" />
            </a>
            <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter className="text-2xl hover:text-indigo-400 transition" />
            </a>
            <a href="mailto:your@email.com" aria-label="Email">
              <FaEnvelope className="text-2xl hover:text-indigo-400 transition" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} <span className="text-indigo-400 font-medium">IntelliCourse</span>. All rights reserved.
      </div>
    </footer>
  );
}
