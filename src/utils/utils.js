import { Circle, Popup } from 'react-leaflet';

export const sortData = (data) => {
  return data.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

export const showDataOnMap = (data, casesType) => {
  const casesTypeColors = {
    cases: {
      hex: '#CC1034',
      multiplier: 200,
    },
    recovered: {
      hex: '#7dd71d',
      multiplier: 200,
    },
    deaths: {
      hex: '#fb4443',
      multiplier: 300,
    },
  };

  return data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      pathOptions={{
        fillColor: casesTypeColors[casesType].hex,
        color: casesTypeColors[casesType].hex,
      }}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div>
          <img src={`${country.countryInfo.flag}`} alt="Paris" width="120" />
          <div>
            <strong>{country.country}</strong>
          </div>
          <div>Cases : {country.cases}</div>
          <div>Recovered : {country.recovered}</div>
          <div>Deaths : {country.deaths}</div>
        </div>
      </Popup>
    </Circle>
  ));
};
