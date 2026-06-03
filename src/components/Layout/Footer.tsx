import { Tv } from 'lucide-react'; 

export default function Footer() {
  return (
    <footer className="w-full max-w-[1440px] h-[120px] mx-auto bg-[#000000] border-t border-[#252B37] px-5 md:px-12 lg:px-[140px] flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-0 py-5 md:py-0 select-none">
      <div className="flex items-center gap-[7.11px] h-10 shrink-0">
        <Tv className="w-[33.3px] h-[31.1px] text-[#FDFDFD]" />
        <span className="font-semibold text-[28.44px] tracking-[-4%] text-[#FDFDFD] font-display leading-[35.56px]">
          Movie
        </span>
      </div>      
      <p className="font-normal text-xs md:text-sm text-[#535862] font-body text-left md:text-right tracking-normal normal-case">
        Copyright ©{new Date().getFullYear()} Movie Explorer
      </p>

    </footer>
  );
}