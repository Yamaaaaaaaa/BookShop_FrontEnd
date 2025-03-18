import { useEffect, useState } from "react"
import AddUserModal from "./AddUserModal"
import DeleteUserModal from "./DeleteUserModal"
import ViewAddressesModal from "./ViewAddressesModal"
import "./UserManagement.scss"
import { MdAdd, MdEdit, MdDelete, MdVisibility } from 'react-icons/md';
import { getAllUser } from "../../../service/userService"
import { toast } from "react-toastify"

  
const UserManagement = () => {
    const [userData, setUserData] = useState([])
    const [addModal, setAddModal] = useState({ show: false, user: null , type: "add"})
    const [deleteModal, setDeleteModal] = useState({ show: false, user: null })
    const [addressModal, setAddressModal] = useState({ show: false, user: null })
    const [searchTerm, setSearchTerm] = useState("")

    const filteredUsers = userData.filter(
        (user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.id.toString().includes(searchTerm),
    )

    const fetchAllUser = async () => {
        try {
            const dataUsers = await getAllUser()
            if (dataUsers?.data) {
                setUserData(dataUsers.data);
                console.log("All User: ", dataUsers.data);
                
                toast.success(dataUsers.message)
                return
            }
            else toast.error(dataUsers.message)
        } catch (error) {
            toast.error("Error fetching All User:", error);
        } 
    }
    useEffect(() => {
        fetchAllUser()
    }, [])
    return (
    <div className="user-management">
        <div className="user-management__header">
            <h1>User Management</h1>
            <div className="user-management__actions">
                <div className="user-management__search">
                    <input
                        type="text"
                        placeholder="Search by ID or Name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="user-management__add-btn" onClick={() => {
                    setAddModal({
                        show: true,
                        type: "add"
                    })}
                }>
                    <i className="fas fa-plus"></i> Create Admin
                </button>
            </div>
        </div>

        <div className="user-management__table">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Group Role</th>
                        <th>Addresses</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((userData) => (
                        <tr key={userData.id}>
                            <td>{userData.id}</td>
                            <td>{userData.name}</td>
                            <td>{userData.email}</td>
                            <td>{userData.Group.name}</td>
                            <td>{userData.address} </td>
                            <td className="action_btn">
                                <button onClick={() => {
                                    setAddModal({
                                        user: userData,
                                        show: true,
                                        type: "edit"
                                    })}
                                } className="action-btn edit">
                                    <MdEdit/>
                                </button>
                                <button onClick={() => setDeleteModal({ show: true, user: userData })} className="action-btn delete">
                                    <MdDelete/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {addModal.show && <AddUserModal onClose={() => setAddModal(false)} fetchAllUser={() => fetchAllUser()} typeUpdate={addModal.type} userData={addModal.user}/>}

        {deleteModal.show && (
            <DeleteUserModal
                user={deleteModal.user}
                onClose={() => setDeleteModal({ show: false, user: null })}
                onConfirm={() => {}}
            />
        )}

        {addressModal.show && (
            <ViewAddressesModal user={addressModal.user} onClose={() => setAddressModal({ show: false, user: null })} />
        )}
    </div>
    )
}

export default UserManagement

