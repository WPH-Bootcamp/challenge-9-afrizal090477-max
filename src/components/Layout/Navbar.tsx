import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Search, Menu, X, ArrowLeft, Mic } from 'lucide-react';
import { type NavbarProps } from '../../types/layout';
import MovieLogo from '../../assets/logo-tv1.png'; 

export default function Navbar({ searchQuery, setSearchQuery }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isShiftActive, setIsShiftActive] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const devtoolsPanel = document.querySelector('.tsqd-parent-container') || 
                          document.querySelector('[id^="tanstack-query-devtools"]');
    
    if (devtoolsPanel) {
      if (isMobileSearchOpen) {
        (devtoolsPanel as HTMLElement).style.display = 'none';
      } else {
        (devtoolsPanel as HTMLElement).style.display = 'block';
      }
    }
  }, [isMobileSearchOpen]);


  const handleKeyClick = (key: string) => {
    const char = isShiftActive ? key.toUpperCase() : key.toLowerCase();
    setSearchQuery(searchQuery + char);
    if (isShiftActive) {
      setIsShiftActive(false);
    }
  };

  
  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 w-full h-[90px] flex items-center transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#0A0D1295] backdrop-blur-xl border-b border-zinc-900/80 shadow-2xl' 
            : 'bg-gradient-to-b from-black/80 via-black/30 to-transparent border-b border-transparent'
        }`}
      >
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-12 lg:px-[140px] flex items-center justify-between">
          <div className="flex items-center gap-14">
            <NavLink to="/" className="flex items-center gap-2.5 text-[28.44px] font-semibold tracking-[-4%] text-[#FDFDFD] select-none">
              <img src={MovieLogo} alt="Movie App Logo" className="w-7 h-7 object-contain" draggable="false" />
              <span className="font-display">Movie</span>
            </NavLink>
            
            <nav className="hidden md:flex items-center gap-10">
              <NavLink to="/" className={({ isActive }) => `text-sm font-medium tracking-wide transition-colors duration-200 hover:text-white ${isActive ? 'text-white font-semibold' : 'text-zinc-400'}`}>Home</NavLink>
              <NavLink to="/favorites" className={({ isActive }) => `text-sm font-medium tracking-wide transition-colors duration-200 hover:text-white ${isActive ? 'text-white font-semibold' : 'text-zinc-400'}`}>Favorites</NavLink>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block w-[243px] h-[56px]">
              <span className="absolute inset-y-0 left-4 flex items-center text-[#98A2B3] z-10">
                <Search className="w-5 h-5 stroke-[2.5]" />
              </span>
              <input
                type="text"
                placeholder="Search Movie"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-full bg-[#0A0D12] border border-[#252B37] rounded-xl pl-12 pr-10 text-sm text-white placeholder-[#98A2B3] focus:outline-none focus:border-zinc-600 transition-all shadow-xl relative z-0"
              />

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-3 flex items-center justify-center z-10 cursor-pointer"
                >
                  <div className="w-5 h-5 bg-[#414651] rounded-full flex items-center justify-center relative">
                    <X className="w-[16.6px] h-[16.6px] text-zinc-100 absolute" style={{ top: '1.67px', left: '1.67px' }} />
                  </div>
                </button>
              )}
            </div>

            <button onClick={() => setIsMobileSearchOpen(true)} className="md:hidden text-zinc-300 hover:text-white p-2 transition-colors">
              <Search className="w-6 h-6" />
            </button>

            <button onClick={() => setIsMenuOpen(true)} className="md:hidden flex flex-col justify-center items-center p-2 text-zinc-100 cursor-pointer">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {isMobileSearchOpen && (
        <div className="md:hidden fixed inset-0 z-[999] bg-[#0A0D12] flex flex-col justify-between animate-in fade-in duration-200">
          <div className="w-full bg-zinc-900/40 backdrop-blur-md border-b border-zinc-900 px-4 py-4 flex items-center gap-3">
            <button onClick={() => { setIsMobileSearchOpen(false); setSearchQuery(''); }} className="text-zinc-400 hover:text-white p-1">
              <ArrowLeft className="w-6 h-6" />
            </button>
            
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-3 flex items-center text-[#717680]">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search Movie"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-lg pl-9 pr-9 py-2 text-sm text-zinc-200 placeholder-[#717680] focus:outline-none"
                autoFocus
              />
              
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-2.5 flex items-center justify-center"
                >
                  <div className="w-4 h-4 bg-[#414651] rounded-full flex items-center justify-center relative">
                    <X className="w-[13.3px] h-[13.3px] text-zinc-200 absolute" style={{ top: '1.33px', left: '1.33px' }} />
                  </div>
                </button>
              )}
            </div>
          </div>

          <div className="flex-1 bg-[#0A0D12] px-4 py-4 overflow-y-auto">
            <p className="text-[10px] text-zinc-600 uppercase tracking-widest text-center mt-10">
              {searchQuery ? 'Searching for movies...' : 'Type keywords above'}
            </p>
          </div>

          <div className="w-full bg-[#1A1A1A] border-t border-zinc-900 p-1.5 space-y-3 select-none pb-5">
            <div className="flex justify-center gap-1.5">
              {['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'].map((k) => (
                <button 
                  key={k} 
                  onClick={() => handleKeyClick(k)} 
                  className="flex-1 bg-[#444446] text-white text-[17px] py-2.5 rounded-md active:bg-zinc-600 shadow-sm font-normal text-center"
                >
                  {isShiftActive ? k.toUpperCase() : k.toLowerCase()}
                </button>
              ))}
            </div>

            <div className="flex justify-center gap-1.5 px-3">
              {['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'].map((k) => (
                <button 
                  key={k} 
                  onClick={() => handleKeyClick(k)} 
                  className="flex-1 bg-[#444446] text-white text-[17px] py-2.5 rounded-md active:bg-zinc-600 shadow-sm font-normal text-center"
                >
                  {isShiftActive ? k.toUpperCase() : k.toLowerCase()}
                </button>
              ))}
            </div>

            <div className="flex justify-center gap-1.5">
              <button 
                onClick={() => setIsShiftActive(!isShiftActive)} 
                className={`w-12 text-[17px] rounded-md flex items-center justify-center shadow-sm transition-colors ${
                  isShiftActive ? 'bg-white text-black' : 'bg-[#636366] text-white'
                }`}
              >
                ⇧
              </button>
              {['z', 'x', 'c', 'v', 'b', 'n', 'm'].map((k) => (
                <button 
                  key={k} 
                  onClick={() => handleKeyClick(k)} 
                  className="flex-1 bg-[#444446] text-white text-[17px] py-2.5 rounded-md active:bg-zinc-600 shadow-sm font-normal text-center"
                >
                  {isShiftActive ? k.toUpperCase() : k.toLowerCase()}
                </button>
              ))}
              <button onClick={() => setSearchQuery(searchQuery.slice(0, -1))} className="w-12 bg-[#636366] text-white text-lg rounded-md flex items-center justify-center active:bg-zinc-600 shadow-sm">⌫</button>
            </div>

            <div className="flex justify-center gap-1.5">
              <button className="w-20 bg-[#636366] text-white text-sm h-11 rounded-md flex items-center justify-center font-normal shadow-sm">123</button>
              <button onClick={() => setSearchQuery(searchQuery + ' ')} className="flex-1 bg-[#444446] text-white text-[16px] h-11 rounded-md flex items-center justify-center active:bg-zinc-600 shadow-sm">space</button>
              <button onClick={() => setIsMobileSearchOpen(false)} className="w-20 bg-[#636366] text-white text-sm h-11 rounded-md flex items-center justify-center font-normal shadow-sm active:bg-zinc-500">return</button>
            </div>

            <div className="w-full flex justify-between items-center px-6 pt-1">
              <button className="w-10 h-10 flex items-center justify-start text-zinc-300 text-2xl active:opacity-60 transition-opacity"><span>☺︎</span></button>
              <div className="w-36 h-1 bg-white/25 rounded-full" />
              <button className="w-10 h-10 flex items-center justify-end text-zinc-300 active:opacity-60 transition-opacity"><Mic className="w-[22px] h-[22px] stroke-[1.8]" /></button>
            </div>
          </div>
        </div>
      )}

      <div className={`fixed inset-0 bg-black/60 z-50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMenuOpen(false)} />
      <div className={`fixed top-0 right-0 h-full w-full bg-[#000000] z-50 transition-transform duration-300 transform md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="w-full h-[90px] px-6 flex items-center justify-between border-b border-zinc-900/50">
          <div className="flex items-center gap-1.5 h-7 select-none">
            <img src={MovieLogo} alt="Movie App Logo" className="w-[23.3px] h-[21.8px] object-contain" draggable="false" />
            <span className="font-semibold text-[19.91px] tracking-[-4%] text-[#FDFDFD] font-display leading-[24.89px]">Movie</span>
          </div>
          <button onClick={() => setIsMenuOpen(false)} className="w-10 h-10 flex items-center justify-center text-[#FDFDFD] hover:text-zinc-400 transition-colors cursor-pointer"><X className="w-6 h-6 stroke-[2]" /></button>
        </div>
        <nav className="mt-8 pl-6 flex flex-col gap-4 w-[89px]">
          <NavLink to="/" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `w-[89px] h-[46px] flex items-center justify-start text-base font-normal tracking-normal transition-colors ${isActive ? 'text-white font-semibold' : 'text-zinc-400 hover:text-white'}`}>Home</NavLink>
          <NavLink to="/favorites" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `w-[89px] h-[46px] flex items-center justify-start text-base font-normal tracking-normal transition-colors ${isActive ? 'text-white font-semibold' : 'text-zinc-400 hover:text-white'}`}>Favorites</NavLink>
        </nav>
      </div>
    </>
  );
}