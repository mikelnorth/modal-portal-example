import { useState } from "react";
import Modal from "../Modal/Modal";
import "./Card.scss";

export default function Card() {
  const [isOpen, setIsOpen] = useState(false);
  const [target, setTarget] = useState(null);
  const openBodyModal = () => {
    setTarget("modal-component-wrapper");
    setIsOpen(true);
  };
  const openCardModal = () => {
    setTarget("card");
    setIsOpen(true);
  };

  return (
    <div className="card" id="card">
      <header>
        <h1>WELCOME TO YOUR PORTAL EXERCISE</h1>
      </header>
      <section>
        <p>
          We are going to learn how to use Portals to build a modal component
          for your app!
        </p>
        <p>
          "Portals provide a first-class way to render children into a DOM node
          that exists outside the DOM hierarchy of the parent component."
        </p>
      </section>
      <section>
        <ul>
          <li>
            The first argument (child) is any renderable React child, such as an
            element, string, or fragment. The second argument (container) is a
            DOM element.
          </li>
          <li>
            Normally, when you return an element from a component’s render
            method, it’s mounted into the DOM as a child of the nearest parent
            node: However, sometimes it’s useful to insert a child into a
            different location in the DOM:
          </li>
          <li>
            A typical use case for portals is when a parent component has an
            overflow: hidden or z-index style, but you need the child to
            visually “break out” of its container. For example, dialogs,
            hovercards, and tooltips.
          </li>
        </ul>
      </section>
      <footer>
        <p>Lets try it out!</p>
        <div>
          <button onClick={() => openBodyModal()}>Open Body Modal</button>
          <button onClick={() => openCardModal()}>Open Card Modal</button>
        </div>
      </footer>
      <Modal
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        targetContainer={target}
      >
        This is our Modal!
      </Modal>
    </div>
  );
}
