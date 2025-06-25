import { createBrowserRouter, Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import App from "./App";
import SignInPage from "./pages/signIn_page";
import Spinner from "./components/Spinner";

// A wrapper component to protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return <Spinner />;
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
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
