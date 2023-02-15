# useModal

The `useModal` hook pairs with the `<Modal />` component to let you render and control modals from within your component.

## Signature

```typescript
const [
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void,
  toggle: () => void,
] = useModal();
```

## Example

Let's say I wanted to display the `InputSkeleton` component inline in a Form, and open our modal when the user clicks the InputSkeleton's "Open Modal"

```tsx
import { Modal, useModal } from '@adam-sv/arc';

function TreeBrowser(props: ITreeBrowserProps) {
  const [isOpen, setIsOpen, toggleOpen] = useModal();

  return (
    <div className="TreeBrowser">
      <InputSkeleton
        buttonProps={{ label: 'Open Modal', onClick: e => setIsOpen(true) }}
      />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} portalTargetElement={document.body}>
        <Title titleType={2} text="My Custom Modal" />
        {/* your modal content, controlled by your component state! */}
      </Modal>
    </div>
  );
}
```
