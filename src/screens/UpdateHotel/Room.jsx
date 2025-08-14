import React, { useState } from "react";
import RoomDetail from "../../pages/roomdetail";
import { IoIosBed } from "react-icons/io";
import { BsFillPeopleFill } from "react-icons/bs";
import AlertBox from "../../components/Alert_box";

function Room({
  updateNewRoom,
  setUpdateNewRoom,
  setShowRoom,
  defaultAmenities,
}) {
  const [showUpdateRoom, setShowUpdateRoom] = useState(false);
  const [roomIndex, setRoomIndex] = useState(null);
  return (
    <div className="w-full flex gap-3 flex-col ">
      {showUpdateRoom && (
        <RoomDetail
          updateNewRoom={updateNewRoom[roomIndex]}
          defaultAmenities={defaultAmenities}
          onBack={() => {
            setShowUpdateRoom(false);
            setShowRoom(true);
          }}
        />
      )}
      {showUpdateRoom === false &&
        updateNewRoom.map((room, index) => (
          <div className="border-2 p-2 border-blue-200 rounded-md flex flex-col gap-2 relative">
            <div
              className="flex md:flex-row flex-col gap-2 w-full cursor-pointer "
              onClick={() => {
                setShowUpdateRoom(!showUpdateRoom);
                setShowRoom(false);
                setRoomIndex(index);
              }}
            >
              {/* room image */}
              <div className="w-full rounded-md overflow-hidden ">
                <img
                  src={room.roomImage.url}
                  className="w-full object-cover h-full"
                  alt={room.roomImage.altText}
                />
              </div>
              {/* room details */}
              <div className="flex flex-col gap-2 items-center border-2 rounded-md p-2 w-full *:border-b-2 *:w-full *:last:border-b-0">
                <div>
                  <h2 className="text-sm font-medium ">Room Type</h2>
                  <h2 className="text-lg font-medium ">{room.roomType}</h2>
                </div>
                <div className="flex flex-row gap-2 *:w-full">
                  <div className="">
                    <h2 className="text-sm font-medium">Room Size</h2>
                    <h2 className="text-lg font-medium ">
                      {room.roomSize} sq. ft
                    </h2>
                  </div>
                  <div>
                    <h2 className="text-sm font-medium">Number of People</h2>
                    <h2 className="text-lg font-medium flex items-center gap-1">
                      {room.numberOfPeople}
                      <BsFillPeopleFill size={16} />
                    </h2>
                  </div>
                </div>

                <div className="flex gap-2 *:w-full">
                  {/* bed size */}
                  <div>
                    <h2 className="text-sm font-medium">Bed Size</h2>
                    <h2 className="text-lg font-medium flex items-center gap-1">
                      {room.bedsize}
                      <IoIosBed size={16} />
                    </h2>
                  </div>
                  {/* room price */}
                  <div>
                    <h2 className="text-sm font-medium">Room Price</h2>
                    <h2 className="text-lg font-medium ">{room.price} $US</h2>
                  </div>
                </div>
                {/* room description */}
                <div>
                  <h2 className="text-sm font-medium">Room Description</h2>
                  <p className="text-sm mb-8 font-medium">
                    {room.roomDescription.slice(0, 150)}...
                  </p>
                </div>
              </div>
            </div>
            <AlertBox
              Check="Room"
              onDelete={() => {
                updateNewRoom.splice(index, 1);
                setUpdateNewRoom([...updateNewRoom]);
              }}
            />
            {/* amenities */}
            <div className="w-full border-2 rounded-md p-2 hidden">
              <h2 className="text-lg font-medium">Amenities</h2>
              <div className="flex gap-2">
                {room.amenities.map((amenity) => (
                  <div className="flex items-center gap-2 border-2 p-2 rounded-md">
                    <img src={amenity.icon} className="w-10 h-10" alt="" />
                    <h2 className="text-md font-medium">{amenity.name}</h2>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Room;
