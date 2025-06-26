import { Link } from "wouter";

export function Header() {
  // Smooth scroll function for anchor links
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="w-full py-4 bg-black border-b border-yellow-500 shadow-sm">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">
          <span className="text-yellow-500">Charles</span> Peralta
        </h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <button 
                onClick={() => scrollToSection("about")} 
                className="text-gray-300 hover:text-yellow-500 transition-colors duration-200"
              >
                About
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection("schedule")} 
                className="text-gray-300 hover:text-yellow-500 transition-colors duration-200"
              >
                Schedule
              </button>
            </li>

            <li>
              <button 
                onClick={() => scrollToSection("links")} 
                className="text-gray-300 hover:text-yellow-500 transition-colors duration-200"
              >
                Links
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
