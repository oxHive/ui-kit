import { AppNav, AppSidebar, Badge, Input } from '@oxhive/ui'

export const AppShell = () => {
  const icon = (d) => () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  )
  const List = icon('M2.5 4.5h11M2.5 8h11M2.5 11.5h7')
  const Flag = icon('M3 14V2.5h8.5l-1.5 3 1.5 3H3')
  const Gear = icon('M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2')
  const ProductMark = () => (
    <svg width="22" height="22" viewBox="0 0 16 16" aria-hidden="true">
      <polygon
        points="8,1.5 13.6,4.75 13.6,11.25 8,14.5 2.4,11.25 2.4,4.75"
        fill="none"
        stroke="var(--oxui-accent)"
        strokeWidth="1.2"
      />
      <circle cx="8" cy="8" r="2" fill="var(--oxui-accent)" />
    </svg>
  )
  return (
    <div style={{ background: 'var(--oxui-bg-base)', padding: 16, borderRadius: 8 }}>
      <div
        style={{
          display: 'flex',
          height: 440,
          border: '0.5px solid var(--oxui-border-subtle)',
          borderRadius: 8,
          overflow: 'hidden',
        }}
      >
        <AppSidebar
          productName="Hivemind"
          version="0.2.0"
          logoIcon={<ProductMark />}
          status={
            <div style={{ padding: '0 20px 12px' }}>
              <Badge label="synced" color="var(--oxui-success-text)" />
            </div>
          }
          footer={
            <div style={{ fontSize: 11, color: 'var(--oxui-text-tertiary)' }}>1,234 memories</div>
          }
        >
          <AppNav
            items={[
              { label: 'Memories', icon: List, active: true },
              { label: 'Feedback', icon: Flag, badge: 3 },
              { label: 'Settings', icon: Gear },
            ]}
          />
        </AppSidebar>
        <main
          style={{
            flex: 1,
            minWidth: 0,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            background: 'var(--oxui-bg-base)',
          }}
        >
          <h1 style={{ fontSize: 15, fontWeight: 600 }}>Memories</h1>
          <Input placeholder="Search memories" aria-label="Search memories" />
        </main>
      </div>
    </div>
  )
}
