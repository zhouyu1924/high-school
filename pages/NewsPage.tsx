import React from 'react';
import { useAppContext } from '../context/AppContext';

const NewsPage: React.FC = () => {
  const { data } = useAppContext();
  const page = data.pages['news'];

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
       {/* Hero Section */}
       <div className="relative h-[300px] w-full overflow-hidden bg-ice-blue">
        {page && (
            <div 
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{ 
                    backgroundImage: `url('${page.heroImage || 'https://picsum.photos/1920/1080?grayscale'}')`,
                }}
            ></div>
        )}
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            {page ? page.title : 'News & Events'}
          </h1>
          <p className="text-blue-200 max-w-2xl text-lg">
             {page ? page.content : 'Stay updated with IceAlan.'}
          </p>
        </div>
      </div>

      {/* News Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.news.map((item) => (
                 <div key={item.id} className="bg-white rounded overflow-hidden shadow hover:shadow-lg transition group cursor-pointer">
                    <div className="h-48 overflow-hidden">
                        {item.image ? (
                             <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        ) : (
                             <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">No Image</div>
                        )}
                    </div>
                    <div className="p-6">
                        <span className="text-xs font-bold text-ice-gold uppercase tracking-widest">{item.date}</span>
                        <h3 className="text-xl font-serif text-ice-blue font-bold mt-2 mb-3 leading-tight">{item.title}</h3>
                        <p className="text-gray-600 text-sm line-clamp-3">{item.excerpt}</p>
                        <button className="mt-4 text-ice-blue font-semibold text-sm hover:underline">Read more &rarr;</button>
                    </div>
                 </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;