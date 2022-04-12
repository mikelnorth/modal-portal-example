import React, { useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import ReactPortal from "Components/ReactPortal/ReactPortal";
import classNames from "classnames";
import FocusTrap from "focus-trap-react";
import PropTypes from "prop-types";
import "./modalStyles.scss";


// This code will not work in the example, but should be used as a reference of a more complete production implementation
function Modal({
  children,
  isOpen = false,
  handleClose,
  targetContainer = "modal-portal-wrapper",
  "aria-labelledby": ariaLabelledby,
  maxWidth = "sm",
  initialFocus = null,
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
        <FocusTrap focusTrapOptions={{ initialFocus }}>
          <div className={'modal'} ref={nodeRef}>
            <Content // this component does not exist
              aria-labelledby={ariaLabelledby}
              aria-modal
              role="alertdialog"
              className={classNames('modal', {
                'maxWidth': !!maxWidth,
              })}
            >
              {children}
            </Content>
          </div>
        </FocusTrap>
      </ReactPortal>
    </CSSTransition>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  initialFocus: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  children: PropTypes.node,
  maxWidth: PropTypes.oneOf(["sm", "med"]),
  "aria-labelledby": PropTypes.string.isRequired,
};

export default Modal;
