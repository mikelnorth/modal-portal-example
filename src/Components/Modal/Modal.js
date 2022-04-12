import React, {useEffect} from 'react'
import "./modalStyles.scss"
import ReactPortal from "../ReactPortal/ReactPortal";
import classNames from 'classnames';


export default function Modal({ children, isOpen, handleClose, targetContainer = 'react-portal-wrapper'}) {
  useEffect(() => {
    const closeOnEscapeKey = (e) => e.key === 'Escape' ? handleClose() : null;
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey)
    }
  }, [handleClose])


  if (!isOpen) return null;

  return (
    <ReactPortal wrapperId={targetContainer}>
      <div className={classNames("modal", {'rounded': targetContainer === 'card'})}>
        <div className="modal-content">
          <button onClick={handleClose} className="close-btn">
            X
          </button>
          {children}
        </div>
      </div>
    </ReactPortal>
  );
}