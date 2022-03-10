import { useEffect, useState } from "react";

interface ICoordState {
  latitude: number;
  longitude: number;
}

export default function useCoords() {
  const [coords, setCoords] = useState<ICoordState>({
    latitude: 0,
    longitude: 0,
  });
  const onSuccess = (coords: GeolocationPosition) => {
    setCoords({
      latitude: coords.coords.latitude,
      longitude: coords.coords.longitude,
    });
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess);
  }, []);
  return coords;
}
