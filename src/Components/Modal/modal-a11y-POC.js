import { useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import ReactPortal from 'Components/ReactPortal/ReactPortal';
import classNames from 'classnames';
import FocusTrap from 'focus-trap-react';
import PropTypes from 'prop-types';
import style from './style.css';

const getSiblings = (elem) => {
  if (!elem) {
    return [];
  }
  // Setup siblings array and get the first sibling
  const siblings = [];
  let sibling = elem.parentNode.firstChild;
  // Loop through each sibling and push to the array
  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== elem) {
      siblings.push({
        element: sibling,
        hidden: sibling.getAttribute('aria-hidden'),
      });
    }
    sibling = sibling.nextSibling;
  }

  return siblings;
};

function Modal({
  children,
  isOpen,
  handleClose = undefined,
  targetContainerId = undefined,
  'aria-labelledby': ariaLabelledby,
  maxWidth = 'sm',
  initialFocus = null,
  roundOverlayBorder = false,
  dismissible = true,
  animate = true,
}) {
  const focusTrapOptions = {};
  const nodeRef = useRef(null);

  // Hide all content behind the overlay
  useEffect(() => {
    // Get the container of overlay if portal is within target
    const container = targetContainerId
      ? document.querySelector(`.${style.overlay}`)
      : document.querySelector("[data-testid='modal-portal-wrapper']");
    const siblings = getSiblings(container);
    if (container && isOpen) {
      siblings.forEach(({ element }) => {
        element.setAttribute('aria-hidden', 'true');
      });
    }
    return () => {
      siblings.forEach(({ element, hidden: originalHiddenValue }) => {
        if (originalHiddenValue) {
          element.setAttribute('aria-hidden', originalHiddenValue);
        } else {
          element.removeAttribute('aria-hidden');
        }
      });
    };
  }, [isOpen]);

  useEffect(() => {
    const closeOnOverlay = (e) => {
      if (e.target.classList.contains(style.overlay)) {
        handleClose?.();
      }
    };

    if (dismissible) {
      document.body.addEventListener('click', closeOnOverlay);
    }

    return () => {
      if (dismissible) {
        document.body.removeEventListener('click', closeOnOverlay);
      }
    };
  }, [isOpen]);

  useEffect(() => {
    const closeOnEscapeKey = (e) =>
      e.key === 'Escape' ? handleClose?.() : null;
    if (dismissible) {
      document.body.addEventListener('keydown', closeOnEscapeKey);
    }
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [handleClose]);

  useEffect(() => () => handleClose?.(), []);

  if (initialFocus) {
    focusTrapOptions.initialFocus = initialFocus;
  }

  return (
    <ReactPortal wrapperId={targetContainerId || 'modal-portal-wrapper'}>
      <CSSTransition
        in={isOpen}
        timeout={{ entry: 0, exit: 50 }}
        unmountOnExit
        nodeRef={nodeRef}
        classNames={{
          enter: style.exit,
          enterDone: style.enterDone,
        }}
      >
        <FocusTrap focusTrapOptions={focusTrapOptions}>
          <div
            className={classNames(style.overlay, {
              [style.card]: roundOverlayBorder,
            })}
            data-testid="modal-overlay"
            ref={nodeRef}
            style={{ transition: animate ? 'all 0.05s ease-in-out' : '' }}
          >
            <div
              aria-labelledby={ariaLabelledby}
              aria-modal
              role="alertdialog"
              className={classNames(style.modalContent, {
                [style[maxWidth]]: !!maxWidth,
              })}
            >
              {children}
            </div>
          </div>
        </FocusTrap>
      </CSSTransition>
    </ReactPortal>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
  initialFocus: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.node,
  ]),
  children: PropTypes.node,
  maxWidth: PropTypes.oneOf(['sm', 'med', 'lg']),
  'aria-labelledby': PropTypes.string.isRequired,
  dismissible: PropTypes.bool,
};

export default Modal;
