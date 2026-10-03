import { EmptyState } from '@oxhive/ui'

export const NoMemories = () => {
  const frame = {
    width: 360,
    height: 200,
    border: '0.5px solid var(--hm-border-subtle)',
    borderRadius: 8,
    background: 'var(--hm-bg-surface)',
  }
  const Hex = () => (
    <svg width="28" height="28" viewBox="0 0 16 16" aria-hidden="true">
      <polygon
        points="8,1.5 13.6,4.75 13.6,11.25 8,14.5 2.4,11.25 2.4,4.75"
        fill="none"
        stroke="var(--hm-border-strong)"
        strokeWidth="1"
      />
      <circle cx="8" cy="8" r="1.5" fill="var(--hm-border-strong)" />
    </svg>
  )
  return (
    <div style={{ background: 'var(--hm-bg-base)', padding: 16, borderRadius: 8 }}>
      <div style={frame}>
        <EmptyState
          message="No memories yet."
          hint="Ask Claude to remember something."
          icon={<Hex />}
        />
      </div>
    </div>
  )
}

export const NoResults = () => {
  const frame = {
    width: 360,
    height: 200,
    border: '0.5px solid var(--hm-border-subtle)',
    borderRadius: 8,
    background: 'var(--hm-bg-surface)',
  }
  return (
    <div style={{ background: 'var(--hm-bg-base)', padding: 16, borderRadius: 8 }}>
      <div style={frame}>
        <EmptyState
          message="No results for “quarterly”."
          hint="Try a shorter search or another layer."
        />
      </div>
    </div>
  )
}
