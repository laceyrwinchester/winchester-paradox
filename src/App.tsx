import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { DataProvider } from './context/DataContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import ItemDetail from './pages/ItemDetail'
import Admin from './pages/Admin'
import AdminDashboard from './components/admin/AdminDashboard'
import ParticleTrail from './components/ParticleTrail'

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="min-h-screen bg-[#050505] text-gray-200 relative">
            {/* COSMIC BACKGROUND */}
            <div className="cosmic-bg">
              <div className="nebula nebula-1"></div>
              <div className="nebula nebula-2"></div>
              <div className="nebula nebula-3"></div>
            </div>
            <div className="stars"></div>
            
            {/* PARTICLE TRAIL - FOLLOWS MOUSE */}
            <ParticleTrail />
            
            <Navbar />
            <main className="main-content relative z-10">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/item/:id" element={<ItemDetail />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Routes>
            </main>
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  )
}

export default App
