/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#2E7D32',
                secondary: '#C8E6C9',
                accent: '#1B5E20',
            },
        },
    },
    plugins: [],
}
