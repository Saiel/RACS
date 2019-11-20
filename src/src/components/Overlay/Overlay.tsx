import React, { PropsWithChildren, useEffect, useCallback } from 'react';

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
      <div className="Overlay-Close"><button onClick={onClose}>X</button></div>
      <div className="Overlay-Content">
        {children}
      </div>
    </div>
  )
};

export default Overlay;
