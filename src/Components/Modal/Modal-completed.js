import React, {useEffect, useRef} from 'react'
import "./modalStyles.scss"
import ReactPortal from "../ReactPortal/ReactPortal";
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
export default function Modal({ children, isOpen, handleClose, targetContainer = 'modal-portal-wrapper'}) {
  const nodeRef = useRef(null);
  useEffect(() => {
    const closeOnEscapeKey = (e) => e.key === 'Escape' ? handleClose() : null;
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey)
    }
  }, [handleClose])
  return (
    <ReactPortal wrapperId={targetContainer}>
      <CSSTransition
        in={isOpen}
        timeout={{ entry: 0, exit: 50 }}
        unmountOnExit
        nodeRef={nodeRef}
        classNames='modal'
      >
      <div className={classNames("modal", {'rounded': targetContainer === 'card'})} ref={nodeRef}>
        <div className="modal-content">
          <button onClick={handleClose} className="close-btn">
            X
          </button>
          {children}
        </div>
      </div>
      </CSSTransition>
    </ReactPortal>
  );
}