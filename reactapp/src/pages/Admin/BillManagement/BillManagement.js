import { useEffect, useState } from "react"
import { MdAdd, MdEdit, MdDelete, MdVisibility } from "react-icons/md"
import BillDetailModal from "./BillDetailModal"
import "./BillManagement.scss"
import { toast } from "react-toastify"
import { deleteBill, getAllBill } from "../../../service/billService"


const BillsManagement = () => {
  const [dataBill, setDataBill] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBill, setSelectedBill] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  const filteredBills = dataBill.filter(
    (bill) =>
      bill.User.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.id.toString().includes(searchTerm) 
    )

  const handleViewBill = (bill) => {
    setSelectedBill(bill)
    setShowDetailModal(true)
  }

  const handleCloseModal = () => {
    setShowDetailModal(false)
  }

  const fetchAllBill = async () => {
    const response = await getAllBill()
    if(response) {
      if(response.status === 1){
        toast.success(response.message)
        setDataBill(response.data)
        console.log(response.data);
        return
      }
    }
    toast.error(response.message)
  }

  const handleDeleteBill = async (billId) => {
    const response = await deleteBill(billId)
    if(response) {
      if(response.status === 1){
        toast.success(response.message)
        fetchAllBill()
        return
      }
    }
    toast.error(response.message)
  }

  useEffect(() => {
    fetchAllBill()
  }, [])

  return (
    <div className="bills-management">
      <div className="bills-management__header">
        <h1>Bills Management</h1>
        <div className="bills-management__actions">
          <div className="bills-management__search">
            <input
              type="text"
              placeholder="Search by ID or Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="bills-management__add-btn">
            <MdAdd /> Add Bill
          </button>
        </div>
      </div>

      <div className="bills-management__table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer Name</th>
              <th>Contact No</th>
              <th>Location</th>
              <th>Payment</th>
              <th>State</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBills.map((bill) => (
              <tr key={bill.id}>
                <td>{bill.id}</td>
                <td>{bill.User.name}</td>
                <td>{bill.deliveryPhone}</td>
                <td>{bill.deliveryAddress}</td>
                <td>{bill.PaymentMethod.name}</td>
                <td>{bill.state}</td>
                <td className="bills-management__actions-cell">
                  <button className="action-btn view" title="View Bill"  onClick={() => handleViewBill(bill)}>
                    <MdVisibility />
                  </button>
                  {/* <button className="action-btn edit" title="Edit Bill">
                    <MdEdit />
                  </button> */} 
                  <button className="action-btn delete" title="Delete Bill" onClick={() => handleDeleteBill(bill.id)}>
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showDetailModal && selectedBill && <BillDetailModal bill={selectedBill} onClose={handleCloseModal} handleDeleteBill={handleDeleteBill} fetchAllBill={fetchAllBill}/>}
    </div>
  )
}

export default BillsManagement

