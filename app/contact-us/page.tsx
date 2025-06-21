"use client";
import React from "react";

function ContactUs() {
  return (
    <div className="min-h-screen p-10 md:px-20 lg:px-40">
      <h2 className="font-bold text-4xl text-primary text-center mb-10">
        Contact Us
      </h2>

      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 shadow-lg p-10 rounded-2xl space-y-8 text-center">
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold text-primary">Our Location</h3>
          <p className="text-gray-700 dark:text-gray-300">Magical Stories HQ</p>
          <p className="text-gray-700 dark:text-gray-300">Bajkovita Ulica 42, 71000 Sarajevo</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-semibold text-primary">Contact</h3>
          <p className="text-gray-700 dark:text-gray-300">Email: info@magicalstories.com</p>
          <p className="text-gray-700 dark:text-gray-300">Phone: +387 33 123 456</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-semibold text-primary">Working Hours</h3>
          <p className="text-gray-700 dark:text-gray-300">Monday - Friday: 09:00 - 17:00</p>
          <p className="text-gray-700 dark:text-gray-300">Weekends: Closed</p>
        </div>
      </div>

      <footer className="mt-20 pt-10 border-t border-gray-200 text-center">
        <div className="flex justify-center space-x-6 mb-6 text-primary">
          <a href="#" className="hover:text-blue-600 transition">Facebook</a>
          <a href="#" className="hover:text-pink-500 transition">Instagram</a>
          <a href="#" className="hover:text-blue-400 transition">Twitter</a>
          <a href="#" className="hover:text-blue-700 transition">LinkedIn</a>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          &copy; {new Date().getFullYear()} Magical Stories. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default ContactUs;
