/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fp-bg': '#0a0b0f',
        'fp-surface': '#12131a',
        'fp-surface-hover': '#1a1b24',
        'fp-border': '#2a2b35',
        'fp-accent': '#00d4aa',
        'fp-accent-hover': '#00f0c0',
        'fp-accent-dim': 'rgba(0, 212, 170, 0.1)',
        'fp-text': '#e4e4e7',
        'fp-text-dim': '#71717a',
        'fp-success': '#22c55e',
        'fp-warning': '#f59e0b',
        'fp-danger': '#ef4444',
      },
      fontFamily: {
        'display': ['Nabla', 'cursive'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
