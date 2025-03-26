import "./profile.scss"
const BillDetailsModal = ({ bill, onClose }) => {
    console.log(bill);
  
    return (
    <div className="profile_modal-overlay" onClick={onClose}>
        <div className="profile_bill-modal" onClick={(e) => e.stopPropagation()}>
            <div className="profile_modal-header">
                <h3>Bill Details - #{bill.id}</h3>
                <button className="profile_close-modal-btn" onClick={onClose}>
                    ×
                </button>
            </div>

            <div className="profile_modal-content">
                <div className="profile_bill-info">
                    <div className="profile_info-row">
                        <span className="profile_info-label">Date:</span>
                        <span className="profile_info-value">20/11</span>
                    </div>
                    <div className="profile_info-row">
                        <span className="profile_info-label">Status:</span>
                        <span className='profile_status-badge'>{bill.state}</span>
                    </div>
                    <div className="profile_info-row">
                        <span className="profile_info-label">Payment Method:</span>
                        <span className="profile_info-value">{bill.PaymentMethod.name}</span>
                    </div>
                </div>

                <div className="profile_purchased-items">
                    <h4>Purchased Items</h4>
                    <div className="profile_items-table-container">
                        <table className="profile_items-table">
                            <thead>
                            <tr>
                                <th>Book</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                            </thead>
                            <tbody>
                                {bill.Books.map((item) => (
                                    <tr key={item.id}>
                                    <td className="profile_book-cell">
                                        <img
                                        src={item.bookImageUrl || "/placeholder.svg"}
                                        alt={item.name}
                                        className="profile_book-thumbnail"
                                        />
                                        <span className="profile_book-name">{item.name}</span>
                                    </td>
                                    <td>${item.sale.toFixed(2)}</td>
                                    <td>{item.Bill_Book.quantity}</td>
                                    <td>${(item.sale * item.Bill_Book.quantity)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="profile_bill-summary">
                    <div className="profile_summary-row">
                        <span>Shipping:</span>
                        <span>5$</span>
                    </div>
                    <div className="profile_summary-row total">
                        <span>Total:</span>
                        <span>${bill.totalCost}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default BillDetailsModal

