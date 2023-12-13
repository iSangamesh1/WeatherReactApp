import React from 'react';
import SavedWeatherDetails from './SavedWeatherDetails';

const SavedWeatherDetailsPage = ({ savedCities, onRemoveCity }) => {
  return (
    <div>
      <h2>Saved Weather Details</h2>
      <SavedWeatherDetails savedCities={savedCities} onRemoveCity={onRemoveCity} />
    </div>
  );
};

export default SavedWeatherDetailsPage;