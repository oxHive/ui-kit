import { Button, Input, Modal } from '@oxhive/ui'

export const Dangerous = () => {
  // Modal is a fixed full-screen overlay. In an app it covers the viewport;
  // here the transformed frame becomes its containing block so the card
  // shows the open dialog over a stand-in page.
  const Page = ({ children }) => (
    <div
      style={{
        position: 'relative',
        height: 340,
        transform: 'translateZ(0)',
        overflow: 'hidden',
        borderRadius: 8,
        background: 'var(--oxui-bg-base)',
      }}
    >
      {children}
    </div>
  )
  return (
    <Page>
      <Modal
        title="Delete memory?"
        body="This will be permanently deleted."
        confirmLabel="Delete"
        dangerous
      />
    </Page>
  )
}

export const Confirm = () => {
  // Modal is a fixed full-screen overlay. In an app it covers the viewport;
  // here the transformed frame becomes its containing block so the card
  // shows the open dialog over a stand-in page.
  const Page = ({ children }) => (
    <div
      style={{
        position: 'relative',
        height: 340,
        transform: 'translateZ(0)',
        overflow: 'hidden',
        borderRadius: 8,
        background: 'var(--oxui-bg-base)',
      }}
    >
      {children}
    </div>
  )
  return (
    <Page>
      <Modal
        title="Share with workspace?"
        body="Everyone in Design will be able to see this memory."
        confirmLabel="Share"
      />
    </Page>
  )
}

export const TypeToConfirm = () => {
  // Modal is a fixed full-screen overlay. In an app it covers the viewport;
  // here the transformed frame becomes its containing block so the card
  // shows the open dialog over a stand-in page.
  const Page = ({ children }) => (
    <div
      style={{
        position: 'relative',
        height: 340,
        transform: 'translateZ(0)',
        overflow: 'hidden',
        borderRadius: 8,
        background: 'var(--oxui-bg-base)',
      }}
    >
      {children}
    </div>
  )
  return (
    <Page>
      <Modal
        title="Confirm deletion"
        style={{ borderColor: 'var(--oxui-danger-border)' }}
        actions={
          <>
            <Button>Cancel</Button>
            <Button variant="danger" disabled>
              Clear all
            </Button>
          </>
        }
      >
        <p style={{ marginBottom: 12 }}>Type DELETE to permanently delete everything.</p>
        <Input placeholder="DELETE" aria-label="Type DELETE to confirm" />
      </Modal>
    </Page>
  )
}
