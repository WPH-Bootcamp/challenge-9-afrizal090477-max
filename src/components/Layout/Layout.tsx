import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { Toaster } from '@/components/ui/toaster';

export default function Layout() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-x-hidden antialiased">
      
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main className="flex-1 w-full">
        <Outlet context={[searchQuery, setSearchQuery]} />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}