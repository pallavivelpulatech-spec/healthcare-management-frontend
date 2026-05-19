import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"
import "./App.css"

import Home from "./pages/Home"
import Doctors from "./pages/Doctors"
import Patients from "./pages/Patients"
import Appointments from "./pages/Appointments"
import Login from "./pages/Login"

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <h2>Healthcare System</h2>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/doctors">Doctors</Link>
          <Link to="/patients">Patients</Link>
          <Link to="/appointments">Appointments</Link>
          <Link to="/login">Login</Link>
          <button
            className="logout-button"
            onClick={() => {
              localStorage.removeItem("token")
              window.location.href = "/login"
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/doctors"
            element={
              <ProtectedRoute>
                <Doctors />
              </ProtectedRoute>
            }
          />

          <Route
            path="/patients"
            element={
              <ProtectedRoute>
                <Patients />
              </ProtectedRoute>
            }
          />

          <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <Appointments />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App