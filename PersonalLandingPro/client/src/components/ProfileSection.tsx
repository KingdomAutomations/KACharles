import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";

export function ProfileSection() {
  return (
    <section id="about" className="animate-fadeIn bg-black border border-yellow-500 rounded-xl shadow-sm p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="shrink-0">
          <img 
            src="/assets/charles_profile_new.png" 
            alt="Charles Peralta profile picture" 
            className="w-32 h-32 rounded-full object-cover border-4 border-yellow-500 shadow-lg shadow-yellow-500/50"
          />
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold text-white mb-2">Charles Peralta</h2>
          <p className="text-yellow-500 font-medium mb-4">Founder of Kingdom Automations | VP at WHESPC</p>
          <p className="text-gray-300 max-w-lg mb-6">
            I'm the Founder of Kingdom Automations, where I design automation systems that eliminate repetitive tasks, streamline operations, and save businesses real time. My focus is simple: build systems that create efficiency, deliver value, and let people focus on what actually moves the needle.
          </p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-3">
            <a 
              href="https://www.linkedin.com/in/charlesperalta" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm px-4 py-2 border border-yellow-500 rounded-full text-yellow-500 hover:bg-yellow-500 hover:text-black transition-colors"
            >
              <FaLinkedin className="text-yellow-500 mr-2" /> LinkedIn
            </a>
            <a 
              href="https://www.instagram.com/charleslovesyhwh" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm px-4 py-2 border border-yellow-500 rounded-full text-yellow-500 hover:bg-yellow-500 hover:text-black transition-colors"
            >
              <FaInstagram className="text-yellow-500 mr-2" /> Instagram
            </a>
            <a 
              href="https://www.facebook.com/TheCharlesPeralta" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm px-4 py-2 border border-yellow-500 rounded-full text-yellow-500 hover:bg-yellow-500 hover:text-black transition-colors"
            >
              <FaFacebook className="text-yellow-500 mr-2" /> Facebook
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
