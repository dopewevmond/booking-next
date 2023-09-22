"use client";
import React, { useEffect, useState } from "react";

const useGetCode = () => {
  const [error, setError] = useState(null);
  const [code, setCode] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const getRoomCode = async () => {
      // await
    };
  }, []);
  return { code, isLoading, error };
};

export default useGetCode;
