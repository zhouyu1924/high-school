import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// @ts-ignore
import crypto from 'node:crypto'

// --- POLYFILL START ---
// Fix for "TypeError: crypto.getRandomValues is not a function" during build
// This ensures compatibility with Node.js versions that don't have global WebCrypto (e.g., < 19)
if (typeof globalThis.crypto === 'undefined') {
  // @ts-ignore
  globalThis.crypto = {};
}

if (typeof globalThis.crypto.getRandomValues === 'undefined') {
  // @ts-ignore
  globalThis.crypto.getRandomValues = (arr: any) => {
    // Use Node's native randomFillSync to emulate the browser API
    return crypto.randomFillSync(arr);
  };
}
// --- POLYFILL END ---

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})