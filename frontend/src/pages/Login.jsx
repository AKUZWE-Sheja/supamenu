import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-orange-500">
      {/* Branding Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-black">
            Supa<span className="text-white">Menu</span>
          </h1>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="w-full md:w-1/2 bg-white rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none p-8 md:p-12 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <div className="text-center mb-8">
            <p className="text-gray-500 text-sm font-medium mb-1">Welcome back</p>
            <h1 className="text-2xl font-bold text-gray-800">Login to SupaMenu</h1>
            <p className="text-gray-500 text-sm mt-2">
              Enter your email and password below
            </p>
          </div>

          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-gray-500 mb-1">
                EMAIL
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address"
                className="text-sm w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                required
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-xs font-medium text-gray-500 mb-1">
                PASSWORD
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="text-sm w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-medium shadow-sm transition-colors duration-300"
            >
              Log In
            </button>
          </form>

          <div className="mt-6 text-center space-y-4">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to="/signup" className="text-orange-600 hover:text-orange-700 font-medium">
                Sign up
              </Link>
            </p>
            <p className="text-sm text-gray-500">
                Forgot your password? {" "}
              <Link href="#" className="text-orange-600 hover:text-orange-700 font-medium">
                RESET
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}