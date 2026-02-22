/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Primary palette — deep navy + electric blue
                navy: {
                    950: '#020817',
                    900: '#0a0f1e',
                    800: '#0d1528',
                    700: '#111d35',
                    600: '#172141',
                },
                primary: {
                    light: '#93c5fd',
                    DEFAULT: '#3b82f6',
                    dark: '#1d4ed8',
                    glow: '#60a5fa',
                },
                accent: {
                    DEFAULT: '#818cf8',   // soft indigo
                    pink: '#f472b6',      // heart pink
                    cyan: '#22d3ee',      // cyan highlight
                    gold: '#fbbf24',      // gold tier
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
