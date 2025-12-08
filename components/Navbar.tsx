import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Logo from './Logo';
import { Menu, X, Search, User, Lock } from 'lucide-react';

const Navbar: React.FC = () => {
  const { data, isAdmin, isStaff, logout } = useAppContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="w-full shadow-md z-50 relative bg-white">
      {/* Top Bar */}
      <div className="bg-ice-blue text-white text-xs py-2 px-4">
        <div className="container mx-auto flex justify-end items-center gap-6">
          <Link to="#" className="hover:text-ice-light transition">Parents</Link>
          <Link to="#" className="hover:text-ice-light transition">Students</Link>
          <Link to="#" className="hover:text-ice-light transition">Alumni</Link>
          <div className="flex items-center gap-2 border-l border-blue-800 pl-4">
            <button onClick={() => navigate('/staff')} className="flex items-center gap-1 hover:text-ice-light">
               <User size={12} /> {isStaff ? 'Staff Portal' : 'Staff Login'}
            </button>
            <button onClick={() => navigate('/admin')} className="flex items-center gap-1 hover:text-ice-light ml-4">
               <Lock size={12} /> {isAdmin ? 'Admin' : 'Admin Login'}
            </button>
            {(isAdmin || isStaff) && (
              <button onClick={logout} className="ml-4 hover:text-red-300">Logout</button>
            )}
          </div>
          <div className="flex items-center bg-blue-900 rounded px-2 py-0.5 ml-4">
            <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none outline-none text-white text-xs w-24 placeholder-blue-300"
            />
            <Search size={12} />
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/">
          <Logo />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-6">
          {data.navItems.map((item) => (
            <Link 
                key={item.id} 
                to={item.path} 
                className="text-sm font-semibold text-gray-700 hover:text-ice-blue uppercase tracking-wide transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button 
            className="lg:hidden text-ice-blue"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full left-0 top-full shadow-lg p-4 flex flex-col gap-4">
          {data.navItems.map((item) => (
            <Link 
                key={item.id} 
                to={item.path} 
                className="text-gray-800 font-semibold py-2 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;