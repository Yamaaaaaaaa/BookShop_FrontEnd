import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import ShopRoute from './routes/ShopRoute';
import AdminRoute from './routes/AdminRoute';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<ShopRoute/>} />
        <Route path="/admin/*" element={<AdminRoute/>} />
      </Routes>
    </Router>
  );
}