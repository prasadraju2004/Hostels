// pages/api/hostels.js
import dbConnect from "@/lib/dbConnect";
import Hostel from "@/models/Hostel";

export default async function handler(req, res) {
  const { method } = req;

  // Connect to the database
  try {
    await dbConnect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    return res
      .status(500)
      .json({ success: false, message: "Database connection failed" });
  }

  switch (method) {
    case "GET":
      try {
        // Fetch all hostels from the database
        const hostels = await Hostel.find({});

        // Check if any hostels were found
        if (!hostels.length) {
          console.warn("No hostels found in database.");
          return res.status(404).json({
            success: false,
            message: "No hostels found",
          });
        }

        // Send a successful response with the hostels data
        res.status(200).json({ success: true, data: hostels });
        console.log("Fetched hostels:", hostels);
      } catch (error) {
        console.error("Error fetching hostels:", error);
        res.status(400).json({
          success: false,
          message: "Error fetching hostels",
          error: error.message,
        });
      }
      break;

    default:
      res
        .status(405)
        .json({ success: false, message: "Method not allowed" });
  }
}
