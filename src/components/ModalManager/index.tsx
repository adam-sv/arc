import React, { useEffect, useState } from 'react';

import { Alert } from './Alert';
import { Confirm } from './Confirm';
import { View } from './view';

interface IModalManagerProps {
  onRegister: any; // todo
  onUnregister: any;
}

type CustomComponent<ResolveType = any, RejectType = any> = (props: {
  resolve: (value: ResolveType) => void;
  reject: (value: RejectType) => void;
}) => JSX.Element;

export interface IModalStateInterface {
  alert: (text: string, title?: string) => any;
  confirm: (text: string, title?: string) => any;
  showCustom: <ResolveType = any, RejectType = any>(
    Component: CustomComponent<ResolveType, RejectType>
  ) => Promise<ResolveType>;
}

export function ModalManager({ onRegister, onUnregister }: IModalManagerProps) {
  const [activeModal, setActiveModal] = useState<JSX.Element | undefined>();
  const [backdrop, setBackdrop] = useState<any>();

  useEffect(() => {
    async function confirm(text: string, title: string = 'Confirm') {
      return new Promise((resolve, reject) => {
        setActiveModal(
          <Confirm
            title={title}
            text={text}
            onConfirm={() => resolve(true)}
            onCancel={() => reject(false)}
          />
        );
      }).finally(() => setActiveModal(undefined));
    }

    async function alert(text: string, title: string = 'Alert') {
      return new Promise(resolve => {
        setActiveModal(
          <Alert title={title} text={text} onDismiss={() => resolve(true)} />
        );
      })
        .catch(() => void 0) /* avoid uncaught promise warnings / errors */
        .finally(() => setActiveModal(undefined));
    }

    async function showCustom<ResolveType = any, RejectType = any>(
      Component: CustomComponent<ResolveType, RejectType>
    ) {
      return new Promise<ResolveType>((resolve, reject) => {
        setActiveModal(<Component resolve={resolve} reject={reject} />);
      }).finally(() => setActiveModal(undefined));
    }

    const controls: IModalStateInterface = { alert, confirm, showCustom };

    onRegister('modal', controls);
    return () => onUnregister('modal');
  }, []);

  const handleBackdropClick = (e: any) => {
    if (e.target === backdrop) {
      setActiveModal(undefined);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      setActiveModal(undefined);
    }
  };

  return (
    <View
      modal={activeModal}
      setBackdrop={setBackdrop}
      onBackdropClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
    />
  );
}
