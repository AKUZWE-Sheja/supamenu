import { FaUserEdit, FaSearch } from "react-icons/fa";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { BsMenuUp } from "react-icons/bs";
import { MdNotifications } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="bg-black px-6 py-8 md:py-10">
        <nav className="flex justify-between items-center max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl text-white font-bold">
            Supa<span className="text-orange-500">Menu</span>
          </h1>
          <div className="flex items-center space-x-4 md:space-x-6">
            <button className="text-xl text-gray-200 hover:text-orange-500 transition-colors">
              <FaSearch />
            </button>
            <button className="text-2xl text-gray-200 hover:text-orange-500 transition-colors relative">
              <MdNotifications />
              <span className="absolute top-0 right-0 w-2 h-2 bg-orange-500 rounded-full"></span>
            </button>
            <div className="hidden md:flex items-center space-x-2">
              <span className="text-gray-300">Jacques Kagabo</span>
              <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-gray-300">
                <CgProfile className="text-xl" />
              </div>
            </div>
          </div>
        </nav>

        <header className="max-w-4xl mx-auto text-center mt-10 mb-8 px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Register your restaurant on SupaMenu
          </h1>
          <p className="text-gray-300 text-md md:text-xl mb-8">
            For free and get more revenue!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-md font-small transition-colors shadow-md">
              Register your restaurant
            </button>
            <button className="border border-white hover:border-orange-500 text-white hover:text-orange-500 px-6 py-3 rounded-md font-small transition-colors">
              Restaurant already registered? Sign in
            </button>
          </div>
        </header>
      </div>

      {/* How It Works Section */}
      <div className="bg-blue-50 px-6 py-10 md:py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-12">How it works</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <FaUserEdit className="text-2xl text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Step 1</h3>
              <p className="text-gray-600">Register your restaurant</p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <GiForkKnifeSpoon className="text-2xl text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Step 2</h3>
              <p className="text-gray-600">Create profile and menu</p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <BsMenuUp className="text-2xl text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Step 3</h3>
              <p className="text-gray-600">Start receiving orders</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}