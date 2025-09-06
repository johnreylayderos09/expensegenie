// src/pages/Homepage.js
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

export default function Homepage() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg transition ${
      isActive
        ? "shadow-md bg-amber-100 text-amber-700"
        : "hover:shadow-md hover:bg-gray-100"
    }`;

  const features = [
    { img: "/src/assets/features/feature1.png", title: "AI adviser" },
    { img: "/src/assets/features/feature2.png", title: "Spending Insights" },
    { img: "/src/assets/features/feature3.png", title: "Budget Planning" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      {/* Navbar */}
      <header className="bg-blue-50 shadow px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3 font-bold text-lg text-gray-800">
            <img
              src="/src/assets/icon.png"
              alt="Genie Logo"
              className="w-10 h-10 rounded-full"
            />
            <span>Expense Genie</span>
          </div>

          {/* Nav Links (Desktop) */}
          <nav className="hidden md:flex gap-10 text-gray-800 font-semibold">
            <NavLink to="/homepage" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </nav>

          {/* Hamburger Menu (Mobile) */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 relative"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span
              className={`absolute h-1 w-8 bg-gray-800 rounded transition-transform duration-300 ${
                isOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
              }`}
            ></span>
            <span
              className={`absolute h-1 w-8 bg-gray-800 rounded transition-opacity duration-300 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`absolute h-1 w-8 bg-gray-800 rounded transition-transform duration-300 ${
                isOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="flex justify-center mt-3">
            <div className="flex flex-col space-y-2 md:hidden font-semibold text-gray-800 text-center">
              <NavLink
                to="/homepage"
                onClick={() => setIsOpen(false)}
                className={navLinkClass}
              >
                Home
              </NavLink>
              <NavLink
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className={navLinkClass}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/contact"
                onClick={() => setIsOpen(false)}
                className={navLinkClass}
              >
                Contact
              </NavLink>
            </div>
          </div>
        )}
      </header>

      {/* Main Content with Swiper */}
      <main className="flex flex-col items-center justify-center flex-grow px-4 text-center">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          loop
          pagination={{ clickable: true }}
          navigation
          modules={[Pagination, Navigation]}
          className="w-full max-w-2xl custom-swiper"
        >
          {features.map((f, idx) => (
            <SwiperSlide key={idx}>
              <div className="flex flex-col items-center pb-10">
                <h2 className="mb-4 text-xl font-semibold">{f.title}</h2>
                <div className="bg-white p-6 rounded-3xl shadow-lg">
                  <img
                    src={f.img}
                    alt={f.title}
                    className="w-100 max-w-xs h-100 object-contain"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </main>
    </div>
  );
}
