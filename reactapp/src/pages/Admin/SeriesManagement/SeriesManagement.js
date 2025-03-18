import { useEffect, useState } from "react"
import SeriesFormModal from "./SeriesFormModal"
import DeleteSeriesModal from "./DeleteSeriesModal"
import "./SeriesManagement.scss"
import { MdDelete, MdEdit } from "react-icons/md"
import { toast } from "react-toastify"
import { getAllSeries } from "../../../service/serieService"

const SeriesManagement = () => {
    const [seriesData, setSeriesData] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [formModal, setFormModal] = useState({ show: false, mode: "add", series: null })
    const [deleteModal, setDeleteModal] = useState({ show: false, series: null })

    const handleAdd = (newSeries) => {
        
    }

    const handleEdit = (editedSeries) => {

    }

    const handleDelete = (id) => {

    }

    const filteredSeries = seriesData.filter(
        (series) => series.name.toLowerCase().includes(searchTerm.toLowerCase()) || series.id.toString().includes(searchTerm),
    )
    
    const fetchSeries = async () => {
        try {
            const listSeries = await getAllSeries();
            if (listSeries && listSeries.status === 1) {
                setSeriesData(listSeries.data);
                console.log("All Series: ", listSeries.data);
                
                toast.success(listSeries.message)
                return
            }
            else toast.error(listSeries.message)
        } catch (error) {
            toast.error("Error fetching series:", error);
        }
    };
    
    useEffect(() => {
        fetchSeries()
    }, [])
    
    return (
    <div className="series-management">
        <div className="series-management__header">
            <h1>Series Management</h1>
            <div className="series-management__actions">
                <div className="series-management__search">
                    <input
                    type="text"
                    placeholder="Search by Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button
                    className="series-management__add-btn"
                    onClick={() => setFormModal({ show: true, mode: "add", series: null })}
                >
                    <i className="fas fa-plus"></i> Add Series
                </button>
            </div>
        </div>

        <div className="series-management__table">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSeries.map((series) => (
                        <tr key={series.id}>
                            <td>{series.id}</td>
                            <td>{series.name}</td>
                            <td>{series.description}</td>
                            <td className="action-cell">
                            <button
                                className="action-btn edit"
                                onClick={() =>
                                setFormModal({
                                    show: true,
                                    mode: "edit",
                                    series,
                                })
                                }
                            >
                                <MdEdit />
                            </button>
                            <button className="action-btn delete" onClick={() => setDeleteModal({ show: true, series })}>
                                <MdDelete />
                            </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {formModal.show && (
            <SeriesFormModal
                mode={formModal.mode}
                series={formModal.series}
                onClose={() => setFormModal({ show: false, mode: "add", series: null })}
                onSubmit={formModal.mode === "add" ? handleAdd : handleEdit}
                fetchSeries={fetchSeries}
            />
        )}

        {deleteModal.show && (
            <DeleteSeriesModal
            series={deleteModal.series}
            onClose={() => setDeleteModal({ show: false, series: null })}
            onConfirm={() => handleDelete(deleteModal.series.id)}
            fetchSeries={fetchSeries}
            />
        )}
    </div>
    )
}

export default SeriesManagement
