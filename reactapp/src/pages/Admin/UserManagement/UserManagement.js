import { useEffect, useState } from "react"
import AddUserModal from "./AddUserModal"
import DeleteUserModal from "./DeleteUserModal"
import ViewAddressesModal from "./ViewAddressesModal"
import "./UserManagement.scss"
import { MdAdd, MdEdit, MdDelete, MdVisibility } from 'react-icons/md';
import { IoLocation } from "react-icons/io5";
import { getAllUser } from "../../../service/userService"
import { toast } from "react-toastify"

const mockUsers = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        username: "johndoe",
        addresses: ["123 Main St, New York, NY 10001", "456 Park Ave, New York, NY 10022"],
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        username: "janesmith",
        addresses: ["789 Broadway, New York, NY 10003"],
    },
    {
        id: 3,
        name: "Bob Johnson",
        email: "bob@example.com",
        username: "bobjohnson",
        addresses: ["321 5th Ave, New York, NY 10016", "654 Madison Ave, New York, NY 10022"],
    },
]
  
  
const UserManagement = () => {
    const [users, setUsers] = useState(mockUsers)
    const [userData, setUserData] = useState([])
    const [addModal, setAddModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState({ show: false, user: null })
    const [addressModal, setAddressModal] = useState({ show: false, user: null })
    const [searchTerm, setSearchTerm] = useState("")

    const handleAdd = (newUser) => {
        const lastId = Math.max(...users.map((user) => user.id))
        setUsers([...users, { ...newUser, id: lastId + 1 }])
        setAddModal(false)
    }

    const handleDelete = (id) => {
        setUsers(users.filter((user) => user.id !== id))
        setDeleteModal({ show: false, user: null })
    }

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
                <button className="user-management__add-btn" onClick={() => setAddModal(true)}>
                    <i className="fas fa-plus"></i> Add User
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
                    {filteredUsers.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.Group.name}</td>
                            <td>{user.address} </td>
                            <td className="action_btn">
                                <button onClick={() => setDeleteModal({ show: true, user })} className="action-btn edit">
                                    <MdEdit/>
                                </button>
                                <button onClick={() => setDeleteModal({ show: true, user })} className="action-btn delete">
                                    <MdDelete/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {addModal && <AddUserModal onClose={() => setAddModal(false)} onSubmit={handleAdd} />}

        {deleteModal.show && (
            <DeleteUserModal
                user={deleteModal.user}
                onClose={() => setDeleteModal({ show: false, user: null })}
                onConfirm={() => handleDelete(deleteModal.user.id)}
            />
        )}

        {addressModal.show && (
            <ViewAddressesModal user={addressModal.user} onClose={() => setAddressModal({ show: false, user: null })} />
        )}
    </div>
    )
}

export default UserManagement

