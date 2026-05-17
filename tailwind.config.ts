import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D4A437',
          hover: '#BD8E2A',
        },
        carbon: '#0F1419',
        success: '#2D7A4F',
        danger: '#C8362B',
        terracotta: {
          DEFAULT: '#B85A3C',
          soft: '#D77B5C',
        },
        amarillo: {
          DEFAULT: '#F2C230',
          soft: '#F7D560',
        },
        naranja: {
          DEFAULT: '#E8722C',
          soft: '#F2924F',
        },
        cream: {
          DEFAULT: '#F5EEDF',
          soft: '#FAF5EA',
          deep: '#EBE0C9',
        },
        neutral: {
          50: '#FAFAF7',
          100: '#F2EFE8',
          200: '#E8E5DE',
          300: '#D6D3CC',
          400: '#A8A29E',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#1F1B16',
          900: '#0F1419',
        },
      },
      fontFamily: {
        sport: ['var(--font-display-sport)', 'sans-serif'],
        display: ['var(--font-display)', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        bufon: ['var(--font-bufon)', 'ui-rounded', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-2xl': ['72px', { lineHeight: '1.0', fontWeight: '800' }],
        'display-xl': ['60px', { lineHeight: '1.05', fontWeight: '800' }],
        'display-lg': ['48px', { lineHeight: '1.1', fontWeight: '700' }],
        'caption': ['12px', { lineHeight: '1.4', fontWeight: '500' }],
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
      },
      boxShadow: {
        sm: '0 1px 2px rgb(0 0 0 / 0.05)',
        md: '0 4px 12px rgb(0 0 0 / 0.08)',
        lg: '0 12px 32px rgb(0 0 0 / 0.12)',
        gold: '0 8px 24px rgb(212 164 55 / 0.25)',
      },
      transitionTimingFunction: {
        managers: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
