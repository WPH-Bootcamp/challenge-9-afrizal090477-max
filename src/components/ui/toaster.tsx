import { useState } from 'react';
import { useToastListener } from '@/hooks/use-toast';
import { AnimatePresence, motion } from 'framer-motion';

interface ToastState {
  description: string;
  className?: string;
}

export function Toaster() {
  const [toast, setToast] = useState<ToastState | null>(null);

  useToastListener((options) => {
    setToast(options);

    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  });

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          // KALIBRASI ANIMASI MELUNCUR HALUS DARI ARAH ATAS NAVBAR
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="w-[531px] h-[52px] bg-[#00000040] backdrop-blur-[40px] border border-zinc-800 text-[#FDFDFD] rounded-2xl flex items-center px-6 justify-start fixed top-[114px] left-1/2 -translate-x-1/2 shadow-2xl z-50 text-sm font-medium"
        >
          {/* Ikon lingkaran centang hijau pemanis estetik figma */}
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center mr-3 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3 text-emerald-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          
          {/* Teks pesan toast "Success Add to Favorites" */}
          <span className="font-body font-medium text-white">
            {toast.description}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}