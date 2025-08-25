"use client"
import { User, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/context/cart-context";
import { useStore } from "@/lib/context/store-context";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCustomer } from "@/lib/context/customer-context";
import { Button } from "../ui/button";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const {customer} = useCustomer();
  const router = useRouter();
  const { cartItems } = useCart();
  const store = useStore();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`
      w-full h-16 px-6 flex items-center justify-between
      sticky top-0 z-50 transition-all duration-300
      ${isScrolled
        ? "bg-white/95 backdrop-blur-lg shadow-md border-b border-gray-100"
        : "bg-white/90 backdrop-blur-sm"}
    `}>
      {/* Logo/Brand */}
      <div className="flex items-center">
        {store.logo ? (
          <div className="relative h-10 w-32 cursor-pointer" onClick={() => router.push(`/${store.slug}`)}>
            <Image
              src={store.logo}
              alt={store.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 120px, 128px"
              priority
            />
          </div>
        ) : (
          <div 
            className="flex items-center px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100 cursor-pointer"
            onClick={() => router.push(`/${store.slug}`)}
          >
            <span className="text-sm font-bold text-gray-900">
              <span className="text-green-600">{store.name}</span>
            </span>
          </div>
        )}
      </div>

      {/* Search Bar - Desktop */}
      {/* <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div> */}
      <></>

      {/* Right side buttons */}
      <div className="flex items-center gap-3">
        {/* Search Button - Mobile */}
       <></>

        {/* Account Button */}
        <div>
          {customer ? (
            <button
              onClick={() => router.push(`/${store.slug}/customer-dashboard/account`)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              <User className="w-5 h-5 text-gray-600" />
              <span className="hidden sm:inline text-gray-700">Account</span>
            </button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => router.push(`/${store.slug}/signin`)}
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Login</span>
            </Button>
          )}
        </div>

        {/* Cart Button */}
        <button 
          onClick={() => router.push(`/${store.slug}/cart`)}
          className="relative p-2 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-green-200"
        >
          <ShoppingBag className="w-5 h-5 text-gray-700" />
          {cartItems.length > 0 && (
            <span className="
              absolute -top-1 -right-1 bg-green-600 text-white 
              text-xs w-5 h-5 flex items-center justify-center 
              rounded-full font-medium
            ">
              {cartItems.length}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}