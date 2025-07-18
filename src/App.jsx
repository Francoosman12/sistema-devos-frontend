import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Sales from "./pages/Sales";
import Movements from "./pages/Movements";
import Reports from "./pages/Reports";
import History from "./pages/History";
import Commissions from "./pages/Commissions";
import AddProduct from "./pages/AddProduct";
import ProductList from "./pages/ProductList";
import Inventory from "./pages/Inventory";
import Suppliers from "./pages/Suppliers";
import Labels from "./pages/Labels";
import CreateUser from "./pages/CreateUser";
import Schedules from "./pages/Schedules";
import Attendance from "./pages/Attendance";
import Settings from "./pages/Settings";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Asegura que Bootstrap está presente

const App = () => {
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      return JSON.parse(localStorage.getItem("user")) || null;
    }
    return null;
  });

  // ✅ Mantener sesión activa y verificar usuario al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Guardar usuario en `localStorage` cuando cambia
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user"); // ✅ Eliminar `user` si es `null`
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("user"); // ✅ Eliminar usuario del Local Storage
    setUser(null); // ✅ Limpiar estado del usuario
  };

  return (
    <Router>
      {user && <NavigationBar user={user} setUser={handleLogout} />}{" "}
      {/* ✅ Navbar solo si hay usuario */}
      <Routes>
        {/* ✅ Página de login */}
        <Route path="/login" element={<Login setUser={setUser} />} />

        {/* ✅ Redirigir a `/login` si el usuario no está autenticado */}
        <Route path="/" element={user ? <Sales /> : <Navigate to="/login" />} />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />

        {/* ✅ Solo los administradores pueden acceder a reportes, historial y comisiones */}
        <Route
          path="/sales/movements"
          element={
            user && user.rol === "administrador" ? (
              <Movements />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/sales/reports"
          element={
            user && user.rol === "administrador" ? (
              <Reports />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/sales/history"
          element={
            user && user.rol === "administrador" ? (
              <History />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/sales/commissions"
          element={
            user && user.rol === "administrador" ? (
              <Commissions />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* ✅ Solo los administradores pueden acceder a productos */}
        <Route
          path="/products/add"
          element={
            user && user.rol === "administrador" ? (
              <AddProduct />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/products/list"
          element={
            user && user.rol === "administrador" ? (
              <ProductList />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/products/inventory"
          element={
            user && user.rol === "administrador" ? (
              <Inventory />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/products/suppliers"
          element={
            user && user.rol === "administrador" ? (
              <Suppliers />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/products/labels"
          element={
            user && user.rol === "administrador" ? (
              <Labels />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* ✅ Solo los administradores pueden acceder a usuarios */}
        <Route
          path="/users/create"
          element={
            user && user.rol === "administrador" ? (
              <CreateUser />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/users/schedules"
          element={
            user && user.rol === "administrador" ? (
              <Schedules />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/users/attendance"
          element={
            user && user.rol === "administrador" ? (
              <Attendance />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* ✅ Solo los administradores pueden acceder a configuración */}
        <Route
          path="/settings"
          element={
            user && user.rol === "administrador" ? (
              <Settings />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
