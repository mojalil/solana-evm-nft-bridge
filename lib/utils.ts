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
export const getSolanaTokenAddresses = ( data: SolanaToken[]) => {
  const solanaTokenAddresses = data.map((token) => {
    return token.identifier
  })
  return solanaTokenAddresses
}

// Check if tokens are in the list of solana tokens
export const checkIfSolanaToken = async( token: string, solanaTokenAddresses: string[]) => {
  return solanaTokenAddresses.includes(token)
}

// Check if an array of tokens are in the list of solana tokens
export const checkIfSolanaTokens = ( tokens: string[], solanaTokenAddresses: string[]) => {
  return tokens.filter(token => solanaTokenAddresses.includes(token))
}

export const fetcher = (url: string) => fetch(url).then((res) => res.json());
