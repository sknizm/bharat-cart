import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function copyToClipBoard(text: string) {
  navigator.clipboard.writeText(text);
}

export function formatIndianCurrency(amount: number | string): string {
  const num = Number(amount);
  if (isNaN(num)) return String(amount);
  return num.toLocaleString("en-IN");
}