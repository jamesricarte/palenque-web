import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import bgImage from "../../assets/bgImage.png";
import facebook from "../../assets/facebook.png";
import google_play from "../../assets/google_play.png";
import google from "../../assets/google.png";
import app_store from "../../assets/app_store.png";
import vendor_stall from "../../assets/vendor-stall-icon.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState({
    isMessageAvailable: false,
    message: "",
    messageType: "",
  });

  const [loginTrial, setLoginTrial] = useState(5);

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loginTrial < 0) {
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/login`, loginFormData);

      login(response.data.safeUser);
      navigate("/dashboard");
      setMessage({
        isMessageAvailable: true,
        message: response.data.message,
        messageType: "success",
      });
    } catch (error) {
      setLoginTrial((prev) => prev - 1);
      setMessage({
        isMessageAvailable: true,
        message: error.response.data.message,
        messageType: "error",
      });
    }
  };

  useEffect(() => {
    console.log(loginTrial);
    if (loginTrial <= 2 && loginTrial > 0) {
      alert(`You have ${loginTrial} more attempts left`);
    }

    if (loginTrial <= 0) {
      setMessage({
        isMessageAvailable: true,
        message: "You have been locked!",
        messageType: "error",
      });

      // Automatically reset loginTrial after 5 seconds
      const timeout = setTimeout(() => {
        setLoginTrial(5);
        setMessage({
          isMessageAvailable: true,
          message: "You can try logging in again.",
          messageType: "info",
        });
      }, 5000);

      return () => clearTimeout(timeout); // Cleanup in case component unmounts
    }
  }, [loginTrial]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
        <img src={logo} alt="PalenqueMart Logo" className="h-8 px-4" />
        <a href="#" className="text-orange-500 font-medium px-10">
          Help Centre
        </a>
      </header>

      {/* Hero + Login Section */}
      <main className="flex-1 bg-orange-100">
        <div className="flex flex-col lg:flex-row w-full h-full">
          {/* Left Section with Image and Call-to-Action */}
          <div
            className="lg:w-2/3 w-full h-[400px] lg:h-auto bg-cover bg-center relative"
            style={{ backgroundImage: `url(${bgImage})` }}
          >
            <div className="w-full h-full bg-opacity-60 flex flex-col justify-center items-center text-white px-6">
              <div className="text-center">
                <img
                  src={vendor_stall}
                  alt="Vendor Icon"
                  className="mx-auto mb-4 h-75"
                />
                <p className="text-lg lg:text-2xl font-medium mb-4">
                  Bring your public market stall online and access thousands of
                  shoppers looking for fresh, local produce.
                </p>
                <button className="bg-white text-orange-600 font-semibold px-6 py-2 rounded-full hover:bg-gray-100 transition cursor-pointer">
                  Join as a Vendor
                </button>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <div className="lg:w-1/3 w-full flex items-center justify-center p-8 bg-orange-500">
            <form
              className="bg-white p-6 rounded shadow-md w-full max-w-sm"
              onSubmit={handleLogin}
            >
              <h2 className="text-lg font-semibold">Login your account</h2>
              <p className="text-m text-orange-500 mb-4">
                Your market access starts here.
              </p>
              <label htmlFor="email" className="text-m">
                Email Address
              </label>
              <input
                id="email"
                type="text"
                name="email"
                placeholder=""
                className="w-full px-3 py-2 border-transparent rounded mb-3 bg-gray-100"
                value={loginFormData.email}
                onChange={handleFormData}
              />

              <label htmlFor="password" className="text-m">
                Password
              </label>
              <div className="relative mb-3">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder=""
                  className="w-full px-3 py-2 border-transparent rounded bg-gray-100 pr-10"
                  value={loginFormData.password}
                  onChange={handleFormData}
                />
                <div
                  className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>

              {message.isMessageAvailable && (
                <p
                  className={`${
                    message.messageType === "success"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {message.message}
                </p>
              )}

              <div className="flex justify-end mb-3">
                <a href="#" className="text-sm text-orange-500">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className={`w-full  text-white py-2 rounded mb-3 font-semibold cursor-pointer ${
                  loginTrial <= 0 ? "bg-gray-200" : "bg-orange-500"
                }`}
              >
                Login
              </button>

              <p className="text-center text-sm text-gray-500 mb-2">
                Or login with
              </p>
              <div className="flex justify-between gap-3 mb-3">
                <button className="flex-1 flex items-center justify-center gap-2 border border-orange-400 rounded py-2 text-orange-400 cursor-pointer">
                  <img src={google} alt="Google" className="h-5" /> Google
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 border border-orange-400 rounded py-2 text-orange-400 cursor-pointer">
                  <img src={facebook} alt="Facebook" className="h-5" /> Facebook
                </button>
              </div>
              <p className="text-sm text-center">
                Don’t have an account?{" "}
                <Link to="/register" className="text-orange-500">
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white px-12 py-6 border-t border-gray-200 text-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <h4 className="text-lg font-bold text-orange-500 mb-2">
              Customer Care
            </h4>
            <ul className="space-y-1 text-gray-700">
              <i className="font-semibold">
                <li>FAQ</li>
                <li>Help</li>
                <li>Contact Us</li>
                <li>Refund Policy</li>
                <li>Customer Support</li>
                <li>Delivery Information</li>
              </i>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-orange-500 mb-2">
              Follow Us On
            </h4>
            <ul className="space-y-1 text-gray-700">
              <i className="font-semibold">
                <li>Facebook</li>
                <li>Instagram</li>
                <li>Twitter</li>
                <li>Tiktok</li>
                <li>Youtube</li>
              </i>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-orange-500 mb-2">
              Download App
            </h4>
            <div className="space-y-2">
              <img src={google_play} alt="Google Play" className="h-10" />
              <img src={app_store} alt="App Store" className="h-10" />
            </div>
          </div>

          <div className="mr-4">
            <h4 className="text-lg font-bold text-orange-500 mb-2">
              Join Our Newsletter
            </h4>
            <i className="font-semibold">
              <p className="mb-2 text-gray-700">
                Enter your email to keep updated in our promotions!
              </p>
            </i>{" "}
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 border-transparent px-2 py-2 rounded-l bg-gray-100 mt-2"
              />
              <button className="bg-orange-500 text-white px-4 py-1 rounded-r mt-2 ">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </footer>
      <div className="flex justify-between mt-6 text-s text-white border-t pt-4 bg-black px-12 py-5">
        <p>© 2025 | PalenqueMart | All Rights Reserved.</p>
        <div className="space-x-6 px-6">
          <a href="#">Term of Service</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
