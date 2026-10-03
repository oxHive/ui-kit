import { CopyButton } from '@oxhive/ui'

export const CommandLine = () => {
  const code = {
    height: 28,
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0 10px',
    borderRadius: 5,
    background: 'var(--oxui-mono-bg)',
    border: '0.5px solid var(--oxui-mono-border)',
    fontFamily: 'var(--oxui-font-mono)',
    fontSize: 11,
    color: 'var(--oxui-text-primary)',
  }
  return (
    <div style={{ background: 'var(--oxui-bg-base)', padding: 16, borderRadius: 8 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <code style={code}>mynd status</code>
        <CopyButton text="mynd status" />
      </div>
    </div>
  )
}

export const Variants = () => (
  <div style={{ background: 'var(--oxui-bg-base)', padding: 16, borderRadius: 8 }}>
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <CopyButton text="mem_a1b2c3" label="Copy ID" />
      <CopyButton text="mem_a1b2c3" label="Copy ID" variant="ghost" />
      <CopyButton
        text="https://hive.example/m/a1b2c3"
        label="Copy link"
        variant="primary"
        size="md"
      />
    </div>
  </div>
)

export const IconOnly = () => (
  <div style={{ background: 'var(--oxui-bg-base)', padding: 16, borderRadius: 8 }}>
    <div
      style={{
        display: 'flex',
        gap: 10,
        alignItems: 'center',
        fontFamily: 'var(--oxui-font-mono)',
        fontSize: 11,
        color: 'var(--oxui-text-secondary)',
      }}
    >
      mem_a1b2c3
      <CopyButton text="mem_a1b2c3" variant="ghost" aria-label="Copy ID" title="Copy ID">
        {({ copied }) =>
          copied ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 8.5 6.5 12 13 4.5" />
            </svg>
          ) : (
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="5" y="5" width="8.5" height="8.5" rx="1.5" />
              <path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-6A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5" />
            </svg>
          )
        }
      </CopyButton>
    </div>
  </div>
)
