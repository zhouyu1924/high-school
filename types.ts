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

export interface LinkItem {
  id: string;
  label: string;
  url: string;
}

export interface FooterData {
  aboutTitle: string;
  aboutText: string;
  mainMenuTitle: string;
  usefulLinksTitle: string;
  usefulLinks: LinkItem[];
  contactTitle: string;
  contactAddress: string;
  contactPhone: string;
  contactEmail: string;
}

export interface SchoolData {
  name: string;
  motto: string;
  adminPassword?: string;
  staffPassword?: string;
  navItems: NavItem[];
  news: NewsItem[];
  events: EventItem[];
  faculty: FacultyMember[];
  pages: { [key: string]: PageContent };
  footer: FooterData;
  apiKey: string;
}

export interface AppContextType {
  data: SchoolData;
  updateData: (newData: Partial<SchoolData>) => void;
  isStaff: boolean;
  isAdmin: boolean;
  login: (role: 'admin' | 'staff', passwordInput: string) => boolean;
  logout: () => void;
}