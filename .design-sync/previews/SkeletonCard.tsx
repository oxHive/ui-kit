import { SkeletonCard } from '@oxhive/ui'

export const LoadingList = () => (
  <div style={{ background: 'var(--hm-bg-base)', padding: 16, borderRadius: 8 }}>
    <div
      aria-busy="true"
      aria-label="Loading memories"
      style={{
        width: 320,
        border: '0.5px solid var(--hm-border-subtle)',
        borderRadius: 8,
        overflow: 'hidden',
        background: 'var(--hm-bg-surface)',
      }}
    >
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  </div>
)
