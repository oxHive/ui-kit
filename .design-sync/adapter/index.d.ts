import type * as React from 'react'

/** Shared by every component: native attributes fall through to the root element. */
interface Common {
  className?: string
  style?: React.CSSProperties
  id?: string
  title?: string
  'aria-label'?: string
}

export type ButtonVariant = 'primary' | 'default' | 'danger' | 'ghost'

export interface ButtonProps extends Common {
  /** Visual weight. Use `primary` once per view and `danger` for destructive actions. Default `'default'`. */
  variant?: ButtonVariant
  /** `sm` is 28px tall and set in the mono face; `md` is 32px. Default `'md'`. */
  size?: 'sm' | 'md'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  onClick?: (event: MouseEvent) => void
  /** Label text and/or an icon; children sit 6px apart. */
  children?: React.ReactNode
}
/** The base action button. Every other clickable in the kit is built on it. */
export declare function Button(props: ButtonProps): JSX.Element

export interface CopyButtonProps extends Common {
  /** What to copy, or a function read at click time. */
  text: string | (() => string)
  /** Resting label. Default `'Copy'`. */
  label?: string
  /** Shown for 1.5s after a successful copy. Default `'Copied'`. */
  copiedLabel?: string
  /** Default `'default'`. On `default`/`ghost` the copied state turns teal. */
  variant?: ButtonVariant
  /** Default `'sm'`. */
  size?: 'sm' | 'md'
  /** Fires after the clipboard write succeeds. */
  onCopied?: (text: string) => void
  /** Fires when both the Clipboard API and the fallback fail. */
  onError?: (error: Error) => void
  /** Replaces the label, e.g. an icon. A function receives `{ copied }`. */
  children?: React.ReactNode | ((scope: { copied: boolean }) => React.ReactNode)
}
/** Copies text and confirms in place for 1.5s. Works over plain http too. */
export declare function CopyButton(props: CopyButtonProps): JSX.Element

export interface MenuProps extends Common {
  /** Menu entries; the chosen one is passed to `onSelect` as-is. */
  items: string[]
  /** Opens below or above the trigger, aligned to its right edge. Default `'bottom'`. */
  placement?: 'bottom' | 'top'
  /** Trigger button variant. Default `'ghost'`. */
  variant?: ButtonVariant
  /** Trigger button size. Default `'sm'`. */
  size?: 'sm' | 'md'
  onSelect?: (item: string) => void
  /** The trigger button's content, e.g. an icon plus a word. */
  trigger?: React.ReactNode
}
/** A trigger button that opens a short list of string choices, with full keyboard support. */
export declare function Menu(props: MenuProps): JSX.Element

export interface InputProps extends Common {
  value?: string | number
  /** Called with the new string on every keystroke. */
  onChange?: (value: string) => void
  placeholder?: string
  type?: string
  disabled?: boolean
  name?: string
  autoFocus?: boolean
  /** Exposes `focus()`, `blur()` and `select()`. */
  ref?: React.Ref<{ focus(): void; blur(): void; select(): void }>
}
/** Single-line text field on the elevated surface; accent border on focus. Fills its container's width. */
export declare function Input(props: InputProps): JSX.Element

export interface SegmentedOption {
  label: string
  value: string | number | boolean
  /** Shown as a tooltip on hover/focus and exposed to screen readers. */
  description?: string
}
export interface SegmentedControlProps extends Common {
  options: SegmentedOption[]
  /** The selected option's value. */
  value?: string | number | boolean | null
  onChange?: (value: string | number | boolean) => void
  /** Shows the value but blocks changes. */
  disabled?: boolean
}
/** Compact radio group for switching views or filters; arrow keys move the selection. Always set `aria-label`. */
export declare function SegmentedControl(props: SegmentedControlProps): JSX.Element

export interface BadgeProps extends Common {
  label?: string
  /**
   * Any CSS color: hex, rgb()/hsl(), `var(--oxui-*)` or a named color. Tints
   * the background at 18% and colors the text. Omit for neutral. Scope hues
   * carry meaning: `var(--oxui-personal)`, `var(--oxui-workspace)`, `var(--oxui-org)`.
   */
  color?: string
}
/** Small mono label for scope, status or counts. */
export declare function Badge(props: BadgeProps): JSX.Element

export interface EmptyStateProps extends Common {
  message?: string
  /** Optional second line, usually the next action. */
  hint?: string
  /** Mark above the text. */
  icon?: React.ReactNode
}
/** What a list shows when it has nothing in it. Fills its container's height and centers. */
export declare function EmptyState(props: EmptyStateProps): JSX.Element

/** Shimmering list-row placeholder (title, body, meta bars). Stack several while loading. */
export declare function SkeletonCard(props: Common): JSX.Element

export interface ModalProps extends Common {
  title?: string
  /** Message text; replaced by `children`. */
  body?: string
  confirmLabel?: string
  /** Danger confirm button instead of primary. */
  dangerous?: boolean
  onConfirm?: () => void
  /** Cancel button, overlay click or Escape. */
  onCancel?: () => void
  /** Replaces the body paragraph. */
  children?: React.ReactNode
  /** Replaces the Cancel / Confirm row. */
  actions?: React.ReactNode
}
/** Confirmation dialog with a focus trap. Render it conditionally - it has no `open` prop. Fixed full-screen overlay. */
export declare function Modal(props: ModalProps): JSX.Element

export interface ToastProps extends Common {
  visible?: boolean
  /** One short line, set in mono. */
  message?: string
}
/** One-line status pill fixed to the bottom centre of the viewport. The caller owns the timeout. */
export declare function Toast(props: ToastProps): JSX.Element

export interface TooltipProps {
  visible?: boolean
  text?: string
  /** Viewport x of the anchor; the tooltip centres on it. */
  x?: number
  /** Viewport y of the anchor's top edge; flips below near the top of the screen. */
  y?: number
}
/** Viewport-positioned hint, rendered into document.body. The caller decides when and where to show it. */
export declare function Tooltip(props: TooltipProps): JSX.Element

export interface NavItem {
  label: string
  /** A 16x16 icon component or element; colored via currentColor. */
  icon?: React.ComponentType<{ width?: number; height?: number }> | React.ReactNode
  active?: boolean
  badge?: string | number
  onClick?: () => void
}
export interface AppNavProps {
  items: NavItem[]
}
/** Sidebar navigation list; data-driven and router-agnostic. */
export declare function AppNav(props: AppNavProps): JSX.Element

export interface AppSidebarProps {
  /** Shown in the header. */
  productName: string
  /** Shown as v{version} beside the name. */
  version?: string
  /** Product mark left of the name. */
  logoIcon?: React.ReactNode
  /** Nav content, usually an AppNav. */
  children?: React.ReactNode
  /** Above the footer box, e.g. a sync badge. */
  status?: React.ReactNode
  /** Bordered box above the fixed OxHive brand line. */
  footer?: React.ReactNode
}
/** The 200px full-height sidebar every OxHive product shares; put it in a flex row beside the main content. */
export declare function AppSidebar(props: AppSidebarProps): JSX.Element
