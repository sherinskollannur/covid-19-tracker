import React, { useMemo, useState, useCallback, useEffect } from 'react';
import {
  MapContainer as LeafletMap,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';
import './Map.css';
import 'leaflet/dist/leaflet.css';
import { showDataOnMap } from '../utils/utils';

const Onclick = ({ map, center, zoom }) => {
  useEffect(() => {
    map.setView(center, zoom);
  }, [center]);
};

function Map({ center, zoom, countries, caseType }) {
  const [map, setMap] = useState(null);

  const onClick = (map, center, zoom) => {
    map.setView(center, zoom);
  };

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
        {showDataOnMap(countries, caseType)}
      </LeafletMap>
      {/* onClick function calling */}
      {/* {map !== null && onClick(map, center, zoom)} */}

      {/* Onclick component calling */}
      {map !== null && <Onclick center={center} zoom={zoom} map={map} />}
    </div>
  );
}

export default Map;
