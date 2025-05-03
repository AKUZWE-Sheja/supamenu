import { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { MdNotifications } from 'react-icons/md';
import Sidebar from '../components/Sidebar';
import ClientsDashboard from '../components/ClientsBoard';
import UsersBoard from '../components/UsersBoard';
import Overview from '../components/Overview';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Imported Sidebar */}
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold capitalize">{activeTab}</h2>
          <div className="flex items-center space-x-4">
            <button className="relative text-gray-600">
              <MdNotifications size={24} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-orange-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-2">
              <span className="text-gray-700">Jacques Kagabo</span>
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <CgProfile size={20} className="text-gray-600" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {activeTab === 'clients' && <ClientsDashboard />}
          {activeTab === 'overview' && <Overview />}
          {activeTab === 'users' && <UsersBoard />}
        </main>
      </div>
    </div>
  );
}