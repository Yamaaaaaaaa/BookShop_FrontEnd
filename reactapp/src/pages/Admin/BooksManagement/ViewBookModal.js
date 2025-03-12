import React from 'react';
import { MdBook } from 'react-icons/md';
import './Modal.scss';

const ViewBookModal = ({ book, onClose, formatCurrency }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <div className="modal-icon">
                        <MdBook size={24} />
                    </div>
                    <h2>View Book</h2>
                </div>

                <div className="modal-body view-book">
                    <div className="view-book__info">
                        <div className="info-row">
                            <label>Book ID:</label>
                            <span>{book.id}</span>
                        </div>
                        
                        <div className="info-row">
                            <label>Name:</label>
                            <span>{book.name}</span>
                        </div>

                        <div className="info-row">
                            <label>Description:</label>
                            <span>{book.description}</span>
                        </div>

                        {/* <div className="info-row">
                            <label>Category:</label>
                            <span>{book.categories}</span>
                        </div> */}

                        <div className="info-row">
                            <label>Series:</label>
                            <span>{book.Serie ? book.Serie.name : "Unknown"}</span>
                        </div>

                        <div className="info-row">
                            <label>Publisher:</label>
                            <span>{book.Publisher.name}</span>
                        </div>

                        <div className="info-row">
                            <label>Author:</label>
                            <span>{book.Author.name}</span>
                        </div>

                        <div className="info-row">
                            <label>Price:</label>
                            <div className="price">
                                <span className="sale">{formatCurrency(book.sale)}</span>
                                {book.originalCost > book.sale && (
                                    <span className="original">{formatCurrency(book.originalCost)}</span>
                                )}
                            </div>
                        </div>

                        <div className="info-row">
                            <label>Stock:</label>
                            <span>{book.stock}</span>
                        </div>
                    </div>

                    <div className="view-book__image">
                        <div className="image-placeholder">
                            <img src={book.bookImageUrl} alt="Image Book"/>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="btn btn-primary" onClick={onClose}>
                        CLOSE
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewBookModal;