import { AppNav } from '@oxhive/ui'

export const Navigation = () => {
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
  const Graph = icon(
    'M4 5.5a1.5 1.5 0 1 0 0-.01M12 5.5a1.5 1.5 0 1 0 0-.01M8 12a1.5 1.5 0 1 0 0-.01M5.5 5h5M5 6.5l2 4M11 6.5l-2 4',
  )
  const Flag = icon('M3 14V2.5h8.5l-1.5 3 1.5 3H3')
  const Gear = icon('M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2')
  return (
    <div style={{ background: 'var(--oxui-bg-base)', padding: 16, borderRadius: 8 }}>
      <div
        style={{
          width: 220,
          background: 'var(--oxui-bg-surface)',
          border: '0.5px solid var(--oxui-border-subtle)',
          borderRadius: 8,
        }}
      >
        <AppNav
          items={[
            { label: 'Memories', icon: List, active: true },
            { label: 'Graph', icon: Graph },
            { label: 'Feedback', icon: Flag, badge: 3 },
            { label: 'Settings', icon: Gear },
          ]}
        />
      </div>
    </div>
  )
}
