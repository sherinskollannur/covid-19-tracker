import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { display } from '@mui/system';
import { Button } from '@mui/material';
import { useLocation } from 'react-router-dom';

function DonateInfo() {
  const location = useLocation();
  const [quantity, setQuantity] = useState(1);

  //   useEffect(() => {}, [quantity]);
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Vaccine Information</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <TextField
          id="outlined-read-only-input"
          label="Country"
          defaultValue={location.state.country}
          InputProps={{
            readOnly: true,
          }}
          style={{ margin: 25, marginBottom: 5 }}
        />
        <TextField
          id="outlined-read-only-input"
          label="Vaccine"
          defaultValue={location.state.vaccine}
          InputProps={{
            readOnly: true,
          }}
          style={{ margin: 10 }}
        />

        <TextField
          id="outlined-number"
          label="Quantity"
          defaultValue={quantity}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          style={{ margin: 10 }}
          onChange={(e) => {
            setQuantity(e.target.value);
          }}
        />
        <TextField
          id="outlined-read-only-input"
          label="Price"
          defaultValue={location.state.price * quantity}
          value={location.state.price * quantity}
          InputProps={{
            readOnly: true,
          }}
          style={{ margin: 10 }}
        />

        <Button
          variant="contained"
          color="success"
          width="10px"
          onClick={() => {}}
          style={{ margin: 5 }}
        >
          Pay Now
        </Button>
      </div>
    </div>
  );
}

export default DonateInfo;
