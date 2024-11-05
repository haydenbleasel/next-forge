const typographyConfig = (theme: (path: string) => string) => ({
  DEFAULT: {
    css: {
      ':first-child': {
        marginTop: theme('margin.0'),
      },
      'h1, h2, h3, h4, h5, h6': {
        fontWeight: theme('fontWeight.semibold'),
        letterSpacing: theme('letterSpacing.tight'),
        marginBottom: theme('margin.4'),

        '+ h1, + h2, + h3, + h4, + h5, + h6': {
          marginTop: theme('margin.0'),
        },
      },
      h1: {
        fontSize: theme('fontSize.3xl'),
        marginTop: theme('margin.16'),
      },
      h2: {
        fontSize: theme('fontSize.2xl'),
      },
      h3: {
        fontSize: theme('fontSize.xl'),
      },
      h4: {
        fontSize: theme('fontSize.lg'),
      },
      h5: {
        fontSize: theme('fontSize.base'),
      },
      h6: {
        fontSize: theme('fontSize.base'),
      },
      table: {
        boxShadow: `0 0 0 1px ${theme('colors.gray.200')}`,
        borderRadius: theme('borderRadius.md'),
        overflow: 'hidden',
        p: {
          margin: 0,
        },
        th: {
          paddingTop: '0.5714286em',
          paddingRight: '0.5714286em',
          paddingBottom: '0.5714286em',
          paddingLeft: '0.5714286em',
          backgroundColor: theme('colors.gray.100'),
          '&:not(:last-child)': {
            borderRightWidth: '1px',
            borderRightColor: theme('colors.gray.200'),
          },
        },
        'tbody td, tfoot td': {
          paddingLeft: '0.5714286em',
          '&:not(:last-child)': {
            borderRightWidth: '1px',
            borderRightColor: theme('colors.gray.200'),
          },
        },
      },
      code: {
        '&::before, &::after': {
          display: 'none',
        },
      },
      pre: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: theme('colors.gray.200'),
      },
    },
  },
  invert: {
    css: {
      table: {
        boxShadow: `0 0 0 1px ${theme('colors.gray.700')}`,
        th: {
          backgroundColor: theme('colors.gray.800'),
          '&:not(:last-child)': {
            borderRightColor: theme('colors.gray.700'),
          },
        },
        'tbody td, tfoot td': {
          '&:not(:last-child)': {
            borderRightColor: theme('colors.gray.700'),
          },
        },
      },
      pre: {
        borderColor: theme('colors.gray.800'),
      },
    },
  },
});

export default typographyConfig;
