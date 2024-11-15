"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AddHostelPage() {
  const [formData, setFormData] = useState({
    hostel_id: "",
    hostel_name: "",
    ratings: "",
    phn_number: "",
    room_types: [],
    amenities: [],
    roomTypeInputs: [{ roomtype: "", cost: "", availability: true }],
    newAmenity: "", // For adding new amenities
  });
  
  const router = useRouter();

  useEffect(() => {
    // Automatically set a unique hostel_id when the component mounts
    const generateHostelId = `HSTL-${Date.now()}`; // Unique ID using timestamp
    setFormData((prevData) => ({
      ...prevData,
      hostel_id: generateHostelId,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRoomTypeChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRoomTypes = [...formData.roomTypeInputs];
    updatedRoomTypes[index][name] = value;
    setFormData({
      ...formData,
      roomTypeInputs: updatedRoomTypes,
    });
  };

  const addRoomType = () => {
    setFormData({
      ...formData,
      roomTypeInputs: [
        ...formData.roomTypeInputs,
        { roomtype: "", cost: "", availability: true },
      ],
    });
  };

  const removeRoomType = (index) => {
    const updatedRoomTypes = formData.roomTypeInputs.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      roomTypeInputs: updatedRoomTypes,
    });
  };

  const addAmenity = () => {
    if (formData.newAmenity.trim() !== "") {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, formData.newAmenity],
        newAmenity: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedRoomTypes = formData.roomTypeInputs.map((room) => ({
      roomtype: room.roomtype,
      cost: parseFloat(room.cost),
      availability: room.availability === "true" || room.availability === true,
    }));

    const formattedAmenities = formData.amenities;

    try {
      const response = await fetch("/api/hostel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          room_types: formattedRoomTypes,
          amenities: formattedAmenities,
        }),
      });

      const data = await response.json();

      if (data.error) {
        alert(data.error);
      } else {
        alert("Hostel added successfully!");
        router.push("/");
      }
    } catch (error) {
      console.error("Error adding hostel:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Add New Hostel</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="hostel_id">Hostel ID</label>
          <input
            type="text"
            id="hostel_id"
            name="hostel_id"
            value={formData.hostel_id}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
            readOnly // Make the field read-only
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2" htmlFor="hostel_name">Hostel Name</label>
          <input
            type="text"
            id="hostel_name"
            name="hostel_name"
            value={formData.hostel_name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2" htmlFor="ratings">Ratings</label>
          <input
            type="number"
            id="ratings"
            name="ratings"
            value={formData.ratings}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2" htmlFor="phn_number">Phone Number</label>
          <input
            type="text"
            id="phn_number"
            name="phn_number"
            value={formData.phn_number}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Room Types</label>
          {formData.roomTypeInputs.map((room, index) => (
            <div key={index} className="flex gap-4 mb-4">
              <input
                type="text"
                name="roomtype"
                value={room.roomtype}
                onChange={(e) => handleRoomTypeChange(index, e)}
                placeholder="Room Type"
                className="w-1/3 px-3 py-2 border border-gray-300 rounded"
                required
              />
              <input
                type="number"
                name="cost"
                value={room.cost}
                onChange={(e) => handleRoomTypeChange(index, e)}
                placeholder="Cost"
                className="w-1/3 px-3 py-2 border border-gray-300 rounded"
                required
              />
              <select
                name="availability"
                value={room.availability}
                onChange={(e) => handleRoomTypeChange(index, e)}
                className="w-1/3 px-3 py-2 border border-gray-300 rounded"
              >
                <option value={true}>Available</option>
                <option value={false}>Not Available</option>
              </select>
              <button
                type="button"
                onClick={() => removeRoomType(index)}
                className="text-red-500 hover:text-red-700 ml-2"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addRoomType}
            className="text-blue-600 hover:text-blue-800"
          >
            Add Room Type
          </button>
        </div>

        <div className="mb-4">
          <label className="block mb-2" htmlFor="amenities">Amenities</label>
          <div className="flex gap-4">
            <input
              type="text"
              id="newAmenity"
              name="newAmenity"
              value={formData.newAmenity}
              onChange={handleChange}
              className="w-3/4 px-3 py-2 border border-gray-300 rounded"
              placeholder="Enter an amenity"
            />
            <button
              type="button"
              onClick={addAmenity}
              className="w-1/4 bg-green-600 hover:bg-green-700 text-white py-2 rounded"
            >
              Add Amenity
            </button>
          </div>
          <div className="mt-2">
            {formData.amenities.map((amenity, index) => (
              <span
                key={index}
                className="inline-block mr-2 mb-2 px-3 py-1 bg-gray-200 rounded-full text-sm"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
            Add Hostel
          </Button>
        </div>
      </form>
    </div>
  );
}
