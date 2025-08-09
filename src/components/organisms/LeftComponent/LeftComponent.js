import React from 'react';

const LeftComponent = ({ selectedDate, handleDate, handleForm }) => {
  return (
    <div style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
      <h2>Wybierz datę</h2>
      <form onSubmit={handleForm}>
        <input
          type="date"
          value={selectedDate.fullDate || ''}
          onChange={handleDate}
          required
        />
        <button type="submit" style={{ marginLeft: '0.5rem' }}>Pobierz dane</button>
      </form>
    </div>
  );
};

export default LeftComponent;
