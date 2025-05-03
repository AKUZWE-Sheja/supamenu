import { CgProfile } from 'react-icons/cg';
import { FaSearch } from 'react-icons/fa';
import { MdNotifications } from 'react-icons/md';

export default function Navbar({ bgColor = 'black' }) {
  const textColor = bgColor === 'black' ? 'text-white' : 'text-black';
  
  return (
    <div className="flex justify-between items-center max-w-6xl mx-auto">
      <h1 className={`text-3xl md:text-4xl font-bold ${textColor}`}>
        Supa<span className="text-orange-500">Menu</span>
      </h1>
      
      <div className="flex items-center space-x-4 md:space-x-6">
        <button className={`text-xl ${textColor} hover:text-orange-500 transition-colors`}>
          <FaSearch />
        </button>
        <button className={`text-2xl ${textColor} hover:text-orange-500 transition-colors relative`}>
          <MdNotifications />
          <span className="absolute top-0 right-0 w-2 h-2 bg-orange-500 rounded-full"></span>
        </button>
        <div className="hidden md:flex items-center space-x-2">
          <span className={textColor}>Jacques Kagabo</span>
          <div className={`w-8 h-8 rounded-full ${bgColor === 'black' ? 'bg-gray-600' : 'bg-gray-200'} flex items-center justify-center`}>
            <CgProfile className={`text-xl ${bgColor === 'black' ? 'text-gray-300' : 'text-gray-600'}`} />
          </div>
        </div>  
      </div>
    </div>
  );
}