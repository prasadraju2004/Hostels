"use client";
import React, { useEffect, useState } from "react";

const HostelPage = () => {
  const [hostel, setHostel] = useState(null);
  const [error, setError] = useState(null);

  const hostelId = localStorage.getItem("HostelID");

  useEffect(() => {
    const fetchHostelDetails = async () => {
      if (!hostelId) {
        setError("Hostel ID not found.");
        return;
      }

      try {
        const response = await fetch(`/api/hostel?id=${hostelId}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setHostel(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchHostelDetails();
  }, [hostelId]);

  if (error) {
    return <div className="max-w-xl mx-auto p-4 bg-red-100 text-red-700 rounded-lg text-center">{error}</div>;
  }

  if (!hostel) {
    return <div className="max-w-xl mx-auto p-4 bg-gray-100 text-gray-700 rounded-lg text-center">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">{hostel.hostel_name}</h1>
        <p className="text-lg text-gray-600">
          <strong>Phone:</strong> {hostel.phn_number}
        </p>
        <p className="text-lg text-gray-600">
          <strong>Ratings:</strong> {hostel.ratings} / 5
        </p>
      </div>

      <div className="space-y-8">
        {/* Room Types Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-600">Room Types</h2>
          <ul className="space-y-4">
            {hostel.room_types.map((room, index) => (
              <li key={index} className="p-4 bg-gray-50 rounded-lg shadow-md">
                <p className="text-lg font-medium text-gray-800">
                  <strong>Room Type:</strong> {room.roomtype}
                </p>
                <p className="text-md text-gray-600">
                  <strong>Cost:</strong> ₹{room.cost}
                </p>
                <p className="text-md text-gray-600">
                  <strong>Availability:</strong> {room.availability ? "Available" : "Not Available"}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Amenities Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-600">Amenities</h2>
          <ul className="flex flex-wrap gap-4">
            {hostel.amenities.map((amenity, index) => (
              <li key={index} className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm">
                {amenity}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HostelPage;
