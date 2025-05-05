import { FiTrendingUp, FiUsers, FiDollarSign, FiShoppingBag, FiSettings } from 'react-icons/fi';

export default function Overview() {

  const chartData = [
    { label: 'Today', value: 38, color: 'bg-orange-500' },
    { label: 'Week', value: 40, color: 'bg-blue-300' },
    { label: 'Month', value: 30, color: 'bg-gray-700' },
    { label: 'Year', value: 20, color: 'bg-gray-400' }
  ];

  // Find maximum value for chart scaling
  const maxValue = Math.max(...chartData.map(item => item.value));

  return (
    <div className="p-6 min-h-screen">

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={<FiUsers size={24} className="text-orange-500" />}
          title="Clients"
          value="60"
          change="+5 this week"
        />
        <StatCard 
          icon={<FiDollarSign size={24} className="text-orange-500" />}
          title="Revenue (FRW)"
          value="38,234,000"
          change="+12% from last month"
        />
        <StatCard 
          icon={<FiShoppingBag size={24} className="text-orange-500" />}
          title="Orders"
          value="67,569"
          change="+8% from last month"
        />
      </div>

      {/* Trends Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-lg font-semibold">Today's trends</h2>
          </div>
          
          {/* Chart Key*/}
          <div className="flex space-x-4">
            {chartData.map((item) => (
              <div key={item.label} className="flex items-center">
                <div className={`w-6 h-1 rounded-8 ${item.color} mr-2`}></div>
                <span className="text-sm text-gray-600">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex items-end h-64 space-x-4 pt-4 bg-gray-200">
          {/* Placeholder for chart */}
        </div>
      </div>

      {/* Summary */}
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">

  {/* Left: 2/3 width */}
  <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
    
    {/* Restaurants */}
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Restaurants</h2>
        <a href="#" className="text-orange-500 text-sm font-medium hover:underline">View details</a>
      </div>
      {[
        { name: 'Sole Luna', sales: '46,000' },
        { name: 'Soy', sales: '12,000' }
      ].map((item, i) => (
        <div key={i} className="text-md flex justify-between py-2 border-b last:border-b-0">
          <span>{item.name}</span>
          <span className="text-gray-600">{item.sales} FRW</span>
        </div>
      ))}
    </div>

    {/* Hotels */}
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Hotels</h2>
        <a href="#" className="text-orange-500 text-sm font-medium hover:underline">View details</a>
      </div>
      {[
        { name: 'Park Inn', sales: '4,238' },
        { name: 'M Hotel', sales: '1,005' }
      ].map((item, i) => (
        <div key={i} className="text-md flex justify-between py-2 border-b last:border-b-0">
          <span>{item.name}</span>
          <span className="text-gray-600">{item.sales} FRW</span>
        </div>
      ))}
    </div>

    {/* Pubs */}
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Pubs</h2>
        <a href="#" className="text-orange-500 text-sm font-medium hover:underline">View details</a>
      </div>
      {[
        { name: 'Sundowner', sales: '300' },
        { name: 'Gate N10', sales: '150' }
      ].map((item, i) => (
        <div key={i} className="text-md flex justify-between py-2 border-b last:border-b-0">
          <span>{item.name}</span>
          <span className="text-gray-600">{item.sales} FRW</span>
        </div>
      ))}
    </div>

    {/* Cafes */}
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Cafes</h2>
        <a href="#" className="text-orange-500 text-sm font-medium hover:underline">View details</a>
      </div>
      {[
        { name: 'Aroma', sales: '2,238' },
        { name: 'Patisserie Royale', sales: '500' }
      ].map((item, i) => (
        <div key={i} className="text-md flex justify-between py-2 border-b last:border-b-0">
          <span>{item.name}</span>
          <span className="text-gray-600">{item.sales} FRW</span>
        </div>
      ))}
    </div>

  </div>

  {/* Right: 1/3 width - Create Section */}
  <div className="bg-white rounded-xl shadow p-6 flex flex-col justify-between h-full">
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Create</h2>
        <a href="#" className="text-orange-500 text-sm font-medium hover:underline">View all</a>
      </div>
      <div className="mb-4">
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
          <span className="text-gray-700 font-medium">Create new</span>
          <span className="text-lg">＋</span>
        </button>
      </div>
      <div className="space-y-3">
        {[
          { label: 'Restaurants', tag: 'NEW' },
          { label: 'Hotels', tag: 'NEW' },
          { label: 'Pub', tag: 'DEFAULT' }
        ].map((item, i) => (
          <div key={i} className="text-md flex justify-between items-center px-4 py-3 border rounded-lg">
            <div className="flex items-center gap-2">
              <input type="radio" name="category" defaultChecked={item.label === 'Pub'} />
              <label className="font-medium">{item.label}</label>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${item.tag === 'NEW' ? 'bg-orange-100 text-orange-600' : 'bg-gray-200 text-gray-600'}`}>
              {item.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>

</div>

    </div>
  );
}

// Reusable Stat Card Component
function StatCard({ icon, title, value, change }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between">
        <div>
          <p className="text-gray-500 text-md">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          <p className="text-green-400 text-sm mt-2">{change}</p>
        </div>
        <div className="bg-gray-100 p-3 rounded-full h-12 w-12 flex items-center justify-center">
          {icon}
        </div>
      </div>
    </div>
  );
}
