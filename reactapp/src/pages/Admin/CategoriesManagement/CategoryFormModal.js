import { useState, useEffect } from "react"
import "../ModalStyle/Modal.scss"
import { createCategories, updateCategories } from "../../../service/categoryService"
import { toast } from "react-toastify"
const CategoryFormModal = ({ category, onClose, onSubmit, mode = "add", fetchCategories}) => {
	const [name, setName] = useState("")
	const [description, setDescription] = useState("")
	useEffect(() => {
		if (mode === "edit" && category) {
			setName(category.name)
			setDescription(category.description)
		}
	}, [category, mode])

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (mode === "edit") {
			const response = await updateCategories({id: category.id, name: name, description: description})
			if(response){
				if(response.status === 1){
					toast.success(response.message)
					fetchCategories()
					onClose()
					return
				}
			}
			toast.error(response.message)
		} else {
			const response = await createCategories({name: name, description: description})
			if(response){
				if(response.status === 1){
					toast.success(response.message)
					fetchCategories()
					onClose()
					return
				}
			}
			toast.error(response.message)
		}
		onClose()
	}

	return (
		<div className="modal-overlay">
			<div className="modal-content modal-category">
				<div className="modal-header">
					<div className="modal-icon">
						<i className={`fas fa-${mode === "add" ? "folder-plus" : "edit"}`}></i>
					</div>
					<h2>{mode === "add" ? "Add Category" : "Edit Category"}</h2>
				</div>
				<form onSubmit={handleSubmit}>
					<div className="modal-body">
						<div className="form-group">
							<label>Name</label>
							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
								placeholder="Enter category name"
							/>
						</div>
						<div className="form-group">
							<label>Description</label>
							<input
								type="text"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								required
								placeholder="Enter category Description"
							/>
						</div>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" onClick={onClose}>
							Cancel
						</button>
						<button type="submit" className="btn btn-primary" onClick={(e) => handleSubmit(e)}>
							{mode === "add" ? "Add" : "Update"}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default CategoryFormModal

