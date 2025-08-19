"use client"
import { Search, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/context/cart-context";
import { useStore } from "@/lib/context/store-context";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function Header({ logo }: { logo?: string }) {
  const [isScrolled, setIsScrolled] = useState(false);
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
      w-full h-16 px-4 py-4 flex items-center justify-between shadow
      sticky top-0 z-50 transition-all duration-300
      ${isScrolled
        ? "bg-white/50 backdrop-blur-md shadow-sm border-b border-gray-100"
        : "bg-white"}
    `}>
      {
        logo ?
          <div className="relative h-full w-auto aspect-square">
            <Image
              src={logo}
              alt={store.name}
              fill
              className="object-contain p-2"
              sizes="(max-width: 768px) 50px, 64px"
            />
          </div>
          :
          <div className="flex items-center text-center justify-center px-4 py-2 bg-green-100 rounded-4xl max-w-40">
            <span className=" text-sm font-extrabold tracking-tight text-black">
              <span className="text-green-700">{store.name}</span></span>
          </div>
      }

      <div className="flex items-center justify-end gap-4">
        <button className="
          p-2 rounded-full hover:bg-gray-100 transition-colors
          focus:outline-none focus:ring-2 focus:ring-gray-300
        ">
          <Search className="w-5 h-5 text-gray-700" />
        </button>

        <button onClick={() => {
          router.push(`/${store.slug}/cart`)
        }} className="
          p-2 rounded-full hover:bg-gray-100 transition-colors
          focus:outline-none focus:ring-2 focus:ring-gray-300
          relative
        ">
          <ShoppingBag className="w-5 h-5 text-gray-700" />
          {cartItems.length > 0 ? <span className="
            absolute -top-1 -right-1 bg-green-600 text-white 
            text-xs w-5 h-5 flex items-center justify-center 
            rounded-full
          ">
            {cartItems.length}
          </span> : <></>}
        </button>
      </div>
    </nav>
  );
}