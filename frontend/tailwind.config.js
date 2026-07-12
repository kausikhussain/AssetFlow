/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#121212',
        surface: '#1e1e1e',
        primary: '#4ade80', // Green accent matching wireframes
        secondary: '#3b82f6',
        text: '#f3f4f6',
        muted: '#9ca3af',
        border: '#374151',
        error: '#ef4444'
      }
    },
  },
  plugins: [],
}
