// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        amber: {
          50: '#FEFCE8',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        gray: {
          50: '#FAFAF8',
          100: '#F5F5F0',
          200: '#E5E5E0',
          300: '#D4D4CF',
          400: '#A3A39E',
          500: '#737370',
          600: '#525250',
          700: '#3F3F3D',
          800: '#27272A',
          900: '#1C1C1E',
          950: '#0F0F10',
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        'site': '1200px',
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.4' },
          '50%':      { opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'fade-up':    'fade-up 0.6s ease-out forwards',
        'fade-in':    'fade-in 0.4s ease-out forwards',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'float':      'float 3s ease-in-out infinite',
      },
      boxShadow: {
        'amber-glow': '0 0 60px rgba(245, 158, 11, 0.13), 0 0 120px rgba(245, 158, 11, 0.07)',
      },
      typography: ({ theme }) => ({
        skilly: {
          css: {
            '--tw-prose-body': theme('colors.gray.700'),
            '--tw-prose-headings': theme('colors.gray.900'),
            '--tw-prose-lead': theme('colors.gray.600'),
            '--tw-prose-links': theme('colors.amber.700'),
            '--tw-prose-bold': theme('colors.gray.900'),
            '--tw-prose-counters': theme('colors.gray.500'),
            '--tw-prose-bullets': theme('colors.gray.300'),
            '--tw-prose-hr': theme('colors.gray.200'),
            '--tw-prose-quotes': theme('colors.gray.700'),
            '--tw-prose-quote-borders': theme('colors.amber.300'),
            '--tw-prose-captions': theme('colors.gray.500'),
            '--tw-prose-code': theme('colors.amber.800'),
            '--tw-prose-pre-code': theme('colors.gray.100'),
            '--tw-prose-pre-bg': theme('colors.gray.900'),
            '--tw-prose-th-borders': theme('colors.gray.300'),
            '--tw-prose-td-borders': theme('colors.gray.200'),
            fontFamily: theme('fontFamily.sans').join(', '),
            fontSize: '17px',
            lineHeight: '1.7',
            'h1, h2, h3, h4': {
              fontFamily: theme('fontFamily.sans').join(', '),
              letterSpacing: '-0.01em',
            },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            code: {
              backgroundColor: theme('colors.gray.100'),
              padding: '0.15em 0.4em',
              borderRadius: '0.3em',
              fontWeight: '500',
              fontSize: '0.92em',
            },
            'a:hover': { textDecoration: 'underline' },
            blockquote: {
              fontStyle: 'normal',
              fontWeight: '500',
              borderLeftWidth: '3px',
              padding: '0.25em 1em',
              backgroundColor: theme('colors.amber.50'),
            },
            table: { fontSize: '15px' },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
