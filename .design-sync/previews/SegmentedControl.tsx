import { SegmentedControl } from '@oxhive/ui'

export const LayerFilter = () => {
  const LAYERS = [
    { label: 'All', value: 'all' },
    { label: 'Personal', value: 'personal', description: 'Only memories on this device' },
    { label: 'Workspace', value: 'workspace', description: 'Memories shared with this workspace' },
  ]
  return (
    <div style={{ background: 'var(--hm-bg-base)', padding: 16, borderRadius: 8 }}>
      <SegmentedControl value="personal" options={LAYERS} aria-label="Filter by layer" />
    </div>
  )
}

export const ViewSwitch = () => (
  <div style={{ background: 'var(--hm-bg-base)', padding: 16, borderRadius: 8 }}>
    <SegmentedControl
      value="list"
      options={[
        { label: 'List', value: 'list' },
        { label: 'Graph', value: 'graph' },
      ]}
      aria-label="View"
    />
  </div>
)

export const Locked = () => (
  <div style={{ background: 'var(--hm-bg-base)', padding: 16, borderRadius: 8 }}>
    <SegmentedControl
      value="daily"
      disabled
      options={[
        { label: 'Daily', value: 'daily' },
        { label: 'Weekly', value: 'weekly' },
        { label: 'Monthly', value: 'monthly' },
      ]}
      aria-label="Sync frequency"
    />
  </div>
)
