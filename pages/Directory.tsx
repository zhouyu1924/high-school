import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Mail, Search } from 'lucide-react';

const Directory: React.FC = () => {
  const { data } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('All');

  const departments = ['All', ...Array.from(new Set(data.faculty.map(f => f.department)))];

  const filteredFaculty = data.faculty.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          member.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDept === 'All' || member.department === filterDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-ice-blue text-white py-16">
        <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Faculty & Staff</h1>
            <p className="text-blue-200 text-lg max-w-2xl">Meet the dedicated team of educators and professionals shaping the future at IceAlan High School.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        {/* Search Bar */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                    type="text" 
                    placeholder="Search by name or role..." 
                    className="w-full pl-10 pr-4 py-3 border rounded focus:ring-2 focus:ring-ice-blue outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <select 
                className="w-full md:w-64 p-3 border rounded focus:ring-2 focus:ring-ice-blue outline-none bg-white"
                value={filterDept}
                onChange={(e) => setFilterDept(e.target.value)}
            >
                {departments.map(dept => (
                    <option key={dept} value={dept}>{dept} Department</option>
                ))}
            </select>
        </div>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFaculty.map(member => (
                <div key={member.id} className="bg-white rounded shadow hover:shadow-xl transition duration-300 overflow-hidden group">
                    <div className="h-64 overflow-hidden relative bg-gray-200">
                        {member.image ? (
                             <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                        )}
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
                            <span className="text-white text-xs font-bold uppercase tracking-wider bg-ice-gold px-2 py-0.5 rounded-sm">
                                {member.department}
                            </span>
                        </div>
                    </div>
                    <div className="p-6">
                        <h3 className="text-xl font-serif font-bold text-ice-blue">{member.name}</h3>
                        <p className="text-gray-600 font-medium text-sm mb-3 uppercase tracking-wide">{member.role}</p>
                        <p className="text-gray-500 text-sm mb-4 line-clamp-3">{member.bio}</p>
                        
                        <div className="pt-4 border-t border-gray-100">
                            <a href={`mailto:${member.email}`} className="flex items-center gap-2 text-ice-blue hover:text-ice-gold text-sm font-semibold transition">
                                <Mail size={16} />
                                {member.email}
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        
        {filteredFaculty.length === 0 && (
            <div className="text-center py-20 text-gray-500">
                <p className="text-xl">No faculty members found matching your search.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Directory;