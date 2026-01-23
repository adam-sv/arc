import { cn, Button, Modal, Title } from '@adam-sv/arc';
import './style.scss';
import type { IARCProps } from '@adam-sv/arc';

export interface IArcAlertModalProps extends IARCProps {
  text: string;
  title?: string;
  buttonText?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  portalTargetElement?: Element | null;
}

export const AlertModal = ({
  buttonText = 'Ok',
  className,
  id,
  isOpen,
  portalTargetElement,
  setIsOpen,
  style,
  text,
  title = 'Alert',
}: IArcAlertModalProps) => (
  <Modal
    className={cn('ArcAlertModal', className)}
    id={id}
    style={style}
    isOpen={isOpen}
    setIsOpen={setIsOpen}
    portalTargetElement={portalTargetElement}
  >
    <Title>{title}</Title>
    <div className='ArcAlertModal-message'>{text}</div>
    <div
      className='ArcAlertModal-buttonRow'
      data-testid={'ArcAlertModal-button'}
    >
      <Button
        className='ArcAlertModal-button'
        onClick={() => {
          setIsOpen(false);
        }}
      >
        {buttonText}
      </Button>
    </div>
  </Modal>
);
