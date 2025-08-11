import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { set } from "lodash";
import { Upload } from "lucide-react";

function AddRoom({ defaultAmenities, onAddRoom, setShow }) {
  //   console.log(defaultAmenities);
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
  const [details, setDetails] = useState({
    roomType: "",
    roomDescription: "",
    roomSize: "",
    numberOfPeople: "",
    bedsize: "",
    amenities: [],
    price: "",
    roomImage: "",
    conditions: [],
    policies: [],
  });

  const handleAddRoom = (e) => {
    e.preventDefault();
    if (
      !details.roomType ||
      !details.roomDescription ||
      !details.roomSize ||
      !details.numberOfPeople ||
      !details.bedsize ||
      !details.price
    ) {
      return toast.error(
        <p className="text-red-500">Please fill out all fields</p>
      );
    }
    onAddRoom(details);
    setShow();
  };
  return (
    <section className="flex flex-col gap-2">
      {/* Room Type */}
      <div>
        <label htmlFor="roomType">Room Type</label>
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full border rounded-md cursor-pointer">
            <Input type="text" id="roomType" value={details.roomType} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {RoomType.map((room) => (
              <DropdownMenuItem
                key={room.id}
                onClick={() => setDetails({ ...details, roomType: room.name })}
              >
                {room.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* Room Description */}
      <div>
        <label htmlFor="roomDescription">Room Description</label>
        <Input
          type="text"
          id="roomDescription"
          value={details.roomDescription}
          onChange={(e) =>
            setDetails({ ...details, roomDescription: e.target.value })
          }
          placeholder="Description"
        />
      </div>
      {/* Room Size and Number of People */}
      <div className=" flex gap-2 *:w-full">
        {/* Room Size */}
        <div>
          <label htmlFor="roomSize">Room Size</label>
          <Input
            type="text"
            id="roomSize"
            value={details.roomSize}
            onChange={(e) =>
              setDetails({ ...details, roomSize: e.target.value })
            }
            placeholder="170 sq. ft"
          />
        </div>
        {/* Number of People */}
        <div>
          <label htmlFor="numberOfPeople">Number of People</label>
          <Input
            type="text"
            id="numberOfPeople"
            value={details.numberOfPeople}
            onChange={(e) =>
              setDetails({ ...details, numberOfPeople: e.target.value })
            }
            placeholder="2"
          />
        </div>
      </div>
      {/* Bed Size and Price */}
      <div className=" flex gap-2 *:w-full">
        {/* Bed Size */}
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
                  onClick={() => setDetails({ ...details, bedsize: bed.name })}
                >
                  {bed.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* Price */}
        <div>
          <label htmlFor="price">Price</label>
          <Input
            type="number"
            id="price"
            value={details.price}
            onChange={(e) => setDetails({ ...details, price: e.target.value })}
            placeholder="$100"
          />
        </div>
      </div>
      {/* Amenities */}
      <div className="flex flex-col">
        <label htmlFor="amenities">Amenities</label>
        <DropdownMenu>
          {details.amenities.length === 0 && (
            <DropdownMenuTrigger>
              <Input type="text" id="amenities" placeholder="Amenities" />
            </DropdownMenuTrigger>
          )}
          {details.amenities.map((amenity) => (
            <div className="flex items-center p-2 gap-2 border ">
              <DropdownMenuTrigger className="flex items-center gap-1 w-full border rounded-md cursor-pointer min-h-10 ">
                <img
                  src={amenity.icon}
                  className="w-10 h-10"
                  alt={amenity.name}
                />
                <p>{amenity.name}</p>
              </DropdownMenuTrigger>
              <Badge
                variant="destructive"
                className="cursor-pointer"
                onClick={() => {
                  setDetails({
                    ...details,
                    amenities: details.amenities.filter(
                      (item) => item.id !== amenity.id
                    ),
                  });
                }}
              >
                X
              </Badge>
            </div>
          ))}
          <DropdownMenuContent>
            {defaultAmenities.map((amenity) => (
              <DropdownMenuItem
                className="cursor-pointer flex "
                key={amenity.id}
                onClick={() => {
                  const amenityExists = details.amenities.some(
                    (item) => item.id === amenity.id
                  );
                  if (!amenityExists) {
                    setDetails({
                      ...details,
                      amenities: [...details.amenities, amenity],
                    });
                    // handleCancel();
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
      </div>
      {/* Images */}
      <div className="w-full p-1">
        <div className="flex flex-col justify-center items-center w-full min-h-40 h-full rounded dark:bg-slate-800 bg-slate-300">
          <label
            htmlFor="addImage"
            className="cursor-pointer flex flex-col justify-center items-center w-full h-full text-sm"
          >
            {details.roomImage === "" ? (
              <p className="flex items-center gap-1">
                <Upload className="w-6" />
                Upload Image
              </p>
            ) : (
              <img
                src={details.roomImage.url}
                alt={details.roomImage.altText}
                className="w-full h-full object-cover"
              />
            )}
          </label>
          <input
            type="file"
            id="addImage"
            className="hidden"
            accept="image/*"
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
      </div>
      <Button className="cursor-pointer bg-pastelgreen text-navyblue-dark hover:bg-pastelgreen-dark" onClick={handleAddRoom}>
        Add Room
      </Button>
      <Toaster
        className="bg-red-500"
        position="top-center"
        toastOptions={{ duration: 1500 }}
      />
    </section>
  );
}

export default AddRoom;
