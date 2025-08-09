import React from 'react';

const CurrentSlideInfo = ({ data, currentSlideIndex }) => {
  if (!data || data.length === 0) return null;

  const slide = data[currentSlideIndex];

  return (
    <div style={{ marginTop: '1rem', padding: '1rem', background: '#eef', borderRadius: '8px' }}>
      <h3>Informacje o zdjęciu</h3>
      <p><strong>Data:</strong> {slide.date}</p>
      <p><strong>Opis:</strong> {slide.caption}</p>
      <p><strong>Pozycja satelity:</strong> {`Lat: ${slide.centroid_coordinates.lat}, Lon: ${slide.centroid_coordinates.lon}`}</p>
    </div>
  );
};

export default CurrentSlideInfo;
