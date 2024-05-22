import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
	return twMerge(clsx(inputs))
}

export const sleep = (delay = 1000) =>
	new Promise(resolve => setTimeout(resolve, delay))
