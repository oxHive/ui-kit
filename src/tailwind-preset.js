// ui-kit/src/tailwind-preset.js
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--hm-font-sans)'],
        mono: ['var(--hm-font-mono)'],
      },
      colors: {
        'hm-personal': 'var(--hm-personal)',
        'hm-workspace': 'var(--hm-workspace)',
        'hm-org': 'var(--hm-org)',
        'hm-warning': 'var(--hm-warning)',
        'hm-danger': 'var(--hm-danger)',
        'hm-accent': 'var(--hm-accent)',
      },
    },
  },
}
