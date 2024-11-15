import dbConnect from "@/lib/dbConnect";
import Hostel from "@/models/Hostel";

export default async function handler(req, res) {
  const { id } = req.query;

  await dbConnect();

  if (req.method === "GET") {
    try {
      if (!id) {
        return res.status(400).json({ error: "Missing hostel ID parameter" });
      }

      const hostel = await Hostel.findOne({ hostel_id: id });
      if (!hostel) {
        return res.status(404).json({ error: "Hostel not found" });
      }

      res.status(200).json(hostel);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "POST") {
    try {
      const {
        hostel_id,
        hostel_name,
        ratings,
        phn_number,
        room_types,
        amenities,
      } = req.body;

      if (!hostel_id || !hostel_name || !ratings || !phn_number || !room_types || !amenities) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const newHostel = new Hostel({
        hostel_id,
        hostel_name,
        ratings,
        phn_number,
        room_types,
        amenities,
      });

      await newHostel.save();

      res.status(201).json({ message: "Hostel created successfully", hostel: newHostel });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
