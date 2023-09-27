"use client"
import React, { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

const LogoutButton = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [hasLoggedOut, setHasLoggedOut] = useState(false);

  const logout = async () => {
    try {
      setIsLoggingOut(true);
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Logout failed");
      setHasLoggedOut(true);
      if (window) {
        window.location.href = "/";
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoggingOut(false);
    }
  };
  return (
    <button
      onClick={logout}
      className="flex items-center justify-center mx-auto text-sm text-center font-medium transition-colors text-red-950 hover:text-red-700 py-2 px-4 border border-solid border-red-500 bg-red-400 hover:bg-red-300 rounded-lg"
    >
      {isLoggingOut && <LoadingSpinner />}
      {isLoggingOut
        ? "Logging out..."
        : hasLoggedOut
        ? "Redirecting to Home"
        : "Logout"}
    </button>
  );
};

export default LogoutButton;
