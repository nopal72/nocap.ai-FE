import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function storeToLocalStorage<T>(key: string, value: T) {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

export function getFromLocalStorage<T>(key: string): T | null {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(key)
    return item ? (JSON.parse(item) as T) : null
  }
  return null
}

export function removeFromLocalStorage(key: string) {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key)
  }
}

export function clearLocalStorage() {
  if (typeof window !== "undefined") {
    localStorage.clear()
  }
}
