"use client";
import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { handleContactClick } from "@/lib/utils";

export default function FloatingWhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setIsMounted(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute -top-2 -right-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-1 z-10 shadow-md transition-transform duration-200 hover:scale-110 active:scale-90"
        >
          <X className="w-3 h-3" />
        </button>

        {/* WhatsApp Button */}
        <button
          onClick={handleContactClick}
          onMouseEnter={() => {
            setIsHovered(true);
            setIsPulsing(false);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            setIsPulsing(true);
          }}
          className={`
            bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full p-4 h-16 w-16 shadow-lg 
            transition-all duration-300 flex items-center justify-center relative overflow-hidden
            ${isMounted ? 'animate-spring-in' : 'opacity-0 scale-50'}
            hover:scale-105 active:scale-95
          `}
          style={{ transform: isHovered ? 'rotate(5deg)' : '' }}
        >
          {/* Shine effect on hover */}
          {isHovered && (
            <div className="absolute inset-0 bg-white opacity-20 animate-shine" />
          )}
          
          {/* WhatsApp Icon */}
          <MessageCircle className="w-8 h-8" fill="currentColor" />
        </button>

        {/* Conditional pulse animation */}
        {isPulsing && (
          <div className="absolute inset-0 rounded-full bg-[#25D366] -z-10 animate-pulse-slow" />
        )}

        {/* Enhanced Tooltip */}
        {isHovered && (
          <div className="absolute right-20 bottom-2 bg-white text-gray-800 px-4 py-3 rounded-xl shadow-lg whitespace-nowrap border border-green-100 animate-fade-in-right">
            <div className="font-medium text-sm">Need help?</div>
            <div className="text-xs text-gray-600">Chat with us on WhatsApp!</div>
            
            {/* Tooltip arrow */}
            <div className="absolute right-[-6px] top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rotate-45 border-r border-b border-green-100"></div>
          </div>
        )}
      </div>
    </div>
  );
}