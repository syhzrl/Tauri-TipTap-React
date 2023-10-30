/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                // green
                // text: '#edf8f5',
                // background: '#030706',
                // primary: '#5dc0a4',
                // secondary: '#0b1d18',
                // accent: '#45b092',

                text: '#eaf2fa',
                background: '#020508',
                primary: '#6a9fdc',
                secondary: '#0a1829',
                accent: '#307acf',
            },
        },
        fontFamily: {
            bold: ['Inter-Bold'],
        },
    },
    plugins: [],
};
