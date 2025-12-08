import React from 'react';
import { useAppContext } from '../context/AppContext';

interface GenericPageProps {
  pageKey: string;
}

const GenericPage: React.FC<GenericPageProps> = ({ pageKey }) => {
  const { data } = useAppContext();
  const page = data.pages[pageKey];

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
             <h1 className="text-2xl font-serif text-gray-400">Page Content Not Found</h1>
             <p className="text-gray-500">Could not find data for key: {pageKey}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
       {/* Hero Section */}
       <div className="relative h-[400px] w-full overflow-hidden bg-gray-900">
        <div 
            className="absolute inset-0 bg-cover bg-center opacity-60"
            style={{ 
                backgroundImage: `url('${page.heroImage || 'https://picsum.photos/1920/1080?grayscale'}')`,
            }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
        
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-16">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 shadow-sm">
            {page.title}
          </h1>
          <div className="h-1 w-24 bg-ice-gold"></div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl bg-white p-8 md:p-12 rounded shadow-sm border border-gray-100">
              <div className="prose prose-lg prose-blue max-w-none font-serif text-gray-700 whitespace-pre-wrap">
                  {page.content}
              </div>
          </div>
      </div>
    </div>
  );
};

export default GenericPage;