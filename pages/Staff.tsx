import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { BookOpen, Users, Calendar, FileText, Bell } from 'lucide-react';

const Staff: React.FC = () => {
  const { isStaff, login, logout } = useAppContext();
  const [password, setPassword] = useState('');

  if (!isStaff) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-lg max-w-sm w-full border-t-4 border-ice-gold">
          <h1 className="text-2xl font-serif text-ice-blue mb-4 font-bold">Staff Portal</h1>
          <p className="text-sm text-gray-500 mb-6">Secure access for faculty members.</p>
          <input
            type="password"
            placeholder="Enter Staff Password"
            className="w-full border p-2 mb-2 rounded focus:outline-none focus:ring-2 focus:ring-ice-gold"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    if(password === 'staff') login('staff');
                    else alert('Incorrect password.');
                }
            }}
          />
           <p className="text-xs text-gray-400 mb-4">Hint: Default password is <strong>staff</strong></p>
          <button
            onClick={() => {
                if(password === 'staff') login('staff');
                else alert('Incorrect password. Try "staff"');
            }}
            className="w-full bg-ice-gold text-white py-2 rounded hover:bg-yellow-600 transition font-semibold"
          >
            Access Portal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <span className="font-serif font-bold text-ice-blue text-xl">IceAlan Staff Portal</span>
        <div className="flex items-center gap-4">
            <button className="relative">
                <Bell className="text-gray-500 hover:text-ice-blue transition" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">3</span>
            </button>
            <div className="w-8 h-8 bg-ice-blue/10 rounded-full flex items-center justify-center text-ice-blue font-bold text-xs">TR</div>
            <button onClick={logout} className="text-sm text-gray-600 hover:text-red-500 transition font-medium">Sign Out</button>
        </div>
      </nav>

      <div className="container mx-auto p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome back, Faculty.</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded shadow hover:shadow-lg transition cursor-pointer border-l-4 border-ice-blue group">
                <div className="flex justify-between items-start mb-4">
                    <BookOpen className="text-ice-blue group-hover:scale-110 transition" size={32} />
                    <span className="text-2xl font-bold text-gray-800">5</span>
                </div>
                <p className="text-gray-600 font-medium">Active Classes</p>
            </div>
            <div className="bg-white p-6 rounded shadow hover:shadow-lg transition cursor-pointer border-l-4 border-ice-gold group">
                <div className="flex justify-between items-start mb-4">
                    <Users className="text-ice-gold group-hover:scale-110 transition" size={32} />
                    <span className="text-2xl font-bold text-gray-800">142</span>
                </div>
                <p className="text-gray-600 font-medium">Total Students</p>
            </div>
            <div className="bg-white p-6 rounded shadow hover:shadow-lg transition cursor-pointer border-l-4 border-green-500 group">
                <div className="flex justify-between items-start mb-4">
                    <FileText className="text-green-500 group-hover:scale-110 transition" size={32} />
                    <span className="text-2xl font-bold text-gray-800">12</span>
                </div>
                <p className="text-gray-600 font-medium">Pending Reports</p>
            </div>
            <div className="bg-white p-6 rounded shadow hover:shadow-lg transition cursor-pointer border-l-4 border-purple-500 group">
                <div className="flex justify-between items-start mb-4">
                    <Calendar className="text-purple-500 group-hover:scale-110 transition" size={32} />
                    <span className="text-2xl font-bold text-gray-800">Today</span>
                </div>
                <p className="text-gray-600 font-medium">Staff Meeting 14:00</p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded shadow p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg text-gray-800">Today's Schedule</h3>
                    <span className="text-xs text-gray-500 font-mono">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="space-y-4">
                    <div className="flex gap-4 p-3 border-b border-gray-100 items-center hover:bg-gray-50 transition rounded">
                        <span className="w-16 text-sm font-bold text-gray-500">08:45</span>
                        <div className="bg-blue-50 p-2 rounded flex-1 border-l-2 border-ice-blue">
                            <p className="font-bold text-ice-blue">Year 10 Mathematics</p>
                            <p className="text-xs text-gray-500">Room 3B • 24 Students</p>
                        </div>
                    </div>
                    <div className="flex gap-4 p-3 border-b border-gray-100 items-center hover:bg-gray-50 transition rounded">
                        <span className="w-16 text-sm font-bold text-gray-500">10:30</span>
                        <div className="bg-green-50 p-2 rounded flex-1 border-l-2 border-green-500">
                            <p className="font-bold text-green-800">Sixth Form Tutor Group</p>
                            <p className="text-xs text-gray-500">Common Room • 12 Students</p>
                        </div>
                    </div>
                     <div className="flex gap-4 p-3 border-b border-gray-100 items-center hover:bg-gray-50 transition rounded">
                        <span className="w-16 text-sm font-bold text-gray-500">13:15</span>
                        <div className="bg-gray-50 p-2 rounded flex-1 border-l-2 border-gray-400">
                            <p className="font-bold text-gray-700">Lunch Duty</p>
                            <p className="text-xs text-gray-500">Cafeteria</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded shadow p-6">
                 <h3 className="font-bold text-lg mb-4 text-gray-800">Notices</h3>
                 <ul className="space-y-4 text-sm">
                    <li className="p-3 bg-yellow-50 rounded text-yellow-800 border border-yellow-100">
                        <strong>Exam Deadline:</strong> Grades for Year 11 Mock Exams are due by Friday.
                    </li>
                    <li className="p-3 bg-blue-50 rounded text-blue-800 border border-blue-100">
                        <strong>New Policy:</strong> Updated safeguarding protocols have been emailed to all staff.
                    </li>
                    <li className="p-3 bg-red-50 rounded text-red-800 border border-red-100">
                        <strong>Maintenance:</strong> Science Block heating maintenance scheduled for tomorrow.
                    </li>
                 </ul>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Staff;