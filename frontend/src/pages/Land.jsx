import { FiUsers, FiDollarSign, FiShoppingBag, FiSettings } from 'react-icons/fi';

export default function OverviewPage() {
  // Chart data
  const chartData = [
    { label: 'Today', value: 38, color: 'bg-orange-500' },
    { label: 'Week', value: 40, color: 'bg-blue-500' },
    { label: 'Month', value: 30, color: 'bg-green-500' },
    { label: 'Year', value: 20, color: 'bg-purple-500' }
  ];

  // Find maximum value for chart scaling
  const maxValue = Math.max(...chartData.map(item => item.value));

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Overview</h1>
        <p className="text-gray-500">as of 25 May 2022, 09:41 PM</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          icon={<FiUsers size={24} className="text-blue-500" />}
          title="Clients"
          value="60"
        />
        <StatCard 
          icon={<FiDollarSign size={24} className="text-green-500" />}
          title="Revenue (FRW)"
          value="38,234,000"
        />
        <StatCard 
          icon={<FiShoppingBag size={24} className="text-orange-500" />}
          title="Orders"
          value="67,569"
        />
      </div>

      {/* Trends Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-lg font-semibold">Today's trends</h2>
          </div>
          
          {/* Chart Key - now shows colors only */}
          <div className="flex space-x-4">
            {chartData.map((item) => (
              <div key={item.label} className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${item.color} mr-2`}></div>
                <span className="text-sm text-gray-600">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Custom Chart */}
        <div className="flex items-end h-64 space-x-4 pt-4">
          {chartData.map((item) => (
            <div key={item.label} className="flex-1 flex flex-col items-center">
              <div 
                className={`w-full ${item.color} rounded-t-md`}
                style={{ height: `${(item.value / maxValue) * 100}%` }}
              ></div>
              <span className="text-sm text-gray-600 mt-2">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Orders Summary */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Orders Summary</h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4">
            <p className="text-2xl font-bold">67,569</p>
            <p className="text-gray-500 text-sm">Orders</p>
          </div>
          <div className="p-4">
            <p className="text-2xl font-bold">54,567</p>
            <p className="text-gray-500 text-sm">Items</p>
          </div>
          <div className="p-4">
            <p className="text-2xl font-bold">4,560</p>
            <p className="text-gray-500 text-sm">Order/hour</p>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ActionButton 
            icon={<FiUsers size={20} />}
            label="View Clients"
          />
          <ActionButton 
            icon={<FiDollarSign size={20} />}
            label="View Revenue"
          />
          <ActionButton 
            icon={<FiShoppingBag size={20} />}
            label="View Orders"
          />
          <ActionButton 
            icon={<FiSettings size={20} />}
            label="Account Settings"
          />
        </div>
      </div>
    </div>
  );
}

// Reusable Stat Card Component
function StatCard({ icon, title, value }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className="bg-gray-100 p-3 rounded-full h-12 w-12 flex items-center justify-center">
          {icon}
        </div>
      </div>
    </div>
  );
}

// Reusable Action Button Component
function ActionButton({ icon, label }) {
  return (
    <button className="flex flex-col items-center justify-center p-4 border rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors">
      <div className="text-orange-500 mb-2">{icon}</div>
      <span className="text-sm">{label}</span>
    </button>
  );
}