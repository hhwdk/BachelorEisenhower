/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}',
        './app.vue',
    ],
    important: true,
    theme: {
        extend: {
            colors: {
                orange: '#E9620A',
                grey: '#868686',
                lightgrey: '#F3F3F3',
                lightblack: '#34312F',
                themeBackground: 'var(--background)',
                themeText: 'var(--text)',
            },
            fontFamily: {
                sans: ['Poppins', 'sans-serif'],
                main: ['Inter', 'sans-serif'],
            },
        },
    },
};
