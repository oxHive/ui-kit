import { Badge } from '@oxhive/ui'

export const Scopes = () => {
  const row = { display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }
  return (
    <div style={{ background: 'var(--oxui-bg-base)', padding: 16, borderRadius: 8 }}>
      <div style={row}>
        <Badge label="personal" color="var(--oxui-personal)" />
        <Badge label="workspace" color="var(--oxui-workspace)" />
        <Badge label="org" color="var(--oxui-org)" />
      </div>
    </div>
  )
}

export const Status = () => {
  const row = { display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }
  return (
    <div style={{ background: 'var(--oxui-bg-base)', padding: 16, borderRadius: 8 }}>
      <div style={row}>
        <Badge label="synced" color="var(--oxui-success-text)" />
        <Badge label="pending" color="var(--oxui-warning)" />
        <Badge label="failed" color="var(--oxui-danger-text)" />
        <Badge label="draft" />
      </div>
    </div>
  )
}

export const CustomColor = () => {
  const row = { display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }
  return (
    <div style={{ background: 'var(--oxui-bg-base)', padding: 16, borderRadius: 8 }}>
      <div style={row}>
        <Badge label="v0.2.0" color="#d9a441" />
        <Badge label="beta" color="hsl(200, 60%, 55%)" />
      </div>
    </div>
  )
}
