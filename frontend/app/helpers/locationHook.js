'use client'
import { useState, useEffect } from 'react';

const useUserLocation = (fetchLocation) => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null,
  });

  useEffect(() => {
    if (!fetchLocation) {
      return; // Exit early if not ready to fetch location
    }

    const success = (position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
      });
    };

    const error = (error) => {
      setLocation({
        latitude: null,
        longitude: null,
        error: error.message,
      });
    };

    if (!navigator.geolocation) {
      setLocation((prevState) => ({
        ...prevState,
        error: 'Geolocation is not supported by your browser',
      }));
    } else {
      navigator.geolocation.getCurrentPosition(success, error,{ enableHighAccuracy: true });
    }
  }, [fetchLocation]); // Depend on fetchLocation to re-run the effect

  return location;
};

export default useUserLocation;
