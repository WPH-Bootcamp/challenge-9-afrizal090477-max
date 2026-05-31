import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility function for merging Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


// Hint: TMDB returns relative paths, you need to construct full image URLs
// Reference: https://developer.themoviedb.org/docs/image-basics

export function getImageUrl(path: string | null | undefined, size: string = 'w500'): string {
  // Use VITE_TMDB_IMAGE_BASE_URL from environment variables
  if (!path) {
    if (size === 'original' || size.startsWith('w1280')) {
      return 'https://placehold.co/1920x1080?text=No+Image+Available';
    }
    return 'https://placehold.co/500x750?text=No+Poster';
  }

  const baseUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p';
  return `${baseUrl}/${size}${path}`;
}


// Examples: formatDate, formatRuntime, etc.

/**
 * Memformat string tanggal dari TMDB (YYYY-MM-DD) menjadi format lokal Indonesia (DD MMMM YYYY)
 * Contoh: "2026-05-26" -> "26 Mei 2026"
 */
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

/**
 * Mengonversi durasi menit murni dari TMDB menjadi format Jam & Menit
 * Contoh: 142 -> "2h 22m"
 */
export function formatRuntime(minutes: number | null | undefined): string {
  if (!minutes || minutes <= 0) return 'N/A';
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours === 0) return `${remainingMinutes}m`;
  if (remainingMinutes === 0) return `${hours}h`;
  
  return `${hours}h ${remainingMinutes}m`;
}