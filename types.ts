export interface NavItem {
  id: string;
  label: string;
  path: string;
  subItems?: NavItem[];
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  image?: string;
}

export interface EventItem {
  id: string;
  day: string;
  month: string;
  title: string;
  time: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  image: string;
  bio: string;
}

export interface PageContent {
  title: string;
  content: string;
  heroImage: string;
}

export interface SchoolData {
  name: string;
  motto: string;
  navItems: NavItem[];
  news: NewsItem[];
  events: EventItem[];
  faculty: FacultyMember[];
  pages: { [key: string]: PageContent };
  apiKey: string;
}

export interface AppContextType {
  data: SchoolData;
  updateData: (newData: Partial<SchoolData>) => void;
  isStaff: boolean;
  isAdmin: boolean;
  login: (role: 'admin' | 'staff') => void;
  logout: () => void;
}