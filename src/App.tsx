import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import ProblemDetail from './pages/ProblemDetail';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen flex flex-col font-sans bg-slate-950 text-slate-200">
          <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
          
          <div className="flex flex-1 overflow-hidden relative">
            {/* Sidebar Overlay */}
            {isSidebarOpen && (
              <div 
                className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                onClick={() => setIsSidebarOpen(false)}
              />
            )}

            {/* Sidebar Drawer */}
            <Sidebar 
              className={`
                fixed inset-y-0 left-0 z-50 w-72 transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
              `}
              onClose={() => setIsSidebarOpen(false)}
            />

            {/* Main Content - Always Full Width */}
            <main className="flex-1 overflow-y-auto">
              <div className="min-h-[calc(100vh-64px)] flex flex-col">
                <div className="flex-1">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/problems/:id" element={<ProblemDetail />} />
                  </Routes>
                </div>
                <Footer />
              </div>
            </main>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
