import React from 'react';

import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';

const MapResults = () => {

  return (
    <Grid container rowSpacing={2} columnSpacing={1}>
      <Grid item xs={8}>
        <div>1<Icon>settings</Icon></div>
      </Grid>
      <Grid item xs={8}>
        <div>2</div>
      </Grid>
      <Grid item xs={8}>
        <div>3</div>
      </Grid>
    </Grid>
  )
}

export default MapResults;