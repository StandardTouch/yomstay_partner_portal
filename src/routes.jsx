import { createBrowserRouter, Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import App from "./App";
import SignInPage from "./pages/signIn_page";
import Spinner from "./components/Spinner";
import HotelPage from "./pages/hotelpage";
import RoomDetail from "./pages/roomdetail.jsx";
import HotelsScreen from "./screens/HotelsScreen";
import BookingListScreen from "./screens/BookingListScreen";
import { SidebarProvider } from "./components/ui/sidebar";
import Layout from "./pages/Layout";
import ReviewScreen from "./screens/ReviewScreen.jsx";
import SettingScreen from "./screens/SettingScreen.jsx";

// A wrapper component to protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return <Spinner />;
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <SidebarProvider>
      <Layout>{children}</Layout>
    </SidebarProvider>
  );
};

// A wrapper component for routes that should only be accessible to guests (e.g., login page)
const GuestRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return <Spinner />;
  }

  if (isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
  {
    path: "/hotel",
    element: (
      <ProtectedRoute>
        <HotelsScreen />
      </ProtectedRoute>
    ),
  },
  {
    path: "/bookinglist",
    element: (
      <ProtectedRoute>
        <BookingListScreen />
      </ProtectedRoute>
    ),
  },
  {
    path: "/review",
    element: (
      <ProtectedRoute>
        <ReviewScreen />
      </ProtectedRoute>
    ),
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <SettingScreen />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <GuestRoute>
        <SignInPage />
      </GuestRoute>
    ),
  },

  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
