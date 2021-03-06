import React, { PropsWithChildren, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import './Overlay.scss';

interface Props {
  onClose: () => void;
}

const Overlay: React.FC<PropsWithChildren<Props>> = ({ onClose, children }) => {
  useEffect(() => {
    const escapeHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    }

    document.addEventListener('keyup', escapeHandler);

    return () => {
      document.removeEventListener('keyup', escapeHandler);
    };
  }, [onClose]);

  return (
    <div className="Overlay">
      <div className="Overlay-Close"><button className="Close" onClick={onClose}><span>< FontAwesomeIcon icon={faTimes} /></span></button></div>
          {children}
        </div>
  )
};

export default Overlay;
