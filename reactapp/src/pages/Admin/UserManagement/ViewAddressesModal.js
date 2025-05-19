import { MdBook } from "react-icons/md"

const ViewAddressesModal = ({ user, onClose }) => {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-icon">
              <MdBook size={24} />
            </div>
            <h2>View Addresses</h2>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>User</label>
              <span>{user ? user.name : ""}</span>
            </div>
            <div className="form-group">
              <label>Addresses</label>
              {user && user.addresses ? user.addresses.map((address, index) => (
                <div key={index} className="address-item">
                  {address}
                </div>
              )) : null}
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-primary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  export default ViewAddressesModal
  
  