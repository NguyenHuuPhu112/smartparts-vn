/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Brand Colors - Deep Blue
                brand: {
                    50: '#E6F0FF',
                    100: '#CCE0FF',
                    200: '#99C2FF',
                    300: '#66A3FF',
                    400: '#3385FF',
                    500: '#0066FF',
                    600: '#004AAD',  // Primary Deep Blue
                    700: '#003580',
                    800: '#002659',
                    900: '#001733',
                },
                // Accent Colors - Coral Orange
                accent: {
                    50: '#FFF3EF',
                    100: '#FFE6DF',
                    200: '#FFCCBF',
                    300: '#FFB39F',
                    400: '#FF997F',
                    500: '#FF6B35',  // Primary Coral Orange
                    600: '#E55A28',
                    700: '#CC4A1B',
                    800: '#B23A0E',
                    900: '#992A01',
                },
                // Background Colors
                'bg-primary': '#F8F9FA',
                'bg-card': '#FFFFFF',
                // Border Colors
                'border-light': '#E9ECEF',
                'border-medium': '#DEE2E6',
            },
            fontFamily: {
                sans: ['Be Vietnam Pro', 'Inter', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                'brand': '0 4px 12px rgba(0, 74, 173, 0.15)',
                'accent': '0 4px 12px rgba(255, 107, 53, 0.25)',
                'subtle': '0 1px 2px rgba(0, 0, 0, 0.04)',
                'soft': '0 2px 4px rgba(0, 0, 0, 0.06)',
            },
        },
    },
    plugins: [],
}
