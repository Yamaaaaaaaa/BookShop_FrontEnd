import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import './StatusChangeModal.scss';

export const StatusChangeModal = ({
  isOpen,
  onClose,
  onSubmit,
  currentStatus,
  newStatus,
}) => {
  const [formData, setFormData] = useState({
    status: "unchecked",
    title: `Order Status Update: ${getStatusLabel(currentStatus)} → ${getStatusLabel(newStatus)}`,
    type: `${currentStatus}_to_${newStatus}`,
    content: ''
  });

  
  if (!isOpen) return null;

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
    <div className="status-modal-overlay">
      <div className="status-modal">
        <div className="status-modal__header">
          <h2>Send Notification to Customer</h2>
          <button className="close-button" onClick={onClose}>
            <MdClose />
          </button>
        </div>
        
        <div className="status-modal__body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Status Change</label>
              <div className="status-change">
                <span className={`status-badge status-badge--${currentStatus}`}>
                  {getStatusLabel(currentStatus)}
                </span>
                <span className="status-arrow">→</span>
                <span className={`status-badge status-badge--${newStatus}`}>
                  {getStatusLabel(newStatus)}
                </span>
              </div>
              
              <label htmlFor="type">Type</label>
              <input
                type="text"
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="content">Message to Customer</label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={4}
                placeholder="Enter your message to the customer..."
                required
              />
            </div>
            
            <div className="form-actions">
              <button type="button" className="cancel-button" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="submit-button">
                Send & Update Status
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Helper function to get readable status labels
function getStatusLabel(status) {
  switch (status) {
    case "pending": return "Pending";
    case "approved": return "Approved";
    case "shipping": return "Shipping";
    case "delivered": return "Delivered";
    case "cancelled": return "Cancelled";
    default: return status;
  }
}
