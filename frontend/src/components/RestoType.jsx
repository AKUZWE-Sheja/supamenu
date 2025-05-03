import { useState } from 'react';
import { FiX } from 'react-icons/fi';

export default function RestoTyes({ data, setData, onBack, onNext }) {
  const restaurantTypes = ['Restaurant', 'Pub', 'Hotel', 'Coffee Shop', 'Other'];
  const cuisineTypes = ['African', 'European', 'Asian', 'American', 'Fusion'];
  const [imagePreviews, setImagePreviews] = useState([]);

  // Handle text/select inputs
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Handle time inputs
  const handleTimeChange = (field, value) => {
    setData({
      ...data,
      openingHours: { ...data.openingHours, [field]: value }
    });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (!files) return;

    const newImages = Array.from(files);
    const newPreviews = newImages.map(file => URL.createObjectURL(file));

    setImagePreviews([...imagePreviews, ...newPreviews]);
    setData({
      ...data,
      images: [...data.images, ...newImages]
    });
  };

  // Remove an image
  const removeImage = (index) => {
    const updatedPreviews = [...imagePreviews];
    const updatedImages = [...data.images];
    
    updatedPreviews.splice(index, 1);
    updatedImages.splice(index, 1);
    
    setImagePreviews(updatedPreviews);
    setData({ ...data, images: updatedImages });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
      <h2 className="text-xl font-semibold mb-6">Restaurant Type & Timings</h2>
      
      <div className="space-y-6">
        {/* Restaurant Type Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Restaurant Type
          </label>
          <select
            name="restaurantType"
            value={data.restaurantType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select restaurant type</option>
            {restaurantTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Cuisine Type Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cuisine Type
          </label>
          <select
            name="cuisineType"
            value={data.cuisineType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select cuisine type</option>
            {cuisineTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Opening Hours */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Opening Hours
          </label>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-1">From</label>
              <input
                type="time"
                value={data.openingHours.from}
                onChange={(e) => handleTimeChange('from', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-1">To</label>
              <input
                type="time"
                value={data.openingHours.to}
                onChange={(e) => handleTimeChange('to', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Logo/Images
          </label>
          <label className="block border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-orange-500 transition-colors">
            <p className="text-gray-500">Click to upload images</p>
            <input
              type="file"
              className="hidden"
              onChange={handleImageUpload}
              accept="image/*"
              multiple
            />
          </label>
          
          {/* Image Previews */}
          {imagePreviews.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview}
                    alt={`Preview ${index}`}
                    className="w-full h-24 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FiX size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Back
          </button>
          <button
            type="button"
            onClick={onNext}
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
            disabled={!data.restaurantType || !data.cuisineType}
          >
            Next: Create Menu
          </button>
        </div>
      </div>
    </div>
  );
}