"use client"
import { Search, ShoppingBag } from "lucide-react";
import Logo from "../ui/logo";
import { useEffect, useState } from "react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`
      w-full h-16 px-4 py-4 flex items-center justify-between shadow
      sticky top-0 z-50 transition-all duration-300
      ${isScrolled 
        ? "bg-white/50 backdrop-blur-md shadow-sm border-b border-gray-100" 
        : "bg-white"}
    `}>
      <Logo/>
      
      <div className="flex items-center justify-end gap-4">
        <button className="
          p-2 rounded-full hover:bg-gray-100 transition-colors
          focus:outline-none focus:ring-2 focus:ring-gray-300
        ">
          <Search className="w-5 h-5 text-gray-700" />
        </button>
        
        <button className="
          p-2 rounded-full hover:bg-gray-100 transition-colors
          focus:outline-none focus:ring-2 focus:ring-gray-300
          relative
        ">
          <ShoppingBag className="w-5 h-5 text-gray-700" />
          <span className="
            absolute -top-1 -right-1 bg-indigo-600 text-white 
            text-xs w-5 h-5 flex items-center justify-center 
            rounded-full
          ">
            3
          </span>
        </button>
      </div>
    </nav>
  );
}