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