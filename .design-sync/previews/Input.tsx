import { Input } from '@oxhive/ui'

export const WithLabel = () => {
  const label = {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    width: 280,
    fontSize: 11,
    color: 'var(--hm-text-secondary)',
  }
  return (
    <div style={{ background: 'var(--hm-bg-base)', padding: 16, borderRadius: 8 }}>
      <label style={label}>
        Memory title
        <Input value="Quarterly planning notes" />
      </label>
    </div>
  )
}

export const Placeholder = () => {
  const label = {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    width: 280,
    fontSize: 11,
    color: 'var(--hm-text-secondary)',
  }
  return (
    <div style={{ background: 'var(--hm-bg-base)', padding: 16, borderRadius: 8 }}>
      <div style={{ width: 280 }}>
        <Input placeholder="Search memories" aria-label="Search memories" />
      </div>
    </div>
  )
}
