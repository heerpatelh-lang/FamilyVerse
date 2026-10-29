/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0B0E1E',
          DEFAULT: '#10152B', // Midnight navy
          light: '#181F3D',
        },
        indigo: {
          deep: '#20265B',   // Deep indigo
          card: '#1A1F4A',
          border: '#2C3473',
        },
        violet: {
          electric: '#7957FF', // Electric violet
          glow: 'rgba(121, 87, 255, 0.35)',
        },
        cyan: {
          vibrant: '#39D5FF', // Vibrant cyan
          glow: 'rgba(57, 213, 255, 0.35)',
        },
        gold: {
          warm: '#FFC857',    // Warm gold
        },
        coral: {
          DEFAULT: '#FF786E', // Coral
        },
        lavender: {
          soft: '#EEEAFE',    // Soft lavender
        },
        muted: '#AAB3D0',     // Muted text
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-violet': '0 0 25px rgba(121, 87, 255, 0.4)',
        'glow-cyan': '0 0 25px rgba(57, 213, 255, 0.4)',
        'glow-gold': '0 0 25px rgba(255, 200, 87, 0.35)',
        'card-elevated': '0 10px 30px -5px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.08)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse at 50% -20%, #20265B 0%, #10152B 70%)',
        'subtle-pattern': 'radial-gradient(circle at 50% 50%, rgba(121, 87, 255, 0.05) 0%, transparent 60%)',
      }
    },
  },
  plugins: [],
}

