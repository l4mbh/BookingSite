import { React } from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "react-bootstrap";
import ReactDom from "react-dom";

let modalEl = document.getElementById("modal-root");

if (!modalEl) {
  const modalDiv = document.createElement("div");
  modalDiv.id = "modal-root";
  document.body.appendChild(modalDiv);
  modalEl = modalDiv;
}

const ModalPortal = ({
  visible,
  setVisible,
  children,
  header,
  variant,
  confirm,
  deny,
}) => {
  const onConfirm = () => {
    setVisible(false);
    confirm();
  };
  const onDeny = () => {
    setVisible(false);
    deny();
  };

  const closeModal = () => {
    setVisible(false);
  }

  return ReactDom.createPortal(
    <Modal show={visible}>
      <ModalHeader>
        <h1>{header}</h1>
      </ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        {variant === "confirm" && (
          <>
            <div className="modal-action">
              <button className="btn btn-danger" onClick={onConfirm}>
                Confirm
              </button>
            </div>
            <div className="modal-action">
              <button className="btn btn-secondary" onClick={onDeny}>
                Close
              </button>
            </div>
          </>
        )}
        {variant === "info" && (
          <div className="modal-action">
            <button className="btn btn-secondary" onClick={closeModal}>
              Close
            </button>
          </div>
        )}
      </ModalFooter>
    </Modal>,
    modalEl
  );
};

export default ModalPortal;
