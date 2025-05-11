import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Dialog.module.scss';
import CloseIcon from '@/assets/svg/icon-close.svg';

type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.dialogBackdrop}>
      <div className={styles.dialog}>
        <div className={styles.dialog__header}>
          <h2 className={styles.dialog__title}>{title}</h2>
          <button
            onClick={onClose}
            className={styles.dialog__close}
            aria-label='Close'
          >
            <CloseIcon />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.getElementById('portal') as HTMLElement
  );
};

export default Dialog;
