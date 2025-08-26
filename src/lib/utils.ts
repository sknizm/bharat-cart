import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function copyToClipBoard(text: string) {
  navigator.clipboard.writeText(text);
}

export async function shareText(text: string) {
  if (navigator.share) {
    try {
      await navigator.share({
        text,
      })
      console.log("Shared successfully")
    } catch (err) {
      console.error("Error sharing:", err)
    }
  } else {
    console.warn("Web Share API not supported in this browser")
  }
}

export function formatIndianCurrency(amount: number | string): string {
  const num = Number(amount);
  if (isNaN(num)) return String(amount);
  return num.toLocaleString("en-IN");
}

export function handleContactClick() {
  const phoneNumber = "8455838503"; // Replace with your number
  const message = encodeURIComponent("Hello, Can I get more info about MenuLink?");
  const url = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(url, "_blank");
}