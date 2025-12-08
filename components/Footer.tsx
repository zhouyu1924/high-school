import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Footer: React.FC = () => {
  const { data } = useAppContext();
  const { footer } = data;

  return (
    <footer className="bg-ice-blue text-white pt-16 pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {/* Column 1: About */}
        <div>
          <h3 className="font-serif text-lg font-bold mb-4">{footer.aboutTitle}</h3>
          <p className="text-blue-200 text-sm leading-relaxed mb-4 whitespace-pre-wrap">
            {footer.aboutText}
          </p>
          <div className="flex gap-4">
            <Facebook size={20} className="hover:text-ice-gold cursor-pointer" />
            <Twitter size={20} className="hover:text-ice-gold cursor-pointer" />
            <Instagram size={20} className="hover:text-ice-gold cursor-pointer" />
          </div>
        </div>

        {/* Column 2: Main Menu */}
        <div>
          <h3 className="font-serif text-lg font-bold mb-4">{footer.mainMenuTitle}</h3>
          <ul className="space-y-2 text-sm text-blue-200">
            {data.navItems.slice(0, 5).map(item => (
                <li key={item.id}><a href={item.path} className="hover:text-white hover:underline">{item.label}</a></li>
            ))}
          </ul>
        </div>

        {/* Column 3: Useful Links */}
        <div>
           <h3 className="font-serif text-lg font-bold mb-4">{footer.usefulLinksTitle}</h3>
           <ul className="space-y-2 text-sm text-blue-200">
             {footer.usefulLinks.map(link => (
                 <li key={link.id}>
                     <a href={link.url} className="hover:text-white hover:underline">{link.label}</a>
                 </li>
             ))}
           </ul>
        </div>

        {/* Column 4: Contact */}
        <div>
            <h3 className="font-serif text-lg font-bold mb-4">{footer.contactTitle}</h3>
            <ul className="space-y-4 text-sm text-blue-200">
                <li className="flex gap-2 items-start">
                    <MapPin size={16} className="mt-1 flex-shrink-0" />
                    <span className="whitespace-pre-wrap">{footer.contactAddress}</span>
                </li>
                <li className="flex gap-2 items-center">
                    <Phone size={16} className="flex-shrink-0" />
                    <span>{footer.contactPhone}</span>
                </li>
                <li className="flex gap-2 items-center">
                    <Mail size={16} className="flex-shrink-0" />
                    <a href={`mailto:${footer.contactEmail}`} className="hover:underline">{footer.contactEmail}</a>
                </li>
            </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-8 border-t border-blue-800 text-center text-xs text-blue-400">
        <p>&copy; {new Date().getFullYear()} {data.name}. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;