import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from '@mui/material';
import './App.css';
import React, { useState, useEffect } from 'react';
import InfoBox from './components/InfoBox';
import Map from './components/Map';
import Table from './components/Table';
import LineGraph from './components/LineGraph';
import 'leaflet/dist/leaflet.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('WorldWide');
  const [dataByCountry, setDataByCountry] = useState({});
  const [mapCenter, setMapCenter] = useState([34.80746, -40.4796]);
  const [mapZoom, setMapZoom] = useState(3);

  const countryInfoFetch = async (countryCode) => {
    await fetch(
      `https://disease.sh/v3/covid-19/${
        countryCode === 'WorldWide' ? 'all' : 'countries/' + countryCode
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        if (countryCode === 'WorldWide') {
          setMapCenter([34.80746, -40.4796]);
        } else {
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        }

        // setMapCenter([51.505, -0.09]);
        setMapZoom(4);
        setDataByCountry(data);
        console.log('latitude', data.countryInfo.lat);
      });
  };

  useEffect(() => {
    const getCountries = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const countriesData = data.map((country) => ({
            name: country.country,
            case: country.cases,
          }));
          setCountries(countriesData);
        });
    };

    getCountries();
    countryInfoFetch('WorldWide');
  }, []);

  const onCountryChange = (e) => {
    // e.prevent.default();
    setCountry(e.target.value);
    countryInfoFetch(e.target.value);
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>welcome to covid 19 tracker</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value={'WorldWide'}>WorldWide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.name}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            title={'Coronavirus Cases'}
            cases={dataByCountry.todayCases}
            total={dataByCountry.cases}
          />
          <InfoBox
            title={'Recovered'}
            cases={dataByCountry.todayRecovered}
            total={dataByCountry.recovered}
          />
          <InfoBox
            title={'Deaths'}
            cases={dataByCountry.todayDeaths}
            total={dataByCountry.deaths}
          />
        </div>
        <Map center={mapCenter} zoom={mapZoom} />
      </div>
      <div className="app__right">
        <Card>
          <CardContent>
            <Table />
            <LineGraph />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
