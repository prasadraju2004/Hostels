"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Heart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Component() {
  const [hostels, setHostels] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchHostels() {
      try {
        const response = await fetch("/api/hostels");
        const data = await response.json();
        if (data.success) {
          setHostels(data.data);
        }
      } catch (error) {
        console.error("Error fetching hostels:", error);
      }
    }

    fetchHostels();
  }, []);

  const handleDetails = (hostel) => {
    if (hostel && hostel.hostel_id) {
      localStorage.setItem("HostelID", hostel.hostel_id);
      router.push("/hostel");
    } else {
      console.error("Hostel data is missing or incomplete.");
    }
  };

  const handleAddHostel = () => {
    router.push("/add-hostel");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">Hostel Listings</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Popular Hostels</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {hostels.map((hostel) => (
            <Card key={hostel.hostel_id} className="p-4">
              <div className="flex gap-4">
                <div className="relative w-1/3">
                  <Image
                    src="/hostel.jpg"
                    alt={`${hostel.hostel_name} image`}
                    width={300}
                    height={200}
                    className="rounded-lg object-cover"
                  />
                  <Button
                    variant="ghost"
                    className="absolute top-2 right-2"
                    size="icon"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{hostel.hostel_name}</h3>
                  <div className="flex items-center mt-1">
                    <span className="bg-green-600 text-white px-2 py-0.5 rounded text-sm">
                      {hostel.ratings} ★
                    </span>
                  </div>
                  <p className="text-gray-600 mt-2">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    {hostel.address}
                  </p>
                  <div className="flex gap-2 mt-2">
                    {hostel.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="px-2 py-1 bg-gray-100 rounded-full text-sm"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <Button
                      onClick={() => handleDetails(hostel)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      More details
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <Button
            onClick={handleAddHostel}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Add New Hostel
          </Button>
        </div>
      </main>
    </div>
  );
}
