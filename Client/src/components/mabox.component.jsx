
import React, { useRef, useEffect, useState } from "react";

import "./styles.css";
import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken =
  "pk.eyJ1IjoiYnNhbHBzaW5naCIsImEiOiJja25mczUyeW4xOWx6MnFvYTEzYnF5ZHp3In0.khKBWsomk96-8wdGJ2IbxQ";

const Map = () => {
  const mapContainer = useRef();
  const [lng, setLng] = useState(83.4604642);
  const [lat, setLat] = useState(27.5066168);
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    var marker1 = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    return () => map.remove();
  }, []);

  return (
    <div>
      <div className="map-container" ref={mapContainer} />
    </div>
  );
};
export default Map;
