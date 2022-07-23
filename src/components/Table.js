import React, { useEffect, useState } from 'react';
import './Table.css';
import { sortData } from '../utils/utils';

function Table() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch(`https://disease.sh/v3/covid-19/countries`)
      .then((res) => res.json())
      .then((data) => {
        const sortedData = sortData(data);
        setCountries(sortedData);
      });
  }, []);

  return (
    <div className="table">
      <h2>Live cases by country</h2>

      {countries.map(({ country, cases }) => (
        <tr>
          <td>{country}</td>
          <td>
            <strong>{cases}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
