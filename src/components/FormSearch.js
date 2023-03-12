import React from 'react';

import Grid from '@mui/material/Grid';

const FormSearch = () => {

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <div className='ui-4'>xs=8</div>
      </Grid>
      <Grid item xs={4}>
        <div className='ui-8'>xs=4</div>
      </Grid>
    </Grid>
  )
}

export default FormSearch;