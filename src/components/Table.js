import React from 'react';
import '../styles/table.css';

const Table = ({ data, searchQuery, currentPage, itemsPerPage }) => {
  const startingIndex = (currentPage - 1) * itemsPerPage;

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
        {searchQuery === '' ? (
          <tr>
            <td colSpan="3" className="start-searching">Start searching...</td>
          </tr>
        ) : data.length === 0 ? (
          <tr>
            <td colSpan="3" className="no-results">No results found</td>
          </tr>
        ) : (
          data.map((city, index) => (
            <tr key={city.id}>
              <td>{startingIndex + index + 1}</td>
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
          ))
        )}
      </tbody>
    </table>
  );
};

export default Table;
