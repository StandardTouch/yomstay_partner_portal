import React, { useState } from "react";
import Layout from "./Layout";
import { FaRegEdit, FaTrash, FaPlus } from "react-icons/fa";
import { Button } from "../components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FaWifi,
  FaSnowflake,
  FaTv,
  FaUtensils,
  FaBath,
  FaLock,
  FaBed,
  FaUserFriends,
} from "react-icons/fa";
import { MdDesk, MdMicrowave } from "react-icons/md";

const iconOptions = {
  FaWifi,
  FaSnowflake,
  FaTv,
  FaUtensils,
  FaBath,
  FaLock,
  FaBed,
  FaUserFriends,
  MdDesk,
  MdMicrowave,
};

const RoomDetail = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [roomTitle, setRoomTitle] = useState("Deluxe Room");
  const [roomDescription, setRoomDescription] = useState(
    "A spacious room with modern amenities and a beautiful view."
  );
  const [editableAmenities, setEditableAmenities] = useState([
    { icon: "FaWifi", label: "Free WiFi" },
    { icon: "FaSnowflake", label: "Air Conditioning" },
    { icon: "FaTv", label: "Flat-screen TV" },
    { icon: "MdMicrowave", label: "Microwave" },
    { icon: "FaUtensils", label: "Kitchenette" },
    { icon: "FaBath", label: "Private Bathroom" },
    { icon: "FaLock", label: "Safe" },
    { icon: "MdDesk", label: "Work Desk" },
    { icon: "FaBed", label: "King Size Bed" },
    { icon: "FaUserFriends", label: "Sleeps 2-4 People" },
  ]);

  const [conditions, setConditions] = useState([
    "Check-in: 2:00 PM",
    "Check-out: 11:00 AM",
    "Non-smoking room",
    "Pets not allowed",
    "Cancellation policy applies",
  ]);

  const [policies, setPolicies] = useState([
    "Valid ID and credit card required at check-in",
    "Minimum age to check-in: 21 years",
    "No loud music after 10:00 PM",
    "Housekeeping available upon request",
  ]);

  const handleLabelChange = (index, newLabel) => {
    const updated = [...editableAmenities];
    updated[index].label = newLabel;
    setEditableAmenities(updated);
  };

  const handleDeleteAmenity = (index) => {
    const updated = editableAmenities.filter((_, i) => i !== index);
    setEditableAmenities(updated);
  };

  const handleAddAmenity = () => {
    setEditableAmenities([
      ...editableAmenities,
      { icon: "FaWifi", label: "New Amenity" },
    ]);
  };

  const roomImage =
    "https://media.istockphoto.com/id/185086520/photo/luxury-hotel-room.jpg?s=1024x1024&w=is&k=20&c=jAjrXkQClfhcYrvnGhUw-x6NwYJHoboLMAiUgA1E89s=";

  return (
   
      <div className="bg-gray-100 py-8 px-4 flex justify-center">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-6xl overflow-hidden">
          {/* Room Banner */}
          <img
            src={roomImage}
            alt="Room Banner"
            className="w-full h-64 object-cover"
          />

          {/* Main Content */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left - Room Info */}
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Room Details</h1>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <FaRegEdit className="w-4 h-4" />
                  {isEditing ? "Save Changes" : "Edit Room"}
                </Button>
              </div>

              {/* Room Title */}
              {isEditing ? (
                <input
                  value={roomTitle}
                  onChange={(e) => setRoomTitle(e.target.value)}
                  className="text-xl font-semibold mb-1 w-full border rounded p-1"
                />
              ) : (
                <h2 className="text-xl font-semibold mb-1">{roomTitle}</h2>
              )}

              {/* Room Description */}
              {isEditing ? (
                <textarea
                  value={roomDescription}
                  onChange={(e) => setRoomDescription(e.target.value)}
                  className="text-gray-600 mb-6 w-full border rounded p-2"
                />
              ) : (
                <p className="text-gray-600 mb-6">{roomDescription}</p>
              )}

              {/* Amenities */}
              <h3 className="text-lg font-semibold mb-2">In The Room</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {editableAmenities.map((amenity, index) => {
                  const Icon = iconOptions[amenity.icon];
                  return isEditing ? (
                    <div
                      key={index}
                      className="flex items-center gap-2 border rounded-md p-2 bg-white shadow-sm"
                    >
                      <Icon className="w-4 h-4 text-blue-500" />
                      <input
                        type="text"
                        value={amenity.label}
                        onChange={(e) =>
                          handleLabelChange(index, e.target.value)
                        }
                        className="border-none outline-none w-full text-sm"
                      />
                      <button
                        onClick={() => handleDeleteAmenity(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ) : (
                    <Badge
                      key={index}
                      className="flex items-center gap-2 px-3 py-2 text-sm rounded-md bg-gray-100 text-gray-700"
                    >
                      <Icon className="w-4 h-4 text-blue-500" />
                      {amenity.label}
                    </Badge>
                  );
                })}
              </div>

              {/* Add Button in Edit Mode */}
              {isEditing && (
                <Button
                  onClick={handleAddAmenity}
                  variant="secondary"
                  className="mt-4"
                >
                  <FaPlus className="mr-2" />
                  Add Amenity
                </Button>
              )}
            </div>

            {/* Right - Sidebar */}
            <div className="space-y-4">
              {/* Specific Conditions */}
              <div className="bg-gray-50 rounded-lg shadow-md p-4">
                <h3 className="text-lg font-semibold mb-4">Specific Conditions</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm">
                  {conditions.map((item, index) =>
                    isEditing ? (
                      <li key={index}>
                        <input
                          value={item}
                          onChange={(e) => {
                            const updated = [...conditions];
                            updated[index] = e.target.value;
                            setConditions(updated);
                          }}
                          className="w-full border rounded px-2 py-1"
                        />
                      </li>
                    ) : (
                      <li key={index}>{item}</li>
                    )
                  )}
                </ul>
              </div>

              {/* Room Policies */}
              <div className="bg-gray-50 rounded-lg shadow-md p-4">
                <h3 className="text-lg font-semibold mb-4">Room Policies</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm">
                  {policies.map((item, index) =>
                    isEditing ? (
                      <li key={index}>
                        <input
                          value={item}
                          onChange={(e) => {
                            const updated = [...policies];
                            updated[index] = e.target.value;
                            setPolicies(updated);
                          }}
                          className="w-full border rounded px-2 py-1"
                        />
                      </li>
                    ) : (
                      <li key={index}>{item}</li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
  
  );
};

export default RoomDetail;
