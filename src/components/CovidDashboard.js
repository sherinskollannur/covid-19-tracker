import React, { useState, useEffect } from 'react';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import LineGraph from './LineGraph';
import 'leaflet/dist/leaflet.css';
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from '@mui/material';
import '../App.css';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

function CovidDashboard() {
  const history = useHistory();

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('WorldWide');
  const [dataByCountry, setDataByCountry] = useState({});
  const [mapCenter, setMapCenter] = useState([34.80746, -40.4796]);
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [caseTypeVal, setCaseTypeVal] = useState('cases');

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
          setMapCountries(data);
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
    <>
      {/* style={{ margin: '10px 50px 0px 20px', textAlign: 'right' }} */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '10px 50px 0px 0px',
        }}
      >
        <Button
          variant="outlined"
          onClick={() => {
            history.push('/user_dashboard');
          }}
          color="error"
          style={{ marginRight: 10 }}
        >
          Dashboard
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            history.push('/user_dashboard');
          }}
        >
          Login
        </Button>
      </div>

      <div className="app">
        <div className="app__left">
          <div className="app__header">
            <h1>Welcome to covid 19 tracker</h1>
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
              isRed
              active={caseTypeVal === 'cases'}
              title={'Coronavirus cases'}
              cases={dataByCountry.todayCases}
              total={dataByCountry.cases}
              onClick={(e) => {
                setCaseTypeVal('cases');
              }}
            />
            <InfoBox
              active={caseTypeVal === 'recovered'}
              title={'Recovered'}
              cases={dataByCountry.todayRecovered}
              total={dataByCountry.recovered}
              onClick={(e) => {
                setCaseTypeVal('recovered');
              }}
            />
            <InfoBox
              isRed
              active={caseTypeVal === 'deaths'}
              title={'Deaths'}
              cases={dataByCountry.todayDeaths}
              total={dataByCountry.deaths}
              onClick={(e) => {
                setCaseTypeVal('deaths');
              }}
            />
          </div>
          <Map
            center={mapCenter}
            zoom={mapZoom}
            countries={mapCountries}
            caseType={caseTypeVal}
          />
        </div>
        <div className="app__right">
          <Card>
            <CardContent>
              <Table />
              <LineGraph caseType={caseTypeVal} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

export default CovidDashboard;
