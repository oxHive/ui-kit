import { Menu } from '@oxhive/ui'

export const FlagMenu = () => {
  const Flag = () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 14V2.5h8.5l-1.5 3 1.5 3H3" />
    </svg>
  )
  return (
    <div style={{ background: 'var(--oxui-bg-base)', padding: 16, borderRadius: 8 }}>
      <Menu
        items={['incorrect', 'outdated', 'duplicate', 'other']}
        aria-label="Flag for review"
        trigger={
          <>
            <Flag />
            Flag
          </>
        }
      />
    </div>
  )
}

export const DefaultTrigger = () => (
  <div style={{ background: 'var(--oxui-bg-base)', padding: 16, borderRadius: 8 }}>
    <Menu
      items={['Rename', 'Duplicate', 'Archive']}
      variant="default"
      size="md"
      aria-label="Memory actions"
      trigger="Actions"
    />
  </div>
)
