import React from 'react';
import Modal from 'react-modal';
import { FaTrashAlt } from 'react-icons/fa';

Modal.setAppElement('#root');

const DeleteModal = ({ isOpen, onRequestClose, onConfirmDelete }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Eliminar Partilha"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-content">
        <div className="modal-icon">
          <FaTrashAlt />
        </div>
        <h2>Eliminar partilha?</h2>
        <p>O usuário que criou esta partilha será notificado sobre sua ação</p>
        <div className="modal-buttons">
          <button onClick={onConfirmDelete}>Eliminar</button>
          <button onClick={onRequestClose}>Cancelar</button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
