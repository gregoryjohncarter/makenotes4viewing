import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Icon from '@mui/material/Icon';
import Button from '@mui/material/Button';

const FormSearch = () => {
  const [searchMode] = useState([
    {desc: 'Search by title', icon: '', disabledInput: false},
    {desc: 'Search by genre', icon: '', disabledInput: false}, 
    {desc: 'Search top 100 (TV)', icon: '', disabledInput: true}, 
    {desc: 'Search top 100 (Film)', icon: '', disabledInput: true}
  ]);
  const [searchType, setSearchType] = useState(searchMode[0]);
  const {desc, icon, disabledInput} = searchType;
  const [togglePallet, setTogglePallet] = useState(false);

  const switchMode = (current, direction) => {
    if (direction === 'forwards') {
      if (current === searchMode[3]) {
        setSearchType(searchMode[0]);
      } else {
        let index = searchMode.indexOf(current);
        setSearchType(searchMode[index + 1]);
      }
    } else {
      if (current === searchMode[0]) {
        setSearchType(searchMode[3]);
      } else {
        let index = searchMode.indexOf(current);
        setSearchType(searchMode[index - 1]);
      }
    }
    if (!togglePallet) {
      setTogglePallet(true);
      setTimeout(() => {
        setTogglePallet(false);
      }, 1500)
    }
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={8}>
        <div  className={togglePallet ? 'search-container search-mode-change' : 'search-container'}>
          <h2>Make Notes 4 Viewing </h2>
          <TextField id='filled-basic' label={desc} variant='filled' disabled={disabledInput} fullWidth style={{backgroundColor:'whitesmoke'}}/>
          <div className='search-toggle-container'>
            <Button onClick={()=> switchMode(searchType, 'backwards')} variant='secondary'>
              <Icon style={{color: '#222'}}>arrow_left</Icon>
            </Button>
            <span className='change-mode'>
              change mode
            </span>
            <Button onClick={()=> switchMode(searchType, 'forwards')} variant='secondary'>
              <Icon style={{color: '#222'}}>arrow_right</Icon>
            </Button>
          </div>
        </div>
      </Grid>
      <Grid item xs={4}>
        <div className='ui-8'>xs=4</div>
      </Grid>
    </Grid>
  )
}

export default FormSearch;