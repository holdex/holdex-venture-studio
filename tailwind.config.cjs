const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,svelte,ts,sass,scss,pug}'],
  theme: {
    borderRadius: {
      ...defaultTheme.borderRadius,
      'base-radius': '20px'
    },
    screens: {
      xl: {
        min: '1680px',
        limit: '1920px'
      },
      lg: {
        min: '1440px',
        max: '1679px'
      },
      md: {
        min: '1200px',
        max: '1439px'
      },
      tb: {
        min: '992px',
        max: '1199px'
      },
      sm: {
        min: '768px',
        max: '991px'
      },
      xs: {
        min: '320px',
        max: '767px'
      },
      xxs: {
        min: '320px',
        max: '374px'
      },
      mobile: {
        min: '320px',
        max: '479px'
      },
      tbDown: {
        raw: '(max-width: 1199px)'
      },
      smDown: {
        raw: '(max-width: 991px)'
      }
    },
    colors: {
      l1: 'rgb(var(--l1) / <alpha-value>)',
      l2: 'rgb(var(--l2) / <alpha-value>)',
      l3: 'rgb(var(--l3) / <alpha-value>)',
      l4: 'rgb(var(--l4) / <alpha-value>)',
      l5: 'rgb(var(--l5) / <alpha-value>)',
      l6: 'rgb(var(--l6) / <alpha-value>)',
      t1: 'rgb(var(--t1) / <alpha-value>)',
      t2: 'rgb(var(--t2) / <alpha-value>)',
      t3: 'rgb(var(--t3) / <alpha-value>)',
      t4: 'rgb(var(--t4) / <alpha-value>)',

      'accent1-default': 'rgb(var(--accent1-default) / <alpha-value>)',
      'accent1-active': 'rgb(var(--accent1-active) / <alpha-value>)',
      'accent2-default': 'rgb(var(--accent2-default) / <alpha-value>)',
      'accent2-active': 'rgb(var(--accent2-active) / <alpha-value>)',
      'accent3-default': 'rgb(var(--accent3-default) / <alpha-value>)',
      'accent3-active': 'rgb(var(--accent3-active) / <alpha-value>)',

      'rating-a': 'rgb(var(--rating-a) / <alpha-value>)',
      'rating-b': 'rgb(var(--rating-b) / <alpha-value>)',
      'rating-c': 'rgb(var(--rating-c) / <alpha-value>)'
    },
    fontSize: {
      "title-l": [
        '56px',
        {
          lineHeight: '64px',
          fontWeight: '900'
        }
      ],
      "title-s": [
        '48px',
        {
          lineHeight: '48px',
          fontWeight: '900'
        }
      ],
      "subtitle-l": [
        '20px',
        {
          lineHeight: '32px',
          fontWeight: '500'
        }
      ],
      "subtitle-s": [
        '18px',
        {
          lineHeight: '32px',
          fontWeight: '500'
        }
      ],
      "h1-l": [
        '48px',
        {
          lineHeight: '64px',
          fontWeight: '900'
        }
      ],
      "h1-s": [
        '42px',
        {
          lineHeight: '48px',
          fontWeight: '900'
        }
      ],
      "h2-l": [
        '32px',
        {
          lineHeight: '32px',
          fontWeight: '900'
        }
      ],
      "h2-s": [
        '28px',
        {
          lineHeight: '32px',
          fontWeight: '900'
        }
      ],
      "h3-l": [
        '28px',
        {
          lineHeight: '32px',
          fontWeight: '900'
        }
      ],
      "h3-s": [
        '24px',
        {
          lineHeight: '32px',
          fontWeight: '900'
        }
      ],
      "h4-l": [
        '24px',
        {
          lineHeight: '32px',
          fontWeight: '900'
        }
      ],
      "h4-s": [
        '20px',
        {
          lineHeight: '32px',
          fontWeight: '900'
        }
      ],
      "h5-l": [
        '20px',
        {
          lineHeight: '32px',
          fontWeight: '900'
        }
      ],
      "h5-s": [
        '18px',
        {
          lineHeight: '32px',
          fontWeight: '900'
        }
      ],
      "h6-l": [
        '18px',
        {
          lineHeight: '32px',
          fontWeight: '900'
        }
      ],
      "h6-s": [
        '16px',
        {
          lineHeight: '16px',
          fontWeight: '900'
        }
      ],
      "paragraph-l": [
        '18px',
        {
          lineHeight: '32px',
          fontWeight: '500'
        }
      ],
      "paragraph-s": [
        '16px',
        {
          lineHeight: '32px',
          fontWeight: '500'
        }
      ],
      "cta": [
        '14px',
        {
          lineHeight: '32px',
          fontWeight: '700'
        }
      ],
      "footnote": [
        '14px',
        {
          lineHeight: '20px',
          fontWeight: '500'
        }
      ],
      "caption": [
        '12px',
        {
          lineHeight: '16px',
          fontWeight: '500'
        }
      ],
      "code": [
        '14px',
        {
          lineHeight: '32px',
          fontWeight: '600'
        }
      ],
    },
    fontFamily: {
      'inter': ['"Inter"'],
      'satoshi': ['"Satoshi"'],
      'mono': ['"JetBrains Mono"']
    },
    extend: {
      spacing: {
        '5.5': '1.375rem'
      },
      fontFamily: {
        'sans': ['Inter', ...defaultTheme.fontFamily.sans]
      },
      zIndex: {
        1: '1'
      }
    }
  },
  plugins: []
}
