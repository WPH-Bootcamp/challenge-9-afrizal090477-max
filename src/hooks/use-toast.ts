import { useEffect } from 'react'; // 👈 useState yang nganggur sudah dihapus dari sini

const TOAST_EVENT = 'CUSTOM_SHADCN_TOAST';

interface ToastOptions {
  description: string;
  className?: string;
}

export function useToast() {
  const toast = (options: ToastOptions) => {
    const event = new CustomEvent(TOAST_EVENT, { detail: options });
    window.dispatchEvent(event);
  };

  return { toast };
}

export function useToastListener(callback: (options: ToastOptions) => void) {
  useEffect(() => {
    const handleEvent = (e: Event) => {
      const customEvent = e as CustomEvent<ToastOptions>;
      callback(customEvent.detail);
    };

    window.addEventListener(TOAST_EVENT, handleEvent);
    return () => window.removeEventListener(TOAST_EVENT, handleEvent);
  }, [callback]);
}