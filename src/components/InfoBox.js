import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import './InfoBox.css';

function InfoBox({ title, cases, total, onClick, active, isRed }) {
  return (
    <Card
      className={`infoBox ${active && 'infoBox--selected'} ${
        isRed && 'infoBox--red'
      }`}
      onClick={onClick}
    >
      <CardContent>
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>
        <h2 className="infoBox__cases">
          {' '}
          {cases !== undefined ? '+' + (cases / 1000).toFixed() + 'k' : ''}
        </h2>
        <Typography>
          <p className="infoBox__total">
            {total !== undefined
              ? total > 1000000
                ? '+' + (total / 1000000).toFixed() + 'm Total'
                : '+' + (total / 1000).toFixed() + 'k Total'
              : ''}
          </p>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
