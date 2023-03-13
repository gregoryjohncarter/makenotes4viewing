import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Icon from '@mui/material/Icon';

const FormSearch = () => {
  const [searchMode] = useState([
    {desc: 'Search by title', icon: ''},
    {desc: 'Search by genre', icon: ''}, 
    {desc: 'Search top 100 (TV)', icon: ''}, 
    {desc: 'Search top 100 (Film)', icon: ''}
  ]);
  const [searchType, setSearchType] = useState(searchMode[0]);
  const {desc, icon} = searchType;

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <TextField id='filled-basic' label={desc} variant='filled'/>
        <div className='search-toggle-container'>
          <Icon>arrow_left</Icon>
          <span className='change-mode'>change mode</span>
          <Icon>arrow_right</Icon>
        </div>
      </Grid>
      <Grid item xs={4}>
        <div className='ui-8'>xs=4</div>
      </Grid>
    </Grid>
  )
}

export default FormSearch;