import React from 'react';
import '../styles/table.css';

const Table = ({ data, isLoading }) => {
  if (isLoading) {
    return <div className="spinner">Loading...</div>;
  }

  if (data.length === 0) {
    return <div className="no-results">No results found</div>;
  }

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Place Name</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        {data.map((city, index) => (
          <tr key={city.id}>
            <td>{index + 1}</td>
            <td>{city.city}</td>
            <td>
              <img
                src={`https://flagsapi.com/${city.countryCode}/flat/32.png`}
                alt={`${city.country} flag`}
                className="flag"
              />
              {city.country}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
