// postcss.config.js
export default {
  plugins: {
    "@tailwindcss/postcss": {}, // ✅ correct new Tailwind v4 plugin
    autoprefixer: {},
  },
};
