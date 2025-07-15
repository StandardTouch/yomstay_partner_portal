import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Star } from "lucide-react";
import { FaRegEdit, FaSave, FaUpload } from "react-icons/fa";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import { MdOutlineStarOutline } from "react-icons/md";
import { MdOutlineStarPurple500 } from "react-icons/md";
import axios from "axios";

import {
  updateHotelName,
  updateHotelDescription,
  updateHotelLocation,
  addHotelImage,
  removeHotelImage,
  addAmenity,
  removeAmenity,
  updateStarRating,
  updateAmenityName,
  updatePrimaryImage,
  updateHotelCountry,
  updateHotelState,
  updateHotelCity,
} from "../features/hoteldetails/hoteldetails_slice";
import Layout from "./Layout";
import { SidebarProvider } from "../components/ui/sidebar";
import { AppSidebar } from "../components/Appsidebar";
import { Stepper, Step } from "react-form-stepper";
import { nanoid } from "@reduxjs/toolkit";

const Hotelpage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [editingField, setEditingField] = useState(null); // Track which field is being edited
  const [newHotelName, setNewHotelName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newAmenityName, setNewAmenityName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditingAmenity, setIsEditingAmenity] = useState(false);
  const [countries, setCountries] = useState([]);
  const inputRef = useRef(null);
  const hotelDescriptionRef = useRef(null);
  const hotelLocationRef = useRef(null);
  const inputNameRef = useRef(null);
  const inputDescriptionRef = useRef(null);
  const inputLocationRef = useRef(null);
  const [selectedCountryId, setSelectedCountryId] = useState(null);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedStateId, setSelectedStateId] = useState(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditingAmenity]);

  useEffect(() => {
    if (editingField === "hotelName" && inputNameRef.current) {
      inputNameRef.current.focus();
      inputNameRef.current.setSelectionRange(
        inputNameRef.current.value.length,
        inputNameRef.current.value.length
      );
    }
    if (editingField === "hotelDescription" && inputDescriptionRef.current) {
      inputDescriptionRef.current.focus();
      inputDescriptionRef.current.setSelectionRange(
        inputDescriptionRef.current.value.length,
        inputDescriptionRef.current.value.length
      );
    }
    if (editingField === "hotelLocation" && inputLocationRef.current) {
      inputLocationRef.current.focus();
      inputLocationRef.current.setSelectionRange(
        inputLocationRef.current.value.length,
        inputLocationRef.current.value.length
      );
    }
  }, [editingField]);

  useEffect(() => {
    if (selectedStateId) {
      // Fetch cities by stateId if available
      axios
        .get(
          `https://api.yomstay.com/api/v1/location/cities?stateId=${selectedStateId}`
        )
        .then((res) => setCities(res.data.data || []))
        .catch(() => setCities([]));
    } else if (selectedCountryId) {
      // Fallback to countryId if no state selected
      axios
        .get(
          `https://api.yomstay.com/api/v1/location/cities?countryId=${selectedCountryId}`
        )
        .then((res) => setCities(res.data.data || []))
        .catch(() => setCities([]));
    } else {
      setCities([]);
    }
  }, [selectedStateId, selectedCountryId]);

  const hotel = useSelector((state) => state.hotel);
  const dispatch = useDispatch();

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSetPrimaryImage = (image) => {
    dispatch(updatePrimaryImage(image));
  };
  const handlePrimaryImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(
          updatePrimaryImage({
            id: nanoid(),
            src: reader.result,
            alt: file.name,
          })
        );
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    axios
      .get("https://api.yomstay.com/api/v1/location/countries")
      .then((res) => setCountries(res.data.data || []))
      .catch(() => setCountries([]));

    axios
      .get(
        `https://api.yomstay.com/api/v1/location/states?countryId=${selectedCountryId}`
      )
      .then((res) => {
        setStates(res.data.data || []);
      })
      .catch(() => setStates([]));
  }, []);

  useEffect(() => {
    // Only fetch states if a country is selected
    if (selectedCountryId) {
      axios
        .get(
          `https://api.yomstay.com/api/v1/location/states?countryId=${selectedCountryId}`
        )
        .then((res) => {
          setStates(res.data.data || []);
        })
        .catch(() => {
          setStates([]);
        });
    } else {
      setStates([]); // Clear states if no country selected
    }
  }, [selectedCountryId]);

  const handleHotelNameChange = () => {
    dispatch(updateHotelName(newHotelName));
    setEditingField(null); // Close edit mode
  };

  const handleHotelDescriptionChange = () => {
    dispatch(updateHotelDescription(newDescription));
    setEditingField(null); // Close edit mode
  };

  const handleHotelLocationChange = () => {
    dispatch(updateHotelLocation(newLocation));
    setEditingField(null); // Close edit mode
  };

const handleAddAmenity = () => {
  console.log("Adding new amenity");
  
  const newId = nanoid();
  dispatch(addAmenity({ id: newId, name: "New Amenity" })); // Add with default name
  setNewAmenityName("New Amenity"); // Set initial value
  setIsEditingAmenity(newId); // Set editing mode for the new amenity

  // Focus after short delay (after rendering)
  setTimeout(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select(); // Optional: select the text for easy editing
    }
  }, 0);
};

const handleSaveAmenity = (id) => {
  if (newAmenityName.trim()) { // Only save if not empty
    dispatch(updateAmenityName({ id, name: newAmenityName.trim() }));
    setIsEditingAmenity(false);
  }
};


const handleEditAmenity = (id, name) => {
  setIsEditingAmenity(id);
  setNewAmenityName(name);

  setTimeout(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, 0);
};


const handleCancelAmenity = () => {
  // If it's a new amenity with empty name, remove it
  if (newAmenityName.trim() === "") {
    const newAmenity = hotel.amenities.find(a => a.id === isEditingAmenity);
    if (newAmenity && newAmenity.name === "") {
      dispatch(removeAmenity(isEditingAmenity));
    }
  }
  setIsEditingAmenity(false);
  setNewAmenityName("");
};

  const handleStarRatingChange = (rating) => {
    dispatch(updateStarRating(rating));
  };

  const handleAddImage = (event) => {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        dispatch(addHotelImage({ src: reader.result, alt: file.name }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (id) => {
    dispatch(removeHotelImage(id));
  };

  const handleEditField = (field) => {
    setEditingField(field);
    if (field === "hotelName") setNewHotelName(hotel.hotelName);
    if (field === "hotelDescription") setNewDescription(hotel.hotelDescription);
    if (field === "hotelLocation") setNewLocation(hotel.hotelLocation);
  };

  // Prepare country options for react-dropdown
  const countryOptions = countries.map((country) => ({
    value: country.id, // Use country.id instead of name
    label: country.name,
  }));

  const stateOptions = states.map((state) => ({
    value: state.id, // Store state ID in value
    label: state.name,
  }));

  const cityOptions = cities.map((city) => ({
    value: city.name,
    label: city.name,
  }));

  // Modify state dropdown onChange to store state ID
  const handleStateChange = (option) => {
    const selectedState = states.find((s) => s.id === option.value);
    dispatch(updateHotelState(selectedState.name));
    setSelectedStateId(selectedState.id);
  };

  return (
    <Layout>
      <div className="max-w-7xl  bg-[var(--color-bg)] mx-auto p-2  md:p-6">
        {/* Stepper */}
        <Stepper activeStep={activeStep} onStepChange={setActiveStep}>
          <Step label="Hotel Info" />
          <Step label="Hotel Images" />
          <Step label="Amenities" />
          <Step label="Star Rating" />
        </Stepper>

        {/* Step 1: Hotel Info */}
        {activeStep === 0 && (
          <div className="bg-[var(--color-bg-card)] shadow-md rounded-lg flex-col mb-4 px-4 py-4 flex border border-[var(--color-border)]">
            {/* Hotel Name */}
            <div className="text-lg border-[var(--color-border)] py-2 flex items-center justify-between md:text-xl font-semibold text-[var(--color-text)]">
              Name
              {editingField === "hotelName" ? (
                <div className="flex gap-2">
                  <button
                    className="bg-green-100 text-green-600 px-3 py-1 rounded-md text-sm"
                    onClick={handleHotelNameChange}
                  >
                    Save
                  </button>
                  <button
                    className="bg-red-100 text-red-600 px-3 py-1 rounded-md text-sm"
                    onClick={() => setEditingField(null)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <FaRegEdit
                  className="w-5 h-5 cursor-pointer hover:scale-125"
                  onClick={() => handleEditField("hotelName")}
                />
              )}
            </div>
            {editingField === "hotelName" ? (
              <input
                type="text"
                ref={inputNameRef}
                value={newHotelName}
                onChange={(e) => setNewHotelName(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            ) : (
              <div className="text-2xl px-2 border rounded md:text-3xl py-2 font-bold text-[var(--color-text)]">
                {hotel.hotelName}
              </div>
            )}

            {/* Hotel Description */}
            <div className="text-lg border-[var(--color-border)] flex items-center justify-between md:text-xl font-semibold py-2 text-[var(--color-text)]">
              Description
              {editingField === "hotelDescription" ? (
                <div className="flex gap-2">
                  <button
                    className="bg-green-100 text-green-600 px-3 py-1 rounded-md text-sm"
                    onClick={handleHotelDescriptionChange}
                  >
                    Save
                  </button>
                  <button
                    className="bg-red-100 text-red-600 px-3 py-1 rounded-md text-sm"
                    onClick={() => setEditingField(null)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <FaRegEdit
                  className="w-5 h-5 cursor-pointer hover:scale-125"
                  onClick={() => handleEditField("hotelDescription")}
                />
              )}
            </div>
            {editingField === "hotelDescription" ? (
              <textarea
                ref={inputDescriptionRef}
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="w-full p-2 border min-h-[120px] rounded-md"
              />
            ) : (
              <div className="text-base border rounded px-2 py-2 text-[var(--color-text)]">
                {hotel.hotelDescription}
              </div>
            )}

            {/* Hotel Location */}
            <div className="text-lg border-[var(--color-border)] flex items-center justify-between md:text-xl font-semibold py-2 text-[var(--color-text)]">
              Location
              {editingField === "hotelLocation" ? (
                <div className="flex gap-2">
                  <button
                    className="bg-green-100 text-green-600 px-3 py-1 rounded-md text-sm"
                    onClick={handleHotelLocationChange}
                  >
                    Save
                  </button>
                  <button
                    className="bg-red-100 text-red-600 px-3 py-1 rounded-md text-sm"
                    onClick={() => setEditingField(null)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <FaRegEdit
                  className="w-5 h-5 cursor-pointer hover:scale-125"
                  onClick={() => handleEditField("hotelLocation")}
                />
              )}
            </div>
            {editingField === "hotelLocation" ? (
              <textarea
                ref={inputLocationRef}
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            ) : (
              <div className="text-base border rounded px-2 py-2 text-[var(--color-text)]">
                {hotel.hotelLocation}
              </div>
            )}

            {/* Hotel Country */}
            <div className="text-lg border-[var(--color-border)] flex items-center justify-between md:text-xl font-semibold py-2 text-[var(--color-text)]">
              Country
            </div>
            <Dropdown
              options={countryOptions}
              onChange={(option) => {
                // Find the selected country object
                const selectedCountry = countries.find(
                  (c) => c.id === option.value
                );
                // Update both country name and ID
                dispatch(updateHotelCountry(selectedCountry.name));
                setSelectedCountryId(selectedCountry.id);
              }}
              value={hotel.hotelCountry}
              placeholder="Select Country"
              controlClassName="w-full p-2 border rounded-md mb-2 text-sm bg-white"
              menuClassName="max-h-32 overflow-y-auto text-sm"
              arrowClassName="text-sm"
            />

            {/* Hotel State */}
            <div className="text-lg border-[var(--color-border)] flex items-center justify-between md:text-xl font-semibold py-2 text-[var(--color-text)]">
              State
            </div>
            <Dropdown
              options={stateOptions}
              onChange={handleStateChange}
              value={hotel.hotelState}
              placeholder="Select State"
              controlClassName="w-full p-2 border rounded-md mb-2 text-sm bg-white"
              menuClassName="max-h-32 overflow-y-auto text-sm"
              arrowClassName="text-sm"
              disabled={!selectedCountryId}
            />

            {/* Hotel City */}
            <div className="text-lg border-[var(--color-border)] flex items-center justify-between md:text-xl font-semibold py-2 text-[var(--color-text)]">
              City
            </div>
            <Dropdown
              options={cityOptions}
              onChange={(option) => dispatch(updateHotelCity(option.value))}
              value={hotel.hotelCity}
              placeholder="Select City"
              controlClassName="w-full p-2 border rounded-md mb-2 text-sm bg-white"
              menuClassName="max-h-32 overflow-y-auto text-sm"
              arrowClassName="text-sm"
              disabled={!selectedStateId && !selectedCountryId}
            />
          </div>
        )}

        {/* Step 2: Hotel Images */}
        {activeStep === 1 && (
          <div className="bg-[var(--color-bg-card)] shadow-md rounded-lg px-4 py-4 mb-4 border border-[var(--color-border)]">
            {/* Primary Image */}
            <div className="mb-6">
              <div className="text-lg md:text-xl font-semibold text-[var(--color-text)] mb-2">
                Primary Image
              </div>
              {hotel.primaryImage ? (
                <div className="relative w-48 h-32">
                  <img
                    src={hotel.primaryImage.src}
                    alt={hotel.primaryImage.alt}
                    className="rounded-lg object-contain w-full h-full"
                  />
                  <button
                    onClick={() => dispatch(updatePrimaryImage(null))}
                    className="absolute top-2 right-2 bg-white text-red-500 rounded-full p-2"
                    title="Remove Primary Image"
                  >
                    <RiDeleteBin5Fill className="w-5 cursor-pointer  h-5" />
                  </button>
                </div>
              ) : (
                <div className="text-sm text-gray-500">
                  No primary image selected.
                </div>
              )}
            </div>

            {/* Other Images */}
            <div className="text-lg md:text-xl font-semibold  text-[var(--color-text)] mb-4">
              Images
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {hotel.hotelImages.map((image) => (
                <div key={image.id} className="relative group">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="rounded-lg object-contain  w-full h-32"
                  />
                  <div className="absolute top-2 right-2 flex flex-col gap-1">
                    <button
                      onClick={() => handleRemoveImage(image.id)}
                      className=" text-red-500 cursor-pointer bg-white rounded-full p-2"
                      title="Remove Image"
                    >
                      <RiDeleteBin5Fill className="w-5 h-5 bg" />
                    </button>
                    <button
                      onClick={() => handleSetPrimaryImage(image)}
                      className="bg-white rounded-full p-2 shadow-md"
                      title="Set as Primary"
                    >
                      {hotel.primaryImage?.id === image.id ? (
                        <MdOutlineStarPurple500 className="text-yellow-500 w-5 h-5" />
                      ) : (
                        <MdOutlineStarOutline className="text-gray-500 w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
              <div
                className="flex justify-center items-center bg-gray-200 rounded-lg cursor-pointer h-32"
                onClick={() => document.getElementById("image-upload").click()}
              >
                <FaUpload className="w-8 h-8" />
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAddImage}
                  style={{ display: "none" }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Amenities */}
        {activeStep === 2 && (
          <div className="bg-[var(--color-bg-card)] shadow-md rounded-lg px-4 py-4 mb-4 border border-[var(--color-border)]">
            <div className=" flex items-center justify-between md:text-xl font-semibold text-[var(--color-text)] mb-4">
              <div className="text-lg">Amenities</div>
              <IoIosAddCircleOutline
                className="w-6 h-6 hover:scale-125 cursor-pointer mr-3"
                onClick={handleAddAmenity}
              />
            </div>

            <div className="flex flex-col gap-2">
              {hotel.amenities.map((amenity) => (
               <div
    key={amenity.id}
    className="flex items-center justify-between px-4 py-2 border rounded-md bg-white"
  >
    {isEditingAmenity === amenity.id ? (
      <input
        type="text"
        ref={inputRef}
        value={newAmenityName}
        onChange={(e) => setNewAmenityName(e.target.value)}
        className="w-full p-2 border rounded-md mr-2"
      />
    ) : (
      <div className="text-[var(--color-text)] text-base font-medium">
        {amenity.name}
      </div>
                  )}

                  <div className="flex gap-2 items-center ml-2">
                    {isEditingAmenity === amenity.id ? (
                      <>
                        <button
                          onClick={() => handleSaveAmenity(amenity.id)}
                          className="bg-green-100 text-green-600 px-3 py-1 rounded-md text-sm"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelAmenity}
                          className="bg-red-100 text-red-600 px-3 py-1 rounded-md text-sm"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <FaRegEdit
                          className="w-4 h-4 hover:scale-125 text-gray-600 cursor-pointer"
                          onClick={() =>
                            handleEditAmenity(amenity.id, amenity.name)
                          }
                        />
                        <button
                          onClick={() => dispatch(removeAmenity(amenity.id))}
                          className="text-red-500 text-sm"
                        >
                          <MdDelete className="w-5 hover:scale-125 cursor-pointer h-5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Star Rating */}
        {activeStep === 3 && (
          <div className="bg-[var(--color-bg-card)] shadow-md rounded-lg px-4 py-4 mb-4 border border-[var(--color-border)]">
            <div className="text-lg md:text-xl font-semibold text-[var(--color-text)]">
              Star Rating
            </div>
            <select
              value={hotel.starRating}
              onChange={(e) => handleStarRatingChange(Number(e.target.value))}
              className="border rounded px-2 py-1"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n} Stars
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            disabled={activeStep === 0}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={activeStep === 3}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default function Hotel() {
  return (
    <SidebarProvider>
      <Hotelpage />
    </SidebarProvider>
  );
}
