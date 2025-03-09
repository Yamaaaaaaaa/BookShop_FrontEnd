const BillDetailsModal = ({ bill, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="bill-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Bill Details - #{bill.id}</h3>
          <button className="close-modal-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-content">
          <div className="bill-info">
            <div className="info-row">
              <span className="info-label">Date:</span>
              <span className="info-value">20/11</span>
            </div>
            <div className="info-row">
              <span className="info-label">Status:</span>
              <span className='status-badge'>Status</span>
            </div>
            <div className="info-row">
              <span className="info-label">Payment Method:</span>
              <span className="info-value">Payment</span>
            </div>
          </div>

          <div className="purchased-items">
            <h4>Purchased Items</h4>
            <div className="items-table-container">
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Book</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {bill.items.map((item) => (
                    <tr key={item.id}>
                      <td className="book-cell">
                        <img
                          src={item.book.imageUrl || "/placeholder.svg"}
                          alt={item.book.name}
                          className="book-thumbnail"
                        />
                        <span className="book-name">{item.book.name}</span>
                      </td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>{item.quantity}</td>
                      <td>${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bill-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${bill.subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>${bill.shipping.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${bill.totalCost.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BillDetailsModal

