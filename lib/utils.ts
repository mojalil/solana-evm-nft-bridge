import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// function to check if viewport is mobile
export function isMobile() {
  return window.innerWidth < 768
}
