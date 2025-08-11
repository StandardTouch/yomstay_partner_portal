import React, { useState } from "react";
import Layout from "./Layout";
import { FaRegEdit, FaTrash, FaPlus, FaArrowLeft } from "react-icons/fa";
import { Button } from "../components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdDesk, MdMicrowave } from "react-icons/md";
import AlertBox from "../components/Alert_box";

const RoomDetail = ({ updateNewRoom, onBack, defaultAmenities }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [roomTitle, setRoomTitle] = useState(updateNewRoom.roomType);
  const [roomDescription, setRoomDescription] = useState(
    updateNewRoom.roomDescription
  );
  const [editableAmenities, setEditableAmenities] = useState(
    updateNewRoom.amenities
  );
  const [details, setDetails] = useState(updateNewRoom);

  const [conditions, setConditions] = useState(updateNewRoom.conditions);

  const [policies, setPolicies] = useState(updateNewRoom.policies);

  const RoomType = [
    {
      id: 1,
      name: "Standard Room",
    },
    {
      id: 2,
      name: "Deluxe Room",
    },
    {
      id: 3,
      name: "Executive Room",
    },
    {
      id: 4,
      name: "Suite",
    },
    {
      id: 5,
      name: "Presidential Suite",
    },
    {
      id: 6,
      name: "Family Room",
    },
    {
      id: 7,
      name: "Deluxe Suite",
    },
  ];
  const BedSize = [
    {
      id: 1,
      name: "Twin",
    },
    {
      id: 2,
      name: "Double/Full",
    },
    {
      id: 3,
      name: "Queen",
    },
    {
      id: 4,
      name: "King",
    },
  ];
  const handleDeleteAmenity = (index) => {
    const updated = editableAmenities.filter((_, i) => i !== index);
    setEditableAmenities(updated);
  };

  const handleDeleteCondition = (index) => {
    const updated = conditions.filter((_, i) => i !== index);
    setConditions(updated);
  };

  const handleDeletePolicy = (index) => {
    const updated = policies.filter((_, i) => i !== index);
    setPolicies(updated);
  };

  const handleUpdate = () => {
    if (
      !roomTitle ||
      !roomDescription ||
      !editableAmenities.length ||
      !conditions.length ||
      !policies.length ||
      conditions.map((item) => item).includes("") ||
      policies.map((item) => item).includes("")
    ) {
      return toast.error("Please fill out all fields");
    }
    toast.success("Room details updated successfully");
    setIsEditing(!isEditing);
    updateNewRoom.roomType = roomTitle;
    updateNewRoom.roomDescription = roomDescription;
    updateNewRoom.amenities = editableAmenities;
    updateNewRoom.conditions = conditions;
    updateNewRoom.policies = policies;
    updateNewRoom.price = details.price;
    updateNewRoom.roomSize = details.roomSize;
    updateNewRoom.numberOfPeople = details.numberOfPeople;
    updateNewRoom.bedsize = details.bedsize;
    updateNewRoom.roomImage = details.roomImage;
  };

  const roomImage = details.roomImage.url;
  return (
    <div className="bg-gray-100 dark:bg-gray-900 rounded-md py-8 px-4 flex flex-col justify-center">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-navyblue-dark dark:text-pastelgreen">Room Details</h1>
        <div className="flex md:flex-row flex-col gap-2 *:cursor-pointer">
          {isEditing ? (
            <AlertBox Check="Cancel" onDelete={() => onBack()} />
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => onBack()}
            >
              <FaArrowLeft className="w-4 h-4" />
              Back
            </Button>
          )}
          {isEditing ? (
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => handleUpdate()}
            >
              <FaRegEdit className="w-4 h-4" />
              Save Changes
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => {
                setIsEditing(!isEditing);
              }}
            >
              <FaRegEdit className="w-4 h-4" />
              Edit Room
            </Button>
          )}
        </div>
      </div>
      <div className="bg-white dark:bg-[#000] rounded-xl shadow-lg w-full max-w-6xl overflow-hidden">
        {/* Room Banner */}
        <div className="relative">
          <img
            src={roomImage}
            alt="Room Banner"
            className="w-full h-64 object-cover"
          />
          {isEditing && (
            <div className="absolute top-2 right-2 z-10 flex flex-row gap-2">
              <label htmlFor="image">
                <div className="cursor-pointer bg-card p-2 rounded-full">
                  <FaRegEdit className="w-4 h-4" />
                </div>
              </label>
              <Input
                type="file"
                id="image"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  const addImage = {
                    altText: file.name,
                    id: Math.random().toString(),
                    url: URL.createObjectURL(file),
                  };
                  setDetails({ ...details, roomImage: addImage });
                }}
              />
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left - Room Info */}
          <div className="md:col-span-2">
            {/* Room Title */}
            {isEditing ? (
              <div>
                <label htmlFor="roomType">Room Type</label>
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-full border rounded-md cursor-pointer">
                    <Input type="text" id="roomType" value={roomTitle} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {RoomType.map((room) => (
                      <DropdownMenuItem
                        key={room.id}
                        onClick={(e) => setRoomTitle(e.target.textContent)}
                      >
                        {room.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div>
                <p className="text-sm font-semibold mb-1">Room Title</p>
                <h2 className="text-xl font-semibold mb-1">{roomTitle}</h2>
              </div>
            )}

            {/* Room Description */}
            <p className="text-sm font-semibold mb-1 mt-3">Room Description</p>
            {isEditing ? (
              <Textarea
                value={roomDescription}
                onChange={(e) => setRoomDescription(e.target.value)}
                className="text-gray-600 dark:text-white mb-6 w-full border rounded p-2"
              />
            ) : (
              <p className="text-gray-600 dark:text-white mb-6">
                {roomDescription}
              </p>
            )}

            {/* Amenities */}
            <h3 className="text-lg font-semibold mb-2">In The Room</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {editableAmenities.map((amenity, index) => {
                return isEditing ? (
                  <div
                    key={index}
                    className="flex items-center gap-2 border rounded-md p-2 shadow-sm"
                  >
                    <img
                      src={amenity.icon}
                      className="w-4 h-4 text-blue-500"
                      alt=""
                    />
                    <p className="w-full text-sm">{amenity.name}</p>
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
                    className="flex justify-start w-full items-center gap-2 px-3 py-2 text-sm rounded-md bg-gray-100 text-gray-700"
                  >
                    <img
                      src={amenity.icon}
                      className="w-4 h-4 text-blue-500"
                      alt={amenity.altText}
                    />
                    {amenity.name}
                  </Badge>
                );
              })}
            </div>

            {/* Add Button in Edit Mode */}
            {isEditing && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="secondary" className="mt-4">
                    <FaPlus className="mr-2" />
                    Add Amenity
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {defaultAmenities.map((amenity) => (
                    <DropdownMenuItem
                      className="cursor-pointer flex"
                      key={amenity.id}
                      onClick={() => {
                        const amenityExists = editableAmenities.some(
                          (item) => item.id === amenity.id
                        );
                        if (!amenityExists) {
                          setEditableAmenities([
                            ...editableAmenities,
                            {
                              id: amenity.id,
                              name: amenity.name,
                              icon: amenity.icon,
                            },
                          ]);
                          return;
                        } else {
                          toast.error(
                            <p className="text-red-500">
                              {amenity.name} amenity is already added.
                            </p>
                          );
                        }
                      }}
                    >
                      <img src={amenity.icon} className="w-5 h-5" alt="" />
                      {amenity.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Right - Sidebar */}
          <div className="space-y-4">
            {/* Specific Conditions */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-4">
              <div className=" flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold ">Specific Conditions</h3>
                {isEditing && (
                  <FaPlus
                    className="w-4 h-4"
                    onClick={() => setConditions([...conditions, ""])}
                  />
                )}
              </div>
              <ul
                className={`list-disc ${
                  isEditing ? "" : "pl-5"
                } space-y-2 text-gray-600 dark:text-white text-sm`}
              >
                {conditions.map((item, index) =>
                  isEditing ? (
                    <li
                      key={index}
                      className="flex gap-1 border p-1 items-center"
                    >
                      <Input
                        value={item}
                        onChange={(e) => {
                          const updated = [...conditions];
                          updated[index] = e.target.value;
                          setConditions(updated);
                        }}
                        className="w-full border rounded px-2 py-1"
                      />
                      <button
                        onClick={() => handleDeleteCondition(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </li>
                  ) : (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
            </div>

            {/* Room Policies */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-4">
              <div className=" flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold ">Room Policies</h3>
                {isEditing && (
                  <FaPlus
                    className="w-4 h-4"
                    onClick={() => setPolicies([...policies, ""])}
                  />
                )}
              </div>
              <ul
                className={`list-disc ${
                  isEditing ? "" : "pl-5"
                } space-y-2 text-gray-600 dark:text-white text-sm`}
              >
                {policies.map((item, index) =>
                  isEditing ? (
                    <li
                      key={index}
                      className="flex gap-1 border p-1 items-center"
                    >
                      <Input
                        value={item}
                        onChange={(e) => {
                          const updated = [...policies];
                          updated[index] = e.target.value;
                          setPolicies(updated);
                        }}
                        className="w-full border rounded px-2 py-1"
                      />
                      <button
                        onClick={() => handleDeletePolicy(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </li>
                  ) : (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Room Details */}
        <div className="flex flex-col md:flex-row gap-2 *:w-full  w-full p-4">
          <div className="flex gap-2 *:w-full *:border *:rounded-md *:p-2">
            {/* Room Price */}
            <div>
              <p>Room Price: {!isEditing && `${details.price} $ US`}</p>
              {isEditing && (
                <Input
                  type="number"
                  value={details.price}
                  onChange={(e) =>
                    setDetails({ ...details, price: e.target.value })
                  }
                />
              )}
            </div>
            {/* Room Size */}
            <div>
              <p>Room Size: {!isEditing && `${details.roomSize} sq. ft`}</p>
              {isEditing && (
                <Input
                  type="number"
                  value={details.roomSize}
                  onChange={(e) =>
                    setDetails({ ...details, roomSize: e.target.value })
                  }
                />
              )}
            </div>
          </div>

          <div className="flex gap-2 *:w-full *:border *:rounded-md *:p-2">
            {/* Number of People */}
            <div>
              <p>Number of People: {!isEditing && details.numberOfPeople}</p>
              {isEditing && (
                <Input
                  type="number"
                  value={details.numberOfPeople}
                  onChange={(e) =>
                    setDetails({ ...details, numberOfPeople: e.target.value })
                  }
                />
              )}
            </div>
            {/* Bed Size */}
            <div>
              {!isEditing && <p>Bed Size: {details.bedsize}</p>}
              {isEditing && (
                <div>
                  <label htmlFor="bedsize">Bed Size</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="w-full border rounded-md cursor-pointer">
                      <Input type="text" id="bedsize" value={details.bedsize} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {BedSize.map((bed) => (
                        <DropdownMenuItem
                          key={bed.id}
                          onClick={() =>
                            setDetails({ ...details, bedsize: bed.name })
                          }
                        >
                          {bed.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
    </div>
  );
};

export default RoomDetail;
