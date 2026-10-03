import { Toast } from '@oxhive/ui'

// Toast is fixed to the bottom centre of the viewport; the transformed frame
// stands in for the viewport so the card shows where it lands.
export const Visible = () => (
  <div
    style={{
      position: 'relative',
      height: 140,
      transform: 'translateZ(0)',
      borderRadius: 8,
      background: 'var(--hm-bg-base)',
    }}
  >
    <Toast visible message="Copied: /memory-edit mem_a1b2c3" />
  </div>
)
