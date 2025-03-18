import React from "react";
import "./AdminDashBoard.scss";
import { FaBook, FaUsers, FaDollarSign, FaChartLine } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
        {
            label: "Sales Over Time",
            data: [100, 200, 150, 300, 250, 400],
            borderColor: "#4A5D47",
            backgroundColor: "rgba(74, 93, 71, 0.2)",
        },
    ],
};

const AdminDashBoard = () => {
    return (
        <div className="admin-dashboard">
            <h1 className="dashboard-title">Admin Dashboard</h1>
            <div className="dashboard-stats">
                <div className="stat-card">
                    <FaBook className="icon" />
                    <h2>Books</h2>
                    <p>150</p>
                </div>
                <div className="stat-card">
                    <FaUsers className="icon" />
                    <h2>Users</h2>
                    <p>1200</p>
                </div>
                <div className="stat-card">
                    <FaDollarSign className="icon" />
                    <h2>Revenue</h2>
                    <p>$10,500</p>
                </div>
                <div className="stat-card">
                    <FaChartLine className="icon" />
                    <h2>Sales</h2>
                    <p>320</p>
                </div>
            </div>
            <div className="chart-container">
                <h2>Sales Trend</h2>
                <Line data={data} />
            </div>
        </div>
    );
};

export default AdminDashBoard