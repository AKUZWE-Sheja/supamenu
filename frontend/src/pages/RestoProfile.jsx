import { useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import RestoInfo from '../components/RestoInfo';
import RestoTyes from '../components/RestoType';
import RestoMenu from '../components/RestoMenu';
import Navbar from '../components/Navbar';

export default function RestoProfile() {
  const [activeSection, setActiveSection] = useState('information');
  const [formData, setFormData] = useState({
    restaurantName: '',
    contactNumber: '',
    ownerName: '',
    ownerEmail: '',
    restaurantType: '',
    cuisineType: '',
    openingHours: { from: '14:00', to: '02:00' },
    menuItems: []
  });

  const sections = [
    { id: 'information', title: 'Restaurant Information' },
    { id: 'type-timings', title: 'Type & Timings' },
    { id: 'menu', title: 'Create Menu' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-white shadow-sm">
        <div className="p-6 mx-auto border-b border-gray-200">
          <Navbar bgColor="white" />
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 bg-white">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md p-4">
          <h1 className="text-lg font-semibold mb-4">Create your restaurant profile</h1>
          
          <nav className="space-y-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center justify-between w-full p-3 rounded-lg ${
                  activeSection === section.id 
                    ? 'bg-orange-100 text-orange-600' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <span>{section.title}</span>
                <FiChevronRight />
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 p-8">
          {activeSection === 'information' && (
            <RestoInfo 
              data={formData} 
              setData={setFormData} 
              onNext={() => setActiveSection('type-timings')}
            />
          )}

          {activeSection === 'type-timings' && (
            <RestoTyes 
              data={formData} 
              setData={setFormData}
              onBack={() => setActiveSection('information')}
              onNext={() => setActiveSection('menu')}
            />
          )}

          {activeSection === 'menu' && (
            <RestoMenu 
              data={formData} 
              setData={setFormData}
              onBack={() => setActiveSection('type-timings')}
              onSubmit={() => console.log('Submitting:', formData)}
            />
          )}
        </div>
      </div>
    </div>
  );
}