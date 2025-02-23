import React, { useState } from 'react';
import { MdAdd, MdEdit, MdDelete, MdVisibility } from 'react-icons/md';
import ViewBookModal from './ViewBookModal';
import AddEditBookModal from './AddEditBookModal';
import DeleteBookModal from './DeleteBookModal';
import './BooksManagement.scss';
const mockBooks = [
    {
        id: 1,
        name: "Hibernate Core -11th",
        author: "Edogawa Conan",
        categories: "Detective",
        series: "Conan",
        description: "A comprehensive guide to Hibernate Core framework with detailed examples and best practices.",
        publisher: "English Press",
        originalPrice: 299000,
        sale: 249000,
        stock: 50,
        imageUrl: "https://example.com/book1.jpg"
    },
    {
        id: 2,
        name: "Spring Boot Advanced",
        author: "Edogawa Conan",
        categories: "Detective",
        series: "Conan",
        description: "Advanced concepts in Spring Boot development with real-world applications.",
        publisher: "English Press",
        originalPrice: 359000,
        sale: 299000,
        stock: 35,
        imageUrl: "https://example.com/book2.jpg"
    },
    {
        id: 3,
        name: "React Design Patterns",
        author: "Edogawa Conan",
        categories: "Detective",
        series: "Conan",
        description: "Modern React design patterns and architectural solutions.",
        publisher: "English Press",
        originalPrice: 279000,
        sale: 239000,
        stock: 42,
        imageUrl: "https://example.com/book3.jpg"
    },
    {
        id: 4,
        name: "Node.js Microservices",
        author: "Edogawa Conan",
        categories: "Detective",
        series: "Conan",
        description: "Building scalable microservices with Node.js and Express.",
        publisher: "English Press",
        originalPrice: 329000,
        sale: 279000,
        stock: 28,
        imageUrl: "https://example.com/book4.jpg"
    },
    {
        id: 5,
        name: "Python Data Science",
        author: "Edogawa Conan",
        categories: "Detective",
        series: "Conan",
        description: "Data science and machine learning concepts using Python.",
        publisher: "English Press",
        originalPrice: 389000,
        sale: 329000,
        stock: 45,
        imageUrl: "https://example.com/book5.jpg"
    }
];
const BooksManagement = () => {
    const [books, setBooks] = useState(mockBooks);
    const [viewModal, setViewModal] = useState({ show: false, book: null });
    const [addEditModal, setAddEditModal] = useState({ show: false, type: null, book: null });
    const [deleteModal, setDeleteModal] = useState({ show: false, book: null });
    const [searchTerm, setSearchTerm] = useState('');

    // Handlers
    const handleAdd = (newBook) => {
        const lastId = Math.max(...books.map(book => book.id));
        setBooks([...books, { ...newBook, id: lastId + 1 }]);
        setAddEditModal({ show: false, type: null, book: null });
    };

    const handleEdit = (updatedBook) => {
        setBooks(books.map(book => book.id === updatedBook.id ? updatedBook : book));
        setAddEditModal({ show: false, type: null, book: null });
    };

    const handleDelete = (id) => {
        setBooks(books.filter(book => book.id !== id));
        setDeleteModal({ show: false, book: null });
    };

    const filteredBooks = books.filter(book => 
        book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.id.toString().includes(searchTerm)
    );

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', { 
            style: 'currency', 
            currency: 'VND' 
        }).format(value);
    };

    return (
        <div className="book-management">
            {/* Header Section */}
            <div className="book-management__header">
                <h1>Book Management</h1>
                <div className="book-management__actions">
                    <div className="book-management__search">
                        <input
                            type="text"
                            placeholder="Search by ID, Name or Author"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button 
                        className="book-management__add-btn"
                        onClick={() => setAddEditModal({ show: true, type: 'add', book: null })}
                    >
                        <MdAdd /> Add Book
                    </button>
                </div>
            </div>

            {/* Table Section */}
            <div className="book-management__table">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Author</th>
                            <th>Categories</th>
                            <th>Series</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBooks.map((book) => (
                            <tr key={book.id}>
                                <td>{book.id}</td>
                                <td>{book.name}</td>
                                <td>{book.author}</td>
                                <td>{book.categories}</td>
                                <td>{book.series}</td>
                                <td>
                                    <div className="price">
                                        <span className="sale">{formatCurrency(book.sale)}</span>
                                        {book.originalPrice > book.sale && (
                                            <span className="original">{formatCurrency(book.originalPrice)}</span>
                                        )}
                                    </div>
                                </td>
                                <td>{book.stock}</td>
                                <td className="book-management__actions-cell">
                                    <button 
                                        onClick={() => setViewModal({ show: true, book })}
                                        className="action-btn view"
                                        title="View Details"
                                    >
                                        <MdVisibility />
                                    </button>
                                    <button 
                                        onClick={() => setAddEditModal({ show: true, type: 'edit', book })}
                                        className="action-btn edit"
                                        title="Edit Book"
                                    >
                                        <MdEdit />
                                    </button>
                                    <button 
                                        onClick={() => setDeleteModal({ show: true, book })}
                                        className="action-btn delete"
                                        title="Delete Book"
                                    >
                                        <MdDelete />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modals */}
            {viewModal.show && (
                <ViewBookModal 
                    book={viewModal.book}
                    onClose={() => setViewModal({ show: false, book: null })}
                    formatCurrency={formatCurrency}
                />
            )}

            {addEditModal.show && (
                <AddEditBookModal 
                    type={addEditModal.type}
                    book={addEditModal.book}
                    onClose={() => setAddEditModal({ show: false, type: null, book: null })}
                    onSubmit={addEditModal.type === 'add' ? handleAdd : handleEdit}
                />
            )}

            {deleteModal.show && (
                <DeleteBookModal 
                    book={deleteModal.book}
                    onClose={() => setDeleteModal({ show: false, book: null })}
                    onConfirm={() => handleDelete(deleteModal.book.id)}
                />
            )}
        </div>
    );
};

export default BooksManagement;