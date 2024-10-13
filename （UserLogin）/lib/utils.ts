/*
 * @Author: Zane
 * @Date: 2024-02-16 09:45:43
 * @Description: 
 * @LastEditors: Zane zanekwok73@gmail.com
 * @LastEditTime: 2024-02-16 09:45:56
 */
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


