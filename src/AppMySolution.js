import "./index";
import { useState, useRef, useEffect } from "react";
import { useGeolocation } from "./useGeolocation";

export default function App() {
  // const [countClicks, setCountClicks] = useState(0);
  // setCountClicks((count) => count + 1);

  const countClicksRef = useRef(0);

  const { lat, lng, getPosition, error, isLoading } = useGeolocation();

  function handleClick() {
    countClicksRef.current++;
    getPosition();
  }

  return (
    <div>
      <button onClick={handleClick} disabled={isLoading}>
        Get my position
      </button>

      {isLoading && <p>Loading position...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && lat && lng && (
        <p>
          Your GPS position:{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
          >
            {lat}, {lng}
          </a>
        </p>
      )}

      <p>You requested position {countClicksRef.current} times</p>
    </div>
  );
}
