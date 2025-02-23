import React, { useState, useEffect } from 'react';
import { MdBook } from 'react-icons/md';
import './Modal.scss';

const AddEditBookModal = ({ type, book, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        categories: '',
        series: '',
        publisher: '',
        author: '',
        originalPrice: '',
        sale: '',
        stock: ''
    });

    useEffect(() => {
        if (type === 'edit' && book) {
            setFormData(book);
        }
    }, [type, book]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <div className="modal-icon">
                        <MdBook size={24} />
                    </div>
                    <h2>{type === 'add' ? 'Add Book' : 'Update Book'}</h2>
                </div>

                <form onSubmit={handleSubmit} className="modal-body">
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="categories">Category:</label>
                            <input
                                id="categories"
                                type="text"
                                name="categories"
                                value={formData.categories}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="series">Series:</label>
                            <input
                                id="series"
                                type="text"
                                name="series"
                                value={formData.series}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="publisher">Publisher:</label>
                            <input
                                id="publisher"
                                type="text"
                                name="publisher"
                                value={formData.publisher}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="author">Author:</label>
                            <input
                                id="author"
                                type="text"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="originalPrice">Original Price:</label>
                            <input
                                id="originalPrice"
                                type="number"
                                name="originalPrice"
                                value={formData.originalPrice}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="sale">Sale Price:</label>
                            <input
                                id="sale"
                                type="number"
                                name="sale"
                                value={formData.sale}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="stock">Stock:</label>
                        <input
                            id="stock"
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </form>

                <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={onClose}>
                        CANCEL
                    </button>
                    <button className="btn btn-primary" onClick={handleSubmit}>
                        {type === 'add' ? 'ADD' : 'UPDATE'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddEditBookModal;