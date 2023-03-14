import React from 'react';

import SelectionResults from '../components/SelectionResults.js';
import CategoriesInput from '../components/CategoriesInput.js';
import MapResponse from '../components/MapResponse.js';

import Grid from '@mui/material/Grid';

const ContainerResults = () => {
  return (
    <Grid container rowSpacing={2}>
      <Grid item xs={12}>
        <div className='results-div'>
          <MapResponse/>
        </div>
      </Grid>
    </Grid>
  )
}

export default ContainerResults;