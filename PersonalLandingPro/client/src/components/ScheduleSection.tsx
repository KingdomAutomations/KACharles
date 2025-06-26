import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

// Declare global Calendly interface
declare global {
  interface Window {
    Calendly: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export function ScheduleSection() {
  const handleScheduleClick = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/kingdomautomationsco/automation'
      });
    }
  };

  return (
    <section id="schedule" className="animate-fadeIn bg-black border border-yellow-500 rounded-xl shadow-sm p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center text-white">
        <FaCalendarAlt className="text-yellow-500 mr-3" />
        Schedule a Meeting
      </h2>
      
      <div className="text-center">
        <p className="text-white mb-6 text-lg">
          Ready to streamline your business with custom automation solutions? Let's schedule a time that works for both of us.
        </p>
        
        <Button 
          onClick={handleScheduleClick}
          className="bg-black text-yellow-500 border-2 border-yellow-500 hover:bg-yellow-500 hover:text-black transition-all duration-300 py-3 px-8 text-lg font-semibold"
        >
          Schedule Time With Me
        </Button>
        

      </div>
    </section>
  );
}