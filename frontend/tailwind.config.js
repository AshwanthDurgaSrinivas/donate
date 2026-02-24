/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Primary palette — deep black/red + crimson
                navy: {
                    950: '#000000',      // Deepest Black
                    900: '#110000',      // Very Dark Red
                    800: '#1a0000',      // Darker Red
                    700: '#2a0000',      // Dark Red
                    600: '#400000',      // Red tint
                },
                primary: {
                    light: '#ff6666',
                    DEFAULT: '#d32f2f',  // Crimson Red
                    dark: '#b71c1c',     // Dark Crimson
                    glow: '#ff4d4d',
                },
                accent: {
                    DEFAULT: '#ef5350',   // Lighter red
                    pink: '#ff1744',      // Bright red-pink
                    cyan: '#ff8a80',      // Reddish-cyan alternative
                    gold: '#fbbf24',      // gold tier (can stay for contrast)
                },
                glass: {
                    white: 'rgba(255,255,255,0.06)',
                    border: 'rgba(255,255,255,0.10)',
                    hover: 'rgba(255,255,255,0.12)',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Inter', 'system-ui', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                'glow-blue': '0 0 40px rgba(59, 130, 246, 0.4)',
                'glow-indigo': '0 0 40px rgba(129, 140, 248, 0.3)',
                'card': '0 4px 24px rgba(0,0,0,0.4)',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'float-slow': 'float 9s ease-in-out infinite',
                'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
                'shimmer': 'shimmer 2s infinite',
                'slide-up': 'slideUp 0.6s ease-out',
                'ticker': 'ticker 30s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(59,130,246,0.4)' },
                    '50%': { boxShadow: '0 0 60px rgba(59,130,246,0.8)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                ticker: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
            },
        },
    },
    plugins: [],
}
