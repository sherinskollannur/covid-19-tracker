import React, { useMemo, useState, useCallback, useEffect } from 'react';
import {
  MapContainer as LeafletMap,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';
import './Map.css';
import 'leaflet/dist/leaflet.css';

function Map({ center, zoom }) {
  const [map, setMap] = useState(null);
  console.log('center', map);

  const onClick = () => {
    map.setView(center, zoom);
  };

  const displayMap = useMemo(
    () => (
      <LeafletMap
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </LeafletMap>
    ),
    [center]
  );

  setTimeout(() => {
    onClick();
  }, 200);

  return (
    <div className="map">
      <LeafletMap
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </LeafletMap>
    </div>
  );
}

export default Map;
