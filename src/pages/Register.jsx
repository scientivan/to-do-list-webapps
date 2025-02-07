import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from '../api'; // Import fungsi register dari api.js
import { EyeIcon, EyeOffIcon } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({ nama: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};
    if (!formData.nama) newErrors.nama = "Name required";
    if (!formData.email) newErrors.email = "Email must be filled in";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password of at least 6 characters";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Panggil API register 
      await register(formData);
      
      // Jika berhasil, redirect ke login
      navigate("/login");
    } catch (err) {
      // Handle error dari API
      if (err.message.includes('400')) {
        setApiError('Email sudah terdaftar atau data tidak valid');
      } else {
        setApiError('Terjadi kesalahan saat pendaftaran');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Registration</h2>
        {apiError && <div className="mb-4 text-red-500 text-center">{apiError}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Your Name?"
              className="w-full p-2 border rounded-lg mt-1"
              value={formData.nama} // Diubah dari 'name' ke 'nama'
              onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
            />
            {errors.nama && <p className="text-red-500 text-sm">{errors.nama}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Input Email"
              className="w-full p-2 border rounded-lg mt-1"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="relative">
            <label className="block text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Input Password"
              className="w-full p-2 border rounded-lg mt-1 pr-10"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button
              type="button"
              className="absolute right-3 top-10 transform -translate-y-0"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
            </button>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
            Continue
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline"> {/* Diubah dari '/' ke '/login' */}
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;