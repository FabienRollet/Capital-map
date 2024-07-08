import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function Screen1() {
  useEffect(() => {
    const map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([51.505, -0.09]).addTo(map)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      .openPopup();

    return () => {
      map.remove();
    };
  }, []);

  return (
    <>
      <p>screen1</p>
      <div id="map" style={{ height: '500px', width: '100%' }}></div>
    </>
  );
}