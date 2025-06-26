import { FaLink } from "react-icons/fa";

type Link = {
  id: string;
  title: string;
  description: string;
  url: string;
  ariaLabel: string;
};

export function LinkTreeSection() {
  const links: Link[] = [
    {
      id: "start-automating",
      title: "Start Automating Today",
      description: "Enterprise-grade automation solutions",
      url: "https://www.fiverr.com/s/xX6RP3a",
      ariaLabel: "Start Automating Today - Enterprise-grade automation solutions",
    },
    {
      id: "free-strategy",
      title: "Claim Your Free Automation Strategy",
      description: "Custom automation roadmap for your business",
      url: "https://docs.google.com/forms/d/1OP05TCzG6JKRQt_6-Cs0j53oEbfCMJCyP3pGGItKWZE/edit?usp=drivesdk",
      ariaLabel: "Claim Your Free Automation Strategy - Custom automation roadmap for your business",
    },
    {
      id: "free-leads",
      title: "Get 100 Free Leads For Your Business",
      description: "Lead generation system to test before you invest",
      url: "https://docs.google.com/forms/d/1LeKNNlPMFWGbZWg1NSV_bRy62BS1jP7c4V4DPyuM9Ao/viewform?edit_requested=true",
      ariaLabel: "Get 100 Free Leads For Your Business - Lead generation system to test before you invest",
    },
    {
      id: "whespc",
      title: "Visit WHESPC",
      description: "Wire harness + LED solutions for OEM and industrial clients",
      url: "https://whespc.netlify.app/",
      ariaLabel: "Visit WHESPC - Wire harness and LED solutions for OEM and industrial clients",
    },
  ];

  return (
    <section id="links" className="animate-fadeIn bg-black border border-yellow-500 rounded-xl shadow-sm p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center text-white">
        <FaLink className="text-yellow-500 mr-3" />
        Quick Links
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {links.map((link) => (
          <a 
            key={link.id}
            href={link.url} 
            target={link.url.startsWith('http') ? "_blank" : "_self"}
            rel={link.url.startsWith('http') ? "noopener noreferrer" : undefined}
            aria-label={link.ariaLabel}
            className="bg-black border border-yellow-500 rounded-lg p-4 flex items-center gap-4 hover:bg-yellow-500 hover:text-black transition-all duration-300 hover:shadow-lg group"
          >
            <div className="w-4 h-4 rounded-full bg-yellow-500 flex-shrink-0 group-hover:bg-black"></div>
            <div>
              <h3 className="text-base font-semibold text-white group-hover:text-black">{link.title}</h3>
              <p className="text-sm text-gray-400 group-hover:text-gray-700">{link.description}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}