import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { generateSchoolContent, generateSchoolImage } from '../services/aiService';
import { Save, Plus, Trash, Wand2, Key, Image as ImageIcon, Loader2, Users, Settings, Menu as MenuIcon, Edit2, Server, FileText, Newspaper } from 'lucide-react';
import { NavItem, FacultyMember, NewsItem } from '../types';

const Admin: React.FC = () => {
  const { data, updateData, isAdmin, login, logout } = useAppContext();
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'general' | 'navigation' | 'faculty' | 'pages' | 'news'>('general');
  
  // AI States
  const [genLoading, setGenLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [generatedImgUrl, setGeneratedImgUrl] = useState<string | null>(null);

  // Editing States
  const [editingFaculty, setEditingFaculty] = useState<FacultyMember | null>(null);
  const [selectedPageKey, setSelectedPageKey] = useState<string>('about');
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-lg max-w-sm w-full border-t-4 border-ice-blue">
          <h1 className="text-2xl font-serif text-ice-blue mb-4 font-bold">Admin Access</h1>
          <p className="text-sm text-gray-500 mb-6">Restricted area for school administrators.</p>
          <input
            type="password"
            placeholder="Enter Admin Password"
            className="w-full border p-2 mb-2 rounded focus:outline-none focus:ring-2 focus:ring-ice-blue"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    if(password === 'admin') login('admin');
                    else alert('Incorrect password.');
                }
            }}
          />
          <p className="text-xs text-gray-400 mb-4">Hint: Default password is <strong>admin</strong></p>
          <button
            onClick={() => {
                if(password === 'admin') login('admin');
                else alert('Incorrect password. Try "admin"');
            }}
            className="w-full bg-ice-blue text-white py-2 rounded hover:bg-blue-800 transition font-semibold"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  // --- Handlers ---

  const handleNavItemChange = (index: number, field: keyof NavItem, value: string) => {
    const newItems = [...data.navItems];
    newItems[index] = { ...newItems[index], [field]: value };
    updateData({ navItems: newItems });
  };

  const addNavItem = () => {
    const newItem: NavItem = { id: Date.now().toString(), label: 'New Page', path: '/' };
    updateData({ navItems: [...data.navItems, newItem] });
  };

  const removeNavItem = (index: number) => {
    const newItems = data.navItems.filter((_, i) => i !== index);
    updateData({ navItems: newItems });
  };

  const handleGenerateMotto = async () => {
    setGenLoading(true);
    try {
        const result = await generateSchoolContent(data.apiKey, "Generate a prestigious, 3-word Latin-style motto for a British High School named IceAlan, with English translation.");
        updateData({ motto: result.trim() });
    } catch (e) {
        alert("Failed to generate. Check API Key.");
    } finally {
        setGenLoading(false);
    }
  };

  const handleGenerateLogo = async () => {
      setImgLoading(true);
      try {
          const result = await generateSchoolImage(data.apiKey, "A modern, prestigious high school crest for IceAlan High School. Royal blue and gold colors, minimal vector style, white background. Shield shape containing a book and a snowflake.");
          if (result) {
              setGeneratedImgUrl(result);
          } else {
              alert("Image generation returned no result.");
          }
      } catch (e) {
          alert("Failed to generate image.");
      } finally {
          setImgLoading(false);
      }
  };

  // Faculty Handlers
  const handleEditFaculty = (member: FacultyMember) => {
      setEditingFaculty(member);
  };

  const handleDeleteFaculty = (id: string) => {
      if(window.confirm('Delete this faculty member?')) {
          const newFaculty = data.faculty.filter(f => f.id !== id);
          updateData({ faculty: newFaculty });
      }
  };

  const handleSaveFaculty = () => {
      if (!editingFaculty) return;
      const exists = data.faculty.find(f => f.id === editingFaculty.id);
      let newFacultyList;
      if (exists) {
          newFacultyList = data.faculty.map(f => f.id === editingFaculty.id ? editingFaculty : f);
      } else {
          newFacultyList = [...data.faculty, editingFaculty];
      }
      updateData({ faculty: newFacultyList });
      setEditingFaculty(null);
  };

  const createNewFaculty = () => {
      setEditingFaculty({
          id: Date.now().toString(),
          name: '',
          role: '',
          department: '',
          email: '',
          image: '',
          bio: ''
      });
  };

  // Pages Handler
  const handlePageChange = (field: 'title' | 'content' | 'heroImage', value: string) => {
      if (!data.pages[selectedPageKey]) return;
      const updatedPage = { ...data.pages[selectedPageKey], [field]: value };
      const updatedPages = { ...data.pages, [selectedPageKey]: updatedPage };
      updateData({ pages: updatedPages });
  };

  // News Handlers
  const handleEditNews = (item: NewsItem) => setEditingNews(item);
  const createNews = () => setEditingNews({ id: Date.now().toString(), title: '', date: '', excerpt: '', image: '' });
  const handleDeleteNews = (id: string) => {
      if(window.confirm('Delete this news item?')) {
          updateData({ news: data.news.filter(n => n.id !== id) });
      }
  };
  const handleSaveNews = () => {
      if (!editingNews) return;
      const exists = data.news.find(n => n.id === editingNews.id);
      let newList;
      if (exists) newList = data.news.map(n => n.id === editingNews.id ? editingNews : n);
      else newList = [...data.news, editingNews];
      updateData({ news: newList });
      setEditingNews(null);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row max-h-screen">
      
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-ice-blue text-white flex-shrink-0 flex flex-col">
          <div className="p-6 border-b border-blue-900">
              <h1 className="text-xl font-serif font-bold">Admin Panel</h1>
              <p className="text-xs text-blue-300">IceAlan CMS v2.0</p>
          </div>
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              <button onClick={() => setActiveTab('general')} className={`w-full flex items-center gap-3 px-4 py-3 rounded text-left transition ${activeTab === 'general' ? 'bg-blue-800 text-white' : 'text-blue-200 hover:bg-blue-900'}`}>
                  <Settings size={18} /> General & AI
              </button>
              <button onClick={() => setActiveTab('navigation')} className={`w-full flex items-center gap-3 px-4 py-3 rounded text-left transition ${activeTab === 'navigation' ? 'bg-blue-800 text-white' : 'text-blue-200 hover:bg-blue-900'}`}>
                  <MenuIcon size={18} /> Navigation
              </button>
              <button onClick={() => setActiveTab('pages')} className={`w-full flex items-center gap-3 px-4 py-3 rounded text-left transition ${activeTab === 'pages' ? 'bg-blue-800 text-white' : 'text-blue-200 hover:bg-blue-900'}`}>
                  <FileText size={18} /> Pages Content
              </button>
              <button onClick={() => setActiveTab('news')} className={`w-full flex items-center gap-3 px-4 py-3 rounded text-left transition ${activeTab === 'news' ? 'bg-blue-800 text-white' : 'text-blue-200 hover:bg-blue-900'}`}>
                  <Newspaper size={18} /> News & Events
              </button>
              <button onClick={() => setActiveTab('faculty')} className={`w-full flex items-center gap-3 px-4 py-3 rounded text-left transition ${activeTab === 'faculty' ? 'bg-blue-800 text-white' : 'text-blue-200 hover:bg-blue-900'}`}>
                  <Users size={18} /> Faculty & Staff
              </button>
          </nav>
          <div className="p-4 border-t border-blue-900">
             <button onClick={logout} className="w-full text-center text-sm text-red-300 hover:text-white">Logout</button>
          </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
            
            {/* API Key Banner */}
            <div className="bg-white p-4 rounded shadow-sm border border-gray-200 mb-8 flex items-center gap-4">
                <Key size={20} className="text-ice-gold flex-shrink-0" />
                <div className="flex-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Google GenAI API Key</label>
                    <input 
                        type="password" 
                        value={data.apiKey} 
                        onChange={(e) => updateData({ apiKey: e.target.value })}
                        placeholder="Enter API Key for AI features"
                        className="w-full bg-transparent border-none focus:ring-0 text-gray-800 font-mono text-sm h-6 p-0"
                    />
                </div>
            </div>

            {/* TAB: GENERAL */}
            {activeTab === 'general' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">School Identity</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2 text-gray-600">School Name</label>
                            <input value={data.name} onChange={(e) => updateData({ name: e.target.value })} className="w-full border p-2 rounded focus:ring-2 focus:ring-ice-blue focus:outline-none" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2 text-gray-600">Motto</label>
                            <div className="flex gap-2">
                                <input value={data.motto} onChange={(e) => updateData({ motto: e.target.value })} className="w-full border p-2 rounded focus:ring-2 focus:ring-ice-blue focus:outline-none" />
                                <button onClick={handleGenerateMotto} disabled={genLoading} className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700 disabled:opacity-50 transition">
                                    {genLoading ? <Loader2 className="animate-spin" /> : <Wand2 size={20} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Logo Generator</h2>
                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-8 rounded mb-4 min-h-[150px] bg-gray-50">
                            {generatedImgUrl ? (
                                <img src={generatedImgUrl} alt="Generated Logo" className="w-32 h-32 object-contain" />
                            ) : (
                                <p className="text-gray-400 text-sm">No generated logo yet</p>
                            )}
                        </div>
                        <button onClick={handleGenerateLogo} disabled={imgLoading} className="w-full bg-ice-blue text-white py-2 rounded flex items-center justify-center gap-2 hover:bg-blue-800 disabled:opacity-50 transition font-semibold">
                            {imgLoading ? <Loader2 className="animate-spin" /> : <ImageIcon size={18} />}
                            Generate New Crest
                        </button>
                    </div>
                </div>
            )}

            {/* TAB: NAVIGATION */}
            {activeTab === 'navigation' && (
                <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Navigation Menu</h2>
                            <p className="text-xs text-gray-500">Edit the top directory bar items</p>
                        </div>
                        <button onClick={addNavItem} className="flex items-center gap-1 text-sm bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition font-semibold">
                            <Plus size={16} /> Add Item
                        </button>
                    </div>
                    <div className="space-y-4">
                        {data.navItems.map((item, index) => (
                        <div key={item.id} className="flex gap-4 items-center bg-gray-50 p-3 rounded border border-gray-200">
                            <span className="text-gray-400 font-mono w-6 text-center">{index + 1}</span>
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input value={item.label} onChange={(e) => handleNavItemChange(index, 'label', e.target.value)} className="border p-2 rounded text-sm focus:ring-2 focus:ring-ice-blue focus:outline-none" placeholder="Label" />
                                <input value={item.path} onChange={(e) => handleNavItemChange(index, 'path', e.target.value)} className="border p-2 rounded text-sm text-gray-600 font-mono focus:ring-2 focus:ring-ice-blue focus:outline-none" placeholder="Path" />
                            </div>
                            <button onClick={() => removeNavItem(index)} className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded transition">
                                <Trash size={18} />
                            </button>
                        </div>
                        ))}
                    </div>
                </div>
            )}

            {/* TAB: PAGES CONTENT */}
            {activeTab === 'pages' && (
                <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
                    <div className="mb-6 border-b pb-4">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Page Content</h2>
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {Object.keys(data.pages).map(key => (
                                <button 
                                    key={key} 
                                    onClick={() => setSelectedPageKey(key)}
                                    className={`px-4 py-2 rounded text-sm font-semibold capitalize whitespace-nowrap ${selectedPageKey === key ? 'bg-ice-blue text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                >
                                    {key.replace('-', ' ')}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    {data.pages[selectedPageKey] && (
                        <div className="space-y-4 animate-in fade-in duration-300">
                             <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Page Title</label>
                                <input 
                                    className="w-full border p-2 rounded focus:ring-2 focus:ring-ice-blue outline-none" 
                                    value={data.pages[selectedPageKey].title}
                                    onChange={(e) => handlePageChange('title', e.target.value)}
                                />
                             </div>
                             <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Hero Image URL</label>
                                <input 
                                    className="w-full border p-2 rounded focus:ring-2 focus:ring-ice-blue outline-none font-mono text-sm" 
                                    value={data.pages[selectedPageKey].heroImage}
                                    onChange={(e) => handlePageChange('heroImage', e.target.value)}
                                />
                             </div>
                             <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Body Content</label>
                                <textarea 
                                    className="w-full border p-2 rounded focus:ring-2 focus:ring-ice-blue outline-none h-64 font-sans text-sm leading-relaxed" 
                                    value={data.pages[selectedPageKey].content}
                                    onChange={(e) => handlePageChange('content', e.target.value)}
                                />
                                <p className="text-xs text-gray-400 mt-1">This field supports standard text formatting (newlines are preserved).</p>
                             </div>
                        </div>
                    )}
                </div>
            )}

            {/* TAB: NEWS */}
            {activeTab === 'news' && (
                <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
                     {!editingNews ? (
                        <>
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">News Articles</h2>
                                    <p className="text-xs text-gray-500">Manage news feed items</p>
                                </div>
                                <button onClick={createNews} className="flex items-center gap-1 text-sm bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition font-semibold">
                                    <Plus size={16} /> Add Article
                                </button>
                            </div>
                            <div className="space-y-3">
                                {data.news.map((item) => (
                                    <div key={item.id} className="flex items-center gap-4 bg-gray-50 p-3 rounded border border-gray-200">
                                        <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                                            {item.image && <img src={item.image} className="w-full h-full object-cover" />}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-gray-800 text-sm">{item.title}</h4>
                                            <p className="text-xs text-gray-500">{item.date}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => handleEditNews(item)} className="text-blue-600 hover:bg-blue-50 p-2 rounded"><Edit2 size={16} /></button>
                                            <button onClick={() => handleDeleteNews(item.id)} className="text-red-600 hover:bg-red-50 p-2 rounded"><Trash size={16} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                     ) : (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b pb-4 mb-4">
                                <h3 className="font-bold text-lg">Edit News Article</h3>
                                <button onClick={() => setEditingNews(null)} className="text-sm text-gray-500 hover:underline">Cancel</button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Title</label>
                                    <input className="w-full border p-2 rounded" value={editingNews.title} onChange={e => setEditingNews({...editingNews, title: e.target.value})} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Date String</label>
                                    <input className="w-full border p-2 rounded" value={editingNews.date} onChange={e => setEditingNews({...editingNews, date: e.target.value})} placeholder="e.g. Oct 12" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Image URL</label>
                                    <input className="w-full border p-2 rounded" value={editingNews.image} onChange={e => setEditingNews({...editingNews, image: e.target.value})} />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Excerpt / Summary</label>
                                    <textarea className="w-full border p-2 rounded h-24" value={editingNews.excerpt} onChange={e => setEditingNews({...editingNews, excerpt: e.target.value})} />
                                </div>
                            </div>
                            <button onClick={handleSaveNews} className="w-full bg-ice-blue text-white py-3 rounded font-bold hover:bg-blue-800 transition">Save Article</button>
                        </div>
                     )}
                </div>
            )}

            {/* TAB: FACULTY */}
            {activeTab === 'faculty' && (
                <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
                    {!editingFaculty ? (
                        <>
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">Faculty & Staff</h2>
                                    <p className="text-xs text-gray-500">Manage staff directory profiles</p>
                                </div>
                                <button onClick={createNewFaculty} className="flex items-center gap-1 text-sm bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition font-semibold">
                                    <Plus size={16} /> Add Faculty
                                </button>
                            </div>
                            <div className="space-y-3">
                                {data.faculty.map((member) => (
                                    <div key={member.id} className="flex items-center gap-4 bg-gray-50 p-3 rounded border border-gray-200 hover:shadow-sm transition">
                                        <img src={member.image || 'https://via.placeholder.com/40'} alt="Profile" className="w-10 h-10 rounded-full object-cover bg-gray-200" />
                                        <div className="flex-1">
                                            <h4 className="font-bold text-ice-blue">{member.name}</h4>
                                            <p className="text-xs text-gray-600">{member.role} • {member.department}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => handleEditFaculty(member)} className="text-blue-600 hover:bg-blue-50 p-2 rounded"><Edit2 size={16} /></button>
                                            <button onClick={() => handleDeleteFaculty(member.id)} className="text-red-600 hover:bg-red-50 p-2 rounded"><Trash size={16} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b pb-4 mb-4">
                                <h3 className="font-bold text-lg">Edit Faculty Member</h3>
                                <button onClick={() => setEditingFaculty(null)} className="text-sm text-gray-500 hover:underline">Cancel</button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Full Name</label>
                                    <input className="w-full border p-2 rounded" value={editingFaculty.name} onChange={e => setEditingFaculty({...editingFaculty, name: e.target.value})} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Role / Title</label>
                                    <input className="w-full border p-2 rounded" value={editingFaculty.role} onChange={e => setEditingFaculty({...editingFaculty, role: e.target.value})} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Department</label>
                                    <input className="w-full border p-2 rounded" value={editingFaculty.department} onChange={e => setEditingFaculty({...editingFaculty, department: e.target.value})} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Email</label>
                                    <input className="w-full border p-2 rounded" value={editingFaculty.email} onChange={e => setEditingFaculty({...editingFaculty, email: e.target.value})} />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Image URL</label>
                                    <input className="w-full border p-2 rounded font-mono text-sm" value={editingFaculty.image} onChange={e => setEditingFaculty({...editingFaculty, image: e.target.value})} placeholder="https://..." />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Biography</label>
                                    <textarea className="w-full border p-2 rounded h-24" value={editingFaculty.bio} onChange={e => setEditingFaculty({...editingFaculty, bio: e.target.value})} />
                                </div>
                            </div>
                            <button onClick={handleSaveFaculty} className="w-full bg-ice-blue text-white py-3 rounded font-bold hover:bg-blue-800 transition">Save Faculty Member</button>
                        </div>
                    )}
                </div>
            )}

            <div className="mt-8 text-right">
                <p className="text-xs text-gray-400 inline-block mr-2">Changes are synced to the server.</p>
                <div className="inline-flex items-center gap-2 text-green-600 font-bold">
                    <Server size={18} /> Synced
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;