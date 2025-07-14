import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  hotelName: "Aloft Harlem",
  hotelDescription: "Down the street from the 125th Street subway station...",
  hotelLocation: "New York, USA",
  hotelCountry: "USA",  // New state for country
  hotelState: "New York", // New state for state
  hotelCity: "New York",  // New state for city
  hotelPostalCode: "10027", 
  
  primaryImage: null,
// New state for postal code
  hotelImages: [
    
    
  ],
  amenities: [
    { id: nanoid(), name: "Free Wi-Fi" },
    { id: nanoid(), name: "Fitness Room" },
    { id: nanoid(), name: "Bar" },
  ],
  starRating: 4,
};

export const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    updatePrimaryImage: (state, action) => {
  state.primaryImage = action.payload;
},
    updateHotelName: (state, action) => {
      state.hotelName = action.payload;
    },
    updateHotelDescription: (state, action) => {
      state.hotelDescription = action.payload;
    },
    updateHotelLocation: (state, action) => {
      state.hotelLocation = action.payload;
    },
    updateHotelCountry: (state, action) => {  // New action for country
      state.hotelCountry = action.payload;
    },
    updateHotelState: (state, action) => {  // New action for state
      state.hotelState = action.payload;
    },
    updateHotelCity: (state, action) => {  // New action for city
      state.hotelCity = action.payload;
    },
    updateHotelPostalCode: (state, action) => {  // New action for postal code
      state.hotelPostalCode = action.payload;
    },
    addHotelImage: (state, action) => {
      const newImage = { id: nanoid(), src: action.payload.src, alt: action.payload.alt };
      state.hotelImages.push(newImage);
    },
    removeHotelImage: (state, action) => {
      state.hotelImages = state.hotelImages.filter(image => image.id !== action.payload);
    },
    updateHotelImage: (state, action) => {
      state.hotelImages = state.hotelImages.map(image =>
        image.id === action.payload.id ? { ...image, ...action.payload } : image
      );
    },
    addAmenity: (state, action) => {
      const newAmenity = { id: nanoid(), name: action.payload };
      state.amenities.push(newAmenity);
    },
    removeAmenity: (state, action) => {
      state.amenities = state.amenities.filter(amenity => amenity.id !== action.payload);
    },
    updateAmenity: (state, action) => {
      state.amenities = state.amenities.map(amenity =>
        amenity.id === action.payload.id ? { ...amenity, name: action.payload.name } : amenity
      );
    },
    updateStarRating: (state, action) => {
      state.starRating = action.payload;
    },
    updateAmenityName: (state, action) => {
      const { id, name } = action.payload;
      const amenity = state.amenities.find((a) => a.id === id);
      if (amenity) {
        amenity.name = name;
      }
    },
  },
});

export const {
  updateHotelName,
  updateHotelDescription,
  updateHotelLocation,
  updateHotelCountry,
  updateHotelState,
  updateHotelCity,
  updateHotelPostalCode,
  addHotelImage,
  removeHotelImage,
  updateHotelImage,
  addAmenity,
  removeAmenity,
  updateAmenity,
  updateStarRating,
    updatePrimaryImage,

  updateAmenityName,
} = hotelSlice.actions;

export default hotelSlice.reducer;
