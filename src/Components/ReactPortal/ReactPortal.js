import React, {useLayoutEffect, useState} from 'react'
import { createPortal } from 'react-dom'

function createWrapperAndAppendToBody(wrapperId) {
  const wrapperEl = document.createElement('div');
  wrapperEl.setAttribute('id', wrapperId);
  document.body.appendChild(wrapperEl);
  return wrapperEl;
}


export default function ReactPortal({children, wrapperId = 'portal-wrapper'}) {
  const [wrapperElement, setWrapperElement] = useState(null);
  let systemCreated = false;
  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    if(!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(wrapperId);
    }
    setWrapperElement(element);

    return () => {
      if(systemCreated) {
        element?.parentNode.removeChild(element)
      }
    }
  }, [wrapperId]);

  if(wrapperId === null) return null;

  return createPortal(children, wrapperElement);
}
