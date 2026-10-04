import { useLayoutEffect, useRef, useState } from 'react'
import { Tooltip } from '@oxhive/ui'

// Tooltip renders into document.body at viewport coordinates: measure the
// anchor and pass its top-centre. In an app, set `visible` from
// mouseenter/focus and clear it on mouseleave/blur.
export const AboveTarget = () => {
  const anchor = useRef(null)
  const [pos, setPos] = useState(null)
  useLayoutEffect(() => {
    const r = anchor.current.getBoundingClientRect()
    setPos({ x: r.left + r.width / 2, y: r.top })
  }, [])
  return (
    <div
      style={{
        height: 140,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: 32,
        borderRadius: 8,
        background: 'var(--oxui-bg-base)',
      }}
    >
      <span
        ref={anchor}
        tabIndex={0}
        style={{
          padding: '6px 12px',
          border: '0.5px solid var(--oxui-border-default)',
          borderRadius: 4,
          fontSize: 12,
          color: 'var(--oxui-text-secondary)',
        }}
      >
        Shared
      </span>
      <Tooltip
        visible={!!pos}
        text="Shared with 4 people in the Design workspace"
        x={pos?.x ?? 0}
        y={pos?.y ?? 0}
      />
    </div>
  )
}
