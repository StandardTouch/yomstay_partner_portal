import { configureStore } from "@reduxjs/toolkit";
import hotelreducer from "../features/hoteldetails/hoteldetails_slice";

export const store = configureStore({
    reducer: {
        hotel : hotelreducer
    },
});