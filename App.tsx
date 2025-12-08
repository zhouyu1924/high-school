import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Staff from './pages/Staff';
import Directory from './pages/Directory';
import GenericPage from './pages/GenericPage';
import NewsPage from './pages/NewsPage';
import { AppProvider } from './context/AppContext';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route path="/staff" element={<Staff />} />
            
            {/* Public Routes */}
            <Route path="*" element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/directory" element={<Directory />} />
                    
                    {/* Dynamic Pages */}
                    <Route path="/about" element={<GenericPage pageKey="about" />} />
                    <Route path="/admissions" element={<GenericPage pageKey="admissions" />} />
                    <Route path="/academics" element={<GenericPage pageKey="academics" />} />
                    <Route path="/student-life" element={<GenericPage pageKey="student-life" />} />
                    <Route path="/support" element={<GenericPage pageKey="support" />} />
                    
                    {/* Specialized Pages */}
                    <Route path="/news" element={<NewsPage />} />
                    
                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>
                <Footer />
              </>
            } />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;