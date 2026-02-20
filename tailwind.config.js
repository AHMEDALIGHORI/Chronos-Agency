/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'chronos-dark': '#050510',
                'chronos-navy': '#0a1628',
                'chronos-blue': '#0a0a20',
                'chronos-gold': '#c9a84c',
                'chronos-gold-light': '#f5d98a',
                'chronos-amber': '#f59e0b',
                'chronos-cream': '#fef3c7',
                'chronos-cyan': '#22d3ee',
                'chronos-cyan-bright': '#00f0ff',
                'chronos-purple': '#a78bfa',
                'chronos-purple-deep': '#6d28d9',
                'chronos-rose': '#fb7185',
                'chronos-emerald': '#10b981',
                'chronos-slate': '#1e293b',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'Georgia', 'serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'spin-slow': 'spin 20s linear infinite',
                'gradient-shift': 'gradient-shift 8s ease infinite',
                'fade-up': 'fade-up 1s ease-out forwards',
                'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
            },
            keyframes: {
                'float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'gradient-shift': {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                'fade-up': {
                    'from': { opacity: '0', transform: 'translateY(30px)' },
                    'to': { opacity: '1', transform: 'translateY(0)' },
                },
                'glow-pulse': {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(201, 168, 76, 0.3)' },
                    '50%': { boxShadow: '0 0 40px rgba(201, 168, 76, 0.6)' },
                },
            },
        },
    },
    plugins: [],
}
