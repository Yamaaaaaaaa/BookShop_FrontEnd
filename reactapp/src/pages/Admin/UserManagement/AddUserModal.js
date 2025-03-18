import { useEffect, useState } from "react"
import "../BooksManagement/Modal.scss"
import { MdBook } from "react-icons/md"
import { addUserClientService, getAllGroup, updateUserClientService } from "../../../service/authService"
import { toast } from "react-toastify"
const AddUserModal = ({ onClose, fetchAllUser, typeUpdate, userData }) => {	
	const [formData, setFormData] = useState({})
	const [groupData, setGroupData] = useState([])
	const fetchAllGroup = async () => {
		const response = await getAllGroup(formData)
		
		if(response && +response.status === 1) {
			toast.success(response.message)
			setGroupData(response.data)
			
		}else {
			toast.error(response.message);
		}
	}
	useEffect(() => {
		if(typeUpdate === "add"){
			setFormData({
				name: "",
				email: "",
				phone: "",
				password: "",
				status: 'enable',
				groupId: "1",
				groupName: "",
				address: "",
			})
		}
		else{
			setFormData({
				id: userData.id,
				name: userData.name,
				email: userData.email,
				phone: userData.phone,
				password: userData.password,
				status: 'enable',
				groupId: userData.Group.id,
				groupName: userData.Group.name,
				address: userData.address
			})
		}
		fetchAllGroup()
	}, [userData])
	

	const handleSubmit = async (e) => {
		e.preventDefault()
		if(typeUpdate === "add"){
			try {
				const response = await addUserClientService(formData)
				
				if(response && +response.data.status === 1) {
					toast.success(response.data.message)
					onClose()
					fetchAllUser()
				}else {
					toast.error(response.data.message);
				}
			} catch (error) {
				console.error('Login error:', error);
				toast.error('An error occurred. Please try again.');
			} 
		}else if(typeUpdate === "edit"){
			try {
				const response = await updateUserClientService(formData)
				
				if(response && +response.status === 1) {
					toast.success(response.message)
					onClose()
					fetchAllUser()
				}else {
					toast.error(response.message);
				}
			} catch (error) {
				toast.error('An error occurred. Please try again.');
			} 
		}
		
	}

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}
	const handleGroupChange = (e) => {
		const selectedGroupId = e.target.value;
		// console.log("Selected Group ID:", selectedGroupId);
		// console.log("All groups:", groupData);
	
		const selectedGroup = groupData.find(group => String(group.id) === String(selectedGroupId));
		
		if (!selectedGroup) {
			console.error("Group not found!");
			return;
		}
	
		setFormData({
			...formData,
			groupId: selectedGroup.id,
			groupName: selectedGroup.name,
		});
	
		console.log("Selected Group:", selectedGroup);		
	};
	return (
		<div className="modal-overlay">
			<div className="modal-content modal-adduser">
				<div className="modal-header">
					<div className="modal-icon">
						<MdBook size={24} />
					</div>
					<h2>Create Admin</h2>
				</div>
				<form onSubmit={handleSubmit}>
					<div className="modal-body">
						<div className="form-group">
							<label>Name</label>
							<input
								type="text"
								name="name"
								value={formData.name}
								onChange={handleChange}
								required
								placeholder="Enter name"
							/>
						</div>
						<div className="form-group">
							<label>Email</label>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								required
								placeholder="Enter email"
							/>
						</div>
						<div className="form-group">
							<label>Address</label>
							<input
								type="text"
								name="address"
								value={formData.address}
								onChange={handleChange}
								required
								placeholder="Enter address"
							/>
						</div>
						<div className="form-group">
							<label>Group</label>
							<select name="groupId" value={formData.groupId} onChange={handleGroupChange} required>
								<option value="">Select Group</option>
								{groupData.map(group => (
									<option key={group.id} value={group.id}>
										{group.name}
									</option>
								))}
							</select>
						</div>
						<div className="form-row">
							<div className="form-group">
								<label>Phone Number</label>
								<input
									type="text"
									name="phone"
									value={formData.phone}
									onChange={handleChange}
									required
									placeholder="Enter phone"
								/>
							</div>
							<div className="form-group">
								<label>Password</label>
								<input
									type="password"
									name="password"
									value={formData.password}
									onChange={handleChange}
									required
									placeholder="Enter password"
								/>
							</div>
						</div>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" onClick={onClose}>
							Cancel
						</button>
						<button type="submit" className="btn btn-primary">
							Add
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default AddUserModal

