import React, { useEffect, useRef } from "react";
import "./modalStyles.scss";
import ReactPortal from "../ReactPortal/ReactPortal";
import { CSSTransition } from "react-transition-group";
export default function Modal({
  children,
  isOpen,
  handleClose,
  targetContainer = "modal-portal-wrapper",
}) {
  const nodeRef = useRef(null);
  useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === "Escape" ? handleClose() : null);
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);
  return (
    <CSSTransition
      in={isOpen}
      timeout={{ entry: 0, exit: 50 }}
      unmountOnExit
      nodeRef={nodeRef}
      classNames="modal"
    >
      <ReactPortal wrapperId={targetContainer}>
        <div
          className='modal'
          ref={nodeRef}
        >
          <div className="modal-content">
            <button onClick={handleClose} className="close-btn">
              X
            </button>
            {children}
          </div>
        </div>
      </ReactPortal>
    </CSSTransition>
  );
}
