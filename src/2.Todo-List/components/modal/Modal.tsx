import React from "react";

import styles from './Modal.module.scss';

interface Props {
  children: React.ReactNode;
}

const Modal = ({ children }: Props) => {
  const closeModal = (e: React.MouseEvent): void => {
    const modal = document.querySelector("#modal");
    modal?.classList.add(styles.hide);
  };

  return (
    <div id="modal" className={styles.hide} >
      <div className={styles.fade} onClick={closeModal}></div>
      <div className={styles.modal}>
        <div className={styles.content}>
          <p>{children}</p>

        </div>
      </div>
    </div>
  );
};

export default Modal;