/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
     'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: ["Lato", 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui'),
    require('flowbite/plugin'),
    function ({ addUtilities }) {
      const newUtilities = {
        '.word-spacing-tight': {
          'word-spacing': '-0.05em',
        },
        '.word-spacing-normal': {
          'word-spacing': '0em',
        },
        '.word-spacing-wide': {
          'word-spacing': '0.1em',
        },
        '.word-spacing-wider': {
          'word-spacing': '0.25em',
        },
        '.word-spacing-widest': {
          'word-spacing': '0.5em',
        },
        '.word-spacing-custom': {
          'word-spacing': '0.15em', // Custom word spacing
        },
        '.word-spacing-35': {
          'word-spacing': '35px', // Example custom word spacing
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}

