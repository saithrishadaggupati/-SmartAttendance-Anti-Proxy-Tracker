import { useState } from "react";

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  loading: boolean;
}

/**
 * A custom hook to easily grab device coordinates and handle user permissions.
 */
export function useGeolocation() {
  const [location, setLocation] = useState<LocationState>({
    latitude: null,
    longitude: null,
    error: null,
    loading: false,
  });

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocation((prev) => ({
        ...prev,
        error: "Your browser doesn't support location tracking.",
      }));
      return;
    }

    setLocation((prev) => ({ ...prev, loading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          loading: false,
        });
      },
      (err) => {
        let humanMessage = "Failed to get your location.";
        
        // Handling the exact reasons why location tracking might fail
        if (err.code === err.PERMISSION_DENIED) {
          humanMessage = "Please enable location permissions in your browser settings to check in.";
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          humanMessage = "GPS signal is weak. Try moving closer to a window or stepping outside.";
        } else if (err.code === err.TIMEOUT) {
          humanMessage = "Location request timed out. Please try scanning again.";
        }

        setLocation({
          latitude: null,
          longitude: null,
          error: humanMessage,
          loading: false,
        });
      },
      {
        enableHighAccuracy: true, // Crucial for getting down to that strict 100m radius
        timeout: 10000,           // Give up after 10 seconds to avoid infinite spinning
        maximumAge: 0,            // Force a fresh GPS reading instead of using cached data
      }
    );
  };

  return { ...location, requestLocation };
}
