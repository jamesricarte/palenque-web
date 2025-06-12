import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useRef } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const timerRef = useRef(null);
  const events = ["mousemove", "keydown", "click", "scroll"];

  const resetTimer = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      alert("You're idle. Logging out...");
      logout();
    }, 5000);
  };

  useEffect(() => {
    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer();

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-orange-500">
          PalenqueMart Dashboard
        </h1>
        <button
          onClick={logout}
          className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600 cursor-pointer"
        >
          Logout
        </button>
      </header>

      {/* Main content */}
      <main className="p-6 space-y-6">
        <h2 className="text-2xl font-bold">Welcome back, Vendor!</h2>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white shadow p-4 rounded">
            <h3 className="text-lg font-semibold text-orange-500">Orders</h3>
            <p className="text-2xl font-bold mt-2">12</p>
          </div>
          <div className="bg-white shadow p-4 rounded">
            <h3 className="text-lg font-semibold text-orange-500">Products</h3>
            <p className="text-2xl font-bold mt-2">8</p>
          </div>
          <div className="bg-white shadow p-4 rounded">
            <h3 className="text-lg font-semibold text-orange-500">Messages</h3>
            <p className="text-2xl font-bold mt-2">3</p>
          </div>
        </div>

        {/* Placeholder for more */}
        <div className="bg-white shadow p-6 rounded mt-4">
          <h3 className="text-lg font-semibold mb-2 text-orange-500">
            Announcements
          </h3>
          <p>
            Here you can show important updates or messages for your vendors.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white text-center text-sm text-gray-400 p-4 border-t mt-6">
        © 2025 PalenqueMart. All rights reserved.
      </footer>
    </div>
  );
};

export default Dashboard;
