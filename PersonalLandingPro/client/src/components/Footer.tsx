import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-black border-t border-yellow-500 py-8 mt-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-4 sm:mb-0">
            <p className="text-gray-300 text-sm">© {new Date().getFullYear()} Charles Peralta. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <a href="https://www.linkedin.com/in/charlesperalta" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-yellow-500 transition-colors">
              <FaLinkedin className="text-lg" />
            </a>
            <a href="https://www.instagram.com/charleslovesyhwh" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-yellow-500 transition-colors">
              <FaInstagram className="text-lg" />
            </a>
            <a href="https://www.facebook.com/TheCharlesPeralta" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-yellow-500 transition-colors">
              <FaFacebook className="text-lg" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
