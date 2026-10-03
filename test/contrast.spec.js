import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

// Guards WCAG AA (4.5:1) for the token pairs components actually render as
// readable text, in both themes. Light inherits any token it doesn't redefine.
const css = readFileSync(resolve(__dirname, '../src/tokens.css'), 'utf8')

function block(selector) {
  const start = css.indexOf(`${selector} {`)
  const body = css.slice(start, css.indexOf('}', start))
  return Object.fromEntries(
    [...body.matchAll(/--oxui-([\w-]+):\s*(#[0-9a-f]{6});/gi)].map((m) => m.slice(1)),
  )
}

const dark = block(':root')
const themes = { dark, light: { ...dark, ...block(":root[data-theme='light']") } }

function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

const PAIRS = [
  ['text-secondary', 'bg-base'],
  ['text-secondary', 'bg-elevated'],
  ['text-tertiary', 'bg-base'],
  ['text-tertiary', 'bg-surface'],
  // SegmentedControl's idle options and the neutral Badge sit on elevated.
  ['text-tertiary', 'bg-elevated'],
  ['danger-text', 'danger-bg'],
  // CopyButton's copied state on default/ghost buttons.
  ['success-text', 'bg-base'],
  ['success-text', 'bg-elevated'],
]

describe('token contrast', () => {
  for (const [name, tokens] of Object.entries(themes)) {
    for (const [fg, bg] of PAIRS) {
      it(`${name}: ${fg} on ${bg} meets 4.5:1`, () => {
        expect(contrast(tokens[fg], tokens[bg])).toBeGreaterThanOrEqual(4.5)
      })
    }
  }
})
