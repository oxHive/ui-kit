import { Button } from '@oxhive/ui'

export const Variants = () => {
  const row = { display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }
  return (
    <div style={{ background: 'var(--hm-bg-base)', padding: 16, borderRadius: 8 }}>
      <div style={row}>
        <Button variant="primary">Save changes</Button>
        <Button>Cancel</Button>
        <Button variant="danger">Delete memory</Button>
        <Button variant="ghost">Dismiss</Button>
      </div>
    </div>
  )
}

export const Small = () => {
  const row = { display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }
  return (
    <div style={{ background: 'var(--hm-bg-base)', padding: 16, borderRadius: 8 }}>
      <div style={row}>
        <Button variant="primary" size="sm">
          save
        </Button>
        <Button size="sm">cancel</Button>
        <Button variant="danger" size="sm">
          delete
        </Button>
        <Button variant="ghost" size="sm">
          dismiss
        </Button>
      </div>
    </div>
  )
}

export const WithIcon = () => {
  const row = { display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }
  return (
    <div style={{ background: 'var(--hm-bg-base)', padding: 16, borderRadius: 8 }}>
      <div style={row}>
        <Button variant="primary">
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M8 3v10M3 8h10" />
          </svg>
          New memory
        </Button>
        <Button>
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M2.5 10.5v3h11v-3M8 2.5v8M5 7.5l3 3 3-3" />
          </svg>
          Export
        </Button>
      </div>
    </div>
  )
}

export const Disabled = () => {
  const row = { display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }
  return (
    <div style={{ background: 'var(--hm-bg-base)', padding: 16, borderRadius: 8 }}>
      <div style={row}>
        <Button variant="primary" disabled>
          Save changes
        </Button>
        <Button disabled>Cancel</Button>
        <Button variant="danger" disabled>
          Delete memory
        </Button>
      </div>
    </div>
  )
}
