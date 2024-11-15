// models/Hostel.js
import mongoose from "mongoose";
import Hostel from "@/models/Hostel";

const RoomTypeSchema = new mongoose.Schema({
  roomtype: { type: String, required: true },
  cost: { type: Number, required: true },
  availability: { type: Boolean, required: true }
});

const HostelSchema = new mongoose.Schema({
  hostel_id: { type: String, required: true, unique: true }, // Primary Key
  hostel_name: { type: String, required: true },
  ratings: { type: Number, required: true },
  phn_number: { type: String, required: true },
  room_types: { type: [RoomTypeSchema], required: true }, // Array of RoomTypeSchema
  amenities: { type: [String], required: true } // Array of strings for amenities
});

export default mongoose.models.Hostel || mongoose.model("Hostel", HostelSchema,"hosteldetails");
