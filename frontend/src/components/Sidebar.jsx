import { MdDashboard, MdPeople, MdRestaurant, MdSettings } from 'react-icons/md';
import { CgProfile } from "react-icons/cg";

export default function Sideba({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) {
  return (
    <div className={`bg-black shadow-lg ${sidebarOpen ? 'w-64' : 'w-18'} transition-all duration-300`}>
      <div className="p-4 mb-12 flex items-center justify-between">
        {sidebarOpen && <h1 className="text-3xl md:text-4xl text-orange-500 font-bold">Supa<span className="text-white">Menu</span></h1>}
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-lg text-orange-500 hover:text-white"
        >
          {sidebarOpen ? '◀' : '▶'}
        </button>
      </div>
      
      <nav className="mt-6">
        <SidebarItem 
          icon={<MdDashboard size={24} />}
          text="Overview"
          active={activeTab === 'overview'}
          onClick={() => setActiveTab('overview')}
          expanded={sidebarOpen}
        />
        <SidebarItem 
          icon={<MdPeople size={24} />}
          text="Clients"
          active={activeTab === 'clients'}
          onClick={() => setActiveTab('clients')}
          expanded={sidebarOpen}
        />
        <SidebarItem 
          icon={<MdRestaurant size={24} />}
          text="Users"
          active={activeTab === 'users'}
          onClick={() => setActiveTab('users')}
          expanded={sidebarOpen}
        />
        <SidebarItem 
          icon={<MdSettings size={24} />}
          text="Settings"
          active={activeTab === 'settings'}
          onClick={() => setActiveTab('settings')}
          expanded={sidebarOpen}
        />
        <SidebarItem 
          icon={<CgProfile size={24} />}
          text="My Account"
          active={activeTab === 'my-account'}
          onClick={() => setActiveTab('my-account')}
          expanded={sidebarOpen}
        />
      </nav>
    </div>
  );
}

function SidebarItem({ icon, text, active, onClick, expanded }) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center p-4 mx-2 rounded-lg cursor-pointer transition-colors
        ${active ? 'bg-orange-100 text-orange-600' : 'text-gray-600'}`}
    >
      <div className="mr-3">{icon}</div>
      {expanded && <span className="font-medium">{text}</span>}
    </div>
  );
}