import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// function to check if viewport is mobile
export function isMobile() {
  return window.innerWidth < 768
}


// Create an interface for the data
type SolanaToken = {
  identifier: string,
  collection: string,
  contract: string,
  token_standard: string,
  name: string,
  description: string,
  image_url: string,
  metadata_url: string,
  created_at: string,
  updated_at: string,
  is_disabled: boolean,
  is_nsfw: boolean
}

// Get solana tokens list from json data
export const getSolanaTokenAddresses = async( data: SolanaToken[]) => {
  const solanaTokenAddresses = data.map((token) => {
    return token.contract
  })
  return solanaTokenAddresses
}

