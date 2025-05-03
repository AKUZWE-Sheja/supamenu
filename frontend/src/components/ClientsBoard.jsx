import { useState } from 'react';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { MdOutlineRestaurant, MdHotel } from 'react-icons/md';
import { FaEllipsisVertical, FaEye } from 'react-icons/fa6';
import CreateClient from './CreateClient';

export default function ClientsDashboard() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

  const clients = [
    {
      name: "Soy Restaurant",
      sales: "2,345,678 Frw",
      details: <FaEye className="text-orange-500 hover:text-orange-600 cursor-pointer" />,
      category: "RESTO",
      icon: <FaEllipsisVertical className="text-gray-400 hover:text-gray-600 cursor-pointer" />
    },
    {
      name: "Choose Kigali",
      sales: "98,745 Frw",
      details: <FaEye className="text-orange-500 hover:text-orange-600 cursor-pointer" />,
      category: "RESTO",
      icon: <FaEllipsisVertical className="text-gray-400 hover:text-gray-600 cursor-pointer" />
    },
    {
      name: "Planet Burger",
      sales: "321,456 Frw",
      details: <FaEye className="text-orange-500 hover:text-orange-600 cursor-pointer" />,
      category: "RESTO",
      icon: <FaEllipsisVertical className="text-gray-400 hover:text-gray-600 cursor-pointer" />
    },
    {
      name: "M Hotel",
      sales: "78,503 Frw",
      details: <FaEye className="text-orange-500 hover:text-orange-600 cursor-pointer" />,
      category: "HOTEL",
      icon: <FaEllipsisVertical className="text-gray-400 hover:text-gray-600 cursor-pointer" />
    }
  ];

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Clients</h1>
        <button
            onClick={() => setIsModalOpen(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md flex items-center transition-colors shadow-md hover:shadow-lg">
          <FiPlus className="mr-2" />
          Add New Client
        </button>
        <CreateClient
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        />
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex items-center bg-white rounded-lg shadow-sm border border-gray-200 p-3 transition-all">
        <FiSearch className="text-gray-400 mr-3" />
        <input
          type="text"
          placeholder="Search client..."
          className="flex-1 outline-none text-gray-700 placeholder-gray-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Clients List */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
        {/* Table Header */}
        <div className="grid grid-cols-12 bg-gray-100 p-4 font-medium text-gray-600 text-sm uppercase tracking-wider border-b">
          <div className="col-span-5">Client details</div>
          <div className="col-span-2">Sales</div>
          <div className="col-span-2">Details</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-1">Actions</div>
        </div>

        {/* Clients List */}
        {filteredClients.map((client, index) => (
          <div 
            key={index} 
            className="grid grid-cols-12 p-4 items-center border-b hover:bg-gray-50 transition-colors min-h-[64px]"
          >
            <div className="col-span-5 font-medium text-gray-800">{client.name}</div>
            <div className="col-span-2 text-gray-700 font-semibold">{client.sales}</div>
            <div className="col-span-2">{client.details}</div>
            <div className="col-span-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                client.category === "RESTO" 
                  ? "bg-orange-100 text-orange-800" 
                  : "bg-blue-100 text-blue-800"
              }`}>
                {client.category === "RESTO" ? (
                  <MdOutlineRestaurant className="mr-1" />
                ) : (
                  <MdHotel className="mr-1" />
                )}
                {client.category}
              </span>
            </div>
            <div className="col-span-1 flex justify-end">{client.icon}</div>
          </div>
        ))}
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Total Clients</h3>
          <p className="text-3xl font-bold text-gray-800">{clients.length}</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Total Restaurants</h3>
          <p className="text-3xl font-bold text-gray-800">
            {clients.filter(c => c.category === "RESTO").length}
          </p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-gray-800">3,844,382 Frw</p>
        </div>
      </div>
    </div>
  );
}