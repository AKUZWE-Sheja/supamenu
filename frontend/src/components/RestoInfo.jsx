export default function RestoInfo({ data, setData, onNext }) {
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
      <h2 className="text-xl font-semibold mb-6">Restaurant Information</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Restaurant Name
          </label>
          <input
            type="text"
            name="restaurantName"
            value={data.restaurantName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Restaurant Complete Name
          </label>
          <input
            type="text"
            name="restaurantCompleteName"
            value={data.restaurantCompleteName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md  outline-none"
            required
          />
        </div>
              
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact Number @ Restaurant
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
              +250
            </span>
            <input
              type="tel"
              name="contactNumber"
              value={data.contactNumber}
              onChange={handleChange}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md rounded-l-none  outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Restaurant Owner Details
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
              +250
            </span>
            <input
              type="tel"
              name="ownerNumber"
              value={data.ownerNumber}
              onChange={handleChange}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md rounded-l-none outline-none"
              required
            />
          </div>
        </div>
              
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Owner Name
            </label>
            <input
              type="text"
              name="ownerName"
              value={data.ownerName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md  outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Owner Email
            </label>
            <input
              type="email"
              name="ownerEmail"
              value={data.ownerEmail}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md  outline-none"
              required
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onNext}
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
            disabled={!data.restaurantName || !data.contactNumber}
          >
            Next: Type & Timings
          </button>
        </div>
      </div>
    </div>
  );
}