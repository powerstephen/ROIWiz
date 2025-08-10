/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        tilla: {
          primary: '#0B00CF',   // brand blue
          accent:  '#0B00CF',   // align accent to brand for consistency
          ink:     '#0B1221'
        }
      },
      fontFamily: { sans: ['Inter','system-ui','Arial','sans-serif'] },
      boxShadow: { soft: '0 10px 25px rgba(0,0,0,0.06)' }
    }
  },
  plugins: []
}
