import React from 'react';

import SelectionResults from '../components/SelectionResults.js';
import CategoriesInput from '../components/CategoriesInput.js';
import MapResponse from '../components/MapResponse.js';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const ContainerResults = ({currentResultsArr, currentSel, setCurrentSel, currentSelArr}) => {
  return (
    <Grid container rowSpacing={2}>
      <Grid item xs={12}>
        {!currentResultsArr ? 
          <div className='results-div-e'>
            <Box display='flex' justifyContent='center' alignItems='center'>
              <Button size='small' variant='outlined' disabled>Begin by searching</Button>
            </Box>
          </div>
           :
          <div className='results-div'>
            <MapResponse/>
          </div>
        }
      </Grid>
    </Grid>
  )
}

export default ContainerResults;