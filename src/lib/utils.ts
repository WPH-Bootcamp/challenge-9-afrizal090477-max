import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(path: string | null | undefined, size: string = 'w500'): string {
  if (!path) {
    if (size === 'original' || size.startsWith('w1280')) {
      return 'https://placehold.co/1920x1080?text=No+Image+Available';
    }
    return 'https://placehold.co/500x750?text=No+Poster';
  }
  const baseUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p';
  return `${baseUrl}/${size}${path}`;
}


export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'N/A';
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatRuntime(minutes: number | null | undefined): string {
  if (!minutes || minutes <= 0) return 'N/A';
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours === 0) return `${remainingMinutes}m`;
  if (remainingMinutes === 0) return `${hours}h`;
  
  return `${hours}h ${remainingMinutes}m`;
}