import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppContextType, SchoolData, NavItem } from '../types';

const defaultNavItems: NavItem[] = [
  { id: '1', label: 'About', path: '/about' },
  { id: '2', label: 'Admissions', path: '/admissions' },
  { id: '3', label: 'Faculty & Staff', path: '/directory' },
  { id: '4', label: 'Academics', path: '/academics' },
  { id: '5', label: 'Student Life', path: '/student-life' },
  { id: '6', label: 'News', path: '/news' },
  { id: '7', label: 'Support', path: '/support' },
];

const defaultPages = {
  about: {
    title: "About IceAlan",
    content: "IceAlan High School was founded on the principles of academic rigor and character development. Our campus, located in the heart of the city, provides a sanctuary for learning and growth.\n\nWe believe in fostering a community where every student is valued and challenged to reach their full potential. From our state-of-the-art science labs to our historic arts theater, every corner of IceAlan is designed to inspire.",
    heroImage: "https://picsum.photos/1920/600?grayscale"
  },
  admissions: {
    title: "Admissions",
    content: "We welcome applications from students who demonstrate intellectual curiosity and a commitment to their community. Our admissions process is holistic, looking beyond just grades to the character and potential of each applicant.\n\nKey Dates:\n- Application Deadline: January 15th\n- Entrance Exams: February 2nd\n- Interview Period: February 15th - 28th",
    heroImage: "https://picsum.photos/1920/601?grayscale"
  },
  academics: {
    title: "Academic Excellence",
    content: "Our curriculum is designed to challenge students and prepare them for top-tier universities worldwide. We offer a broad range of GCSE and A-Level subjects, taught by experts in their fields.\n\nDepartments include Sciences, Mathematics, Humanities, Languages, and the Arts. We also offer extended project qualifications and research opportunities.",
    heroImage: "https://picsum.photos/1920/602?grayscale"
  },
  "student-life": {
    title: "Student Life",
    content: "Life at IceAlan extends far beyond the classroom. With over 50 clubs and societies, competitive sports teams, and a thriving arts scene, there is something for everyone.\n\nOur House system promotes camaraderie and friendly competition, ensuring every student feels a sense of belonging from day one.",
    heroImage: "https://picsum.photos/1920/603?grayscale"
  },
  support: {
    title: "Support IceAlan",
    content: "The IceAlan Annual Fund supports scholarships, facility upgrades, and faculty development. Your generosity ensures that we can continue to offer a world-class education to deserving students regardless of their financial background.\n\nWays to Give:\n- One-time Donation\n- Monthly Giving\n- Legacy Pledges",
    heroImage: "https://picsum.photos/1920/604?grayscale"
  },
  news: {
    title: "News & Events",
    content: "Stay up to date with the latest happenings at IceAlan High School. From academic achievements to alumni success stories, discover what makes our community unique.",
    heroImage: "https://picsum.photos/1920/605?grayscale"
  }
};

const defaultData: SchoolData = {
  name: "IceAlan High School",
  motto: "Excellence. Integrity. Innovation.",
  navItems: defaultNavItems,
  apiKey: "",
  news: [
    { id: '1', title: 'A Level Results Day Success', date: 'Aug 15', excerpt: 'Students achieve record-breaking results in Sciences and Humanities.', image: 'https://picsum.photos/400/300' },
    { id: '2', title: 'Royal Visit to IceAlan', date: 'Sep 10', excerpt: 'HRH visits the new Science Wing to inaugurate the laboratory.', image: 'https://picsum.photos/401/300' },
    { id: '3', title: 'Winter Orchestra Concert', date: 'Nov 22', excerpt: 'Join us for an evening of classical music performed by our senior students.', image: 'https://picsum.photos/402/300' },
  ],
  events: [
    { id: '1', day: '12', month: 'DEC', title: 'Sixth Form Open Evening', time: '6:00 PM - 8:30 PM' },
    { id: '2', day: '15', month: 'DEC', title: 'Carol Service at the Cathedral', time: '7:00 PM' },
    { id: '3', day: '08', month: 'JAN', title: 'Lent Term Begins', time: '8:30 AM' },
  ],
  faculty: [
    { id: '1', name: 'Dr. Alan Sterling', role: 'Headmaster', department: 'Administration', email: 'headmaster@icealan.ac.uk', image: 'https://picsum.photos/200/200?random=10', bio: 'Doctorate in Education from Oxford, serving as Headmaster since 2015.' },
    { id: '2', name: 'Mrs. Sarah Jenkins', role: 'Head of Science', department: 'Science', email: 's.jenkins@icealan.ac.uk', image: 'https://picsum.photos/200/200?random=11', bio: 'Specializes in Physics and Chemistry. Runs the Robotics Club.' },
    { id: '3', name: 'Mr. James Thorne', role: 'Director of Music', department: 'Arts', email: 'j.thorne@icealan.ac.uk', image: 'https://picsum.photos/200/200?random=12', bio: 'Former conductor for the Royal Philharmonic, leading our award-winning orchestra.' },
    { id: '4', name: 'Ms. Emily White', role: 'Head of Sixth Form', department: 'Pastoral', email: 'e.white@icealan.ac.uk', image: 'https://picsum.photos/200/200?random=13', bio: 'Dedicated to student welfare and university guidance.' },
  ],
  pages: defaultPages
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize with default data
  const [data, setData] = useState<SchoolData>(defaultData);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load data from Node.js Backend on Mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use the Node API endpoint
        const response = await fetch('/api/data');
        if (response.ok) {
            const serverData = await response.json();
            if (serverData && typeof serverData === 'object') {
                const mergedData = { ...defaultData, ...serverData };
                if (!serverData.pages) mergedData.pages = defaultPages;
                setData(mergedData);
            }
        } else {
             console.log("Backend returned error, using default.");
             // If backend exists but no file, try to init it
             saveToBackend(defaultData);
        }
      } catch (error) {
        console.warn("Could not fetch from backend (offline or build mode?), using default data.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper to save to Node.js Backend
  const saveToBackend = async (newData: SchoolData) => {
      try {
          await fetch('/api/data', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(newData)
          });
      } catch (error) {
          console.error("Failed to save to backend", error);
      }
  };

  const updateData = (newData: Partial<SchoolData>) => {
    setData(prev => {
        const updated = { ...prev, ...newData };
        saveToBackend(updated);
        return updated;
    });
  };

  const login = (role: 'admin' | 'staff') => {
    if (role === 'admin') setIsAdmin(true);
    if (role === 'staff') setIsStaff(true);
  };

  const logout = () => {
    setIsAdmin(false);
    setIsStaff(false);
  };

  if (loading) {
      return <div className="min-h-screen flex items-center justify-center text-ice-blue">Loading School Data...</div>;
  }

  return (
    <AppContext.Provider value={{ data, updateData, isStaff, isAdmin, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};