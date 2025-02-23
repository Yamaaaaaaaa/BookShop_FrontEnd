import React from 'react';
import { MdDelete } from 'react-icons/md';
import './Modal.scss';

const DeleteBookModal = ({ book, onClose, onConfirm }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content delete-modal">
                <div className="modal-header">
                    <div className="modal-icon">
                        <MdDelete size={24} />
                    </div>
                    <h2>Delete Confirmation</h2>
                </div>

                <div className="modal-body delete-confirmation">
                    <p>
                        "Are you certain you wish to proceed with the deletion of the selected entry?"
                    </p>
                </div>

                <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={onClose}>
                        CANCEL
                    </button>
                    <button className="btn btn-danger" onClick={onConfirm}>
                        CONFIRM
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteBookModal;