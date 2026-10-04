// ui-kit/src/tailwind-preset.js
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--oxui-font-sans)'],
        mono: ['var(--oxui-font-mono)'],
      },
      colors: {
        'oxui-personal': 'var(--oxui-personal)',
        'oxui-workspace': 'var(--oxui-workspace)',
        'oxui-org': 'var(--oxui-org)',
        'oxui-warning': 'var(--oxui-warning)',
        'oxui-danger': 'var(--oxui-danger)',
        'oxui-accent': 'var(--oxui-accent)',
      },
    },
  },
}
