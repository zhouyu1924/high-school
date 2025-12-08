import React from 'react';
import { useAppContext } from '../context/AppContext';
import { ChevronRight, Calendar, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  const { data } = useAppContext();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[600px] w-full overflow-hidden">
        {/* Background Image Placeholder */}
        <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
                backgroundImage: `url('https://picsum.photos/1920/1080')`,
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-ice-blue/80 to-transparent"></div>
        </div>

        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-start pt-20">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 max-w-2xl leading-tight shadow-sm">
            {data.motto}
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-xl font-light">
            Empowering the next generation of global leaders through British educational excellence.
          </p>
          <button className="bg-transparent border-2 border-white text-white px-8 py-3 uppercase tracking-wider text-sm font-semibold hover:bg-white hover:text-ice-blue transition duration-300">
            Learn More
          </button>
        </div>
      </div>

      {/* Feature Grid (Cards overlaying the bottom of hero visually) */}
      <div className="container mx-auto px-4 -mt-20 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-ice-gold/90 p-6 text-center text-white flex flex-col items-center justify-center min-h-[250px] shadow-lg hover:-translate-y-2 transition duration-300 group cursor-pointer">
            <h3 className="font-serif text-2xl font-bold mb-4 group-hover:scale-105 transition">Join Us</h3>
            <p className="text-sm mb-4">Discover our Sixth Form</p>
            <ChevronRight />
        </div>
        {/* Card 2 */}
        <div className="bg-ice-red/90 p-6 text-center text-white flex flex-col items-center justify-center min-h-[250px] shadow-lg hover:-translate-y-2 transition duration-300 group cursor-pointer">
            <h3 className="font-serif text-2xl font-bold mb-4 group-hover:scale-105 transition">School Life</h3>
            <p className="text-sm mb-4">Explore our vibrant community</p>
            <ChevronRight />
        </div>
        {/* Card 3 */}
        <div className="bg-ice-blue/90 p-6 text-center text-white flex flex-col items-center justify-center min-h-[250px] shadow-lg hover:-translate-y-2 transition duration-300 group cursor-pointer">
            <h3 className="font-serif text-2xl font-bold mb-4 group-hover:scale-105 transition">Apply Today</h3>
            <p className="text-sm mb-4">Start your journey</p>
            <div className="bg-white text-ice-blue text-xs font-bold px-2 py-1 mt-2">DUE: DEC 12</div>
        </div>
        {/* Card 4 */}
        <div className="bg-yellow-500/90 p-6 text-center text-white flex flex-col items-center justify-center min-h-[250px] shadow-lg hover:-translate-y-2 transition duration-300 group cursor-pointer">
            <h3 className="font-serif text-2xl font-bold mb-4 group-hover:scale-105 transition">Give Today!</h3>
            <p className="text-sm mb-4">Support the Annual Fund</p>
            <ChevronRight />
        </div>
      </div>

      {/* Yellow Strip */}
      <div className="bg-ice-gold py-3 mt-8">
        <div className="container mx-auto px-4 flex justify-between text-xs md:text-sm font-semibold text-ice-blue uppercase tracking-widest text-center">
            <span className="flex-1">Academic Excellence</span>
            <span className="flex-1 border-l border-white/30">Tradition</span>
            <span className="flex-1 border-l border-white/30">Innovation</span>
            <span className="flex-1 border-l border-white/30">Community</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* News Section */}
        <div className="space-y-8">
            <div className="flex justify-between items-end border-b-2 border-ice-gold pb-2 mb-6">
                <h2 className="text-4xl text-ice-blue font-serif">News</h2>
                <a href="#" className="text-sm text-blue-500 hover:underline mb-1">View All News</a>
            </div>
            
            <div className="space-y-6">
                {data.news.map((item) => (
                    <div key={item.id} className="group cursor-pointer">
                        <div className="overflow-hidden rounded mb-3">
                            {item.image && <img src={item.image} alt={item.title} className="w-full h-48 object-cover group-hover:scale-105 transition duration-500" />}
                        </div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.date}</span>
                        <h3 className="text-xl font-serif text-ice-blue font-bold mt-1 group-hover:text-ice-gold transition">{item.title}</h3>
                        <p className="text-gray-600 text-sm mt-2">{item.excerpt}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Events Section */}
        <div className="space-y-8">
            <div className="flex justify-between items-end border-b-2 border-ice-gold pb-2 mb-6">
                <h2 className="text-4xl text-ice-blue font-serif">Events</h2>
                <a href="#" className="text-sm text-blue-500 hover:underline mb-1">View Calendar</a>
            </div>

            <div className="space-y-6">
                {data.events.map((event) => (
                    <div key={event.id} className="flex gap-4 group cursor-pointer hover:bg-white hover:shadow-md p-2 rounded transition">
                        <div className="border border-gray-300 w-16 h-16 flex flex-col items-center justify-center rounded flex-shrink-0">
                            <span className="text-xs uppercase text-gray-500">{event.month}</span>
                            <span className="text-2xl font-serif text-ice-blue font-bold">{event.day}</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-ice-blue text-lg leading-tight group-hover:text-ice-gold transition">{event.title}</h3>
                            <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide">{event.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Social / Instagram Feed Mimic */}
        <div className="space-y-8">
            <div className="flex justify-between items-end border-b-2 border-ice-gold pb-2 mb-6">
                <h2 className="text-4xl text-ice-blue font-serif">Social</h2>
            </div>
            
            <div className="bg-white border border-gray-200 rounded p-4">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-ice-blue rounded-full flex items-center justify-center text-white">
                        IA
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-900">icealan_school</p>
                        <p className="text-xs text-gray-500">IceAlan High School • London</p>
                    </div>
                    <button className="ml-auto text-blue-500 text-xs font-bold">Follow</button>
                </div>
                <div className="grid grid-cols-2 gap-1">
                     <img src="https://picsum.photos/200/200?random=1" className="w-full h-32 object-cover" />
                     <img src="https://picsum.photos/200/200?random=2" className="w-full h-32 object-cover" />
                     <img src="https://picsum.photos/200/200?random=3" className="w-full h-32 object-cover" />
                     <img src="https://picsum.photos/200/200?random=4" className="w-full h-32 object-cover" />
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-gray-400">
                    <span className="text-xs">View on Instagram</span>
                    <ArrowRight size={16} />
                </div>
            </div>

            {/* Sunflower Graphic Mimic */}
            <div className="mt-8 flex justify-end">
                <div className="w-48 h-48 bg-yellow-400 rounded-full blur-3xl opacity-20 absolute pointer-events-none"></div>
                <svg viewBox="0 0 100 100" className="w-48 h-48 text-yellow-500 opacity-80 animate-spin-slow">
                    <path fill="currentColor" d="M50 0 L61 35 L98 35 L68 57 L79 91 L50 70 L21 91 L32 57 L2 35 L39 35 Z" />
                </svg>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;