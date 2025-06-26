import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Animation utility for fade-in effect
export const fadeInAnimation = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

// Format a date with time
export function formatDateTime(date: Date, time: string): string {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
  }).format(date) + ' at ' + time;
}
