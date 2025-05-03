import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';

export default function RestoMenu ({ data, setData, onBack, onSubmit }) {
  const [currentItem, setCurrentItem] = useState({
    name: '',
    price: '',
    description: '',
    category: 'Main',
    image: null
  });

  const categories = ['Starter', 'Appetizer', 'Main', 'Dessert', 'Drink'];

  const handleAddItem = () => {
    if (currentItem.name && currentItem.price) {
      setData({
        ...data,
        menuItems: [...data.menuItems, currentItem]
      });
      setCurrentItem({
        name: '',
        price: '',
        description: '',
        category: 'Main',
        image: null
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
      <h2 className="text-xl font-semibold mb-6">Create Your Menu</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={currentItem.category}
              onChange={(e) => setCurrentItem({...currentItem, category: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={currentItem.name}
              onChange={(e) => setCurrentItem({...currentItem, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (RWF)
            </label>
            <input
              type="number"
              value={currentItem.price}
              onChange={(e) => setCurrentItem({...currentItem, price: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image
            </label>
            <input
              type="file"
              onChange={(e) => setCurrentItem({...currentItem, image: e.target.files[0]})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description (Ingredients)
          </label>
          <textarea
            value={currentItem.description}
            onChange={(e) => setCurrentItem({...currentItem, description: e.target.value})}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          onClick={handleAddItem}
          className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
        >
          <FiPlus className="mr-2" />
          Add to Menu
        </button>

        {/* Display added menu items */}
        {data.menuItems.length > 0 && (
          <div className="border-t pt-4">
            <h3 className="font-medium mb-2">Your Menu Items</h3>
            <div className="space-y-2">
              {data.menuItems.map((item, index) => (
                <div key={index} className="flex justify-between p-2 border-b">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                  <p className="font-semibold">{item.price} RWF</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={onBack}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Back
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
            disabled={data.menuItems.length === 0}
          >
            Complete Profile
          </button>
        </div>
      </div>
    </div>
  );
}