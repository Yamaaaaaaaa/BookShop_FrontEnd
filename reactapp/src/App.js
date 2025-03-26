import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import ShopRoute from './routes/ShopRoute';
import AdminRoute from './routes/AdminRoute';
import { ToastContainer } from 'react-toastify';

export default function App() {
  return (
    <Router>
      <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          />
      <Routes>
        <Route path="/*" element={<ShopRoute/>} />
        <Route path="/admin/*" element={<AdminRoute/>} />
      </Routes>
    </Router>
  );
}