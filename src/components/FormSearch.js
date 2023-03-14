import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Icon from '@mui/material/Icon';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const FormSearch = ({searchType, setSearchType, searchMode, JSONloading, setJSONloading}) => {
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

  const {desc, icon, disabledInput} = searchType;

  return (
    <Grid container spacing={4}>
      <Grid item xs={8}>
        <div className={togglePallet ? 'search-container search-mode-change' : 'search-container'}>
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
      <Grid item xs={4} alignSelf='center'>
        <Box className='request-container'>
          {!JSONloading ? 
            <>
              <div className='bg-0'></div>
              <div className='bg-0 bg2'></div>
              <div className='bg-0 bg3'></div>
            </> :
            <>
              <div className='bg'></div>
              <div className='bg bg2'></div>
              <div className='bg bg3'></div>
            </>
          }
          <Button onClick={()=>setJSONloading(true)} color='secondary' variant='contained' startIcon={<Icon>search</Icon>} size='large' className='req-btn'>
            <span style={{fontSize: '.75em'}}>Search</span>
          </Button>
          <h2 style={{fontFamily: 'serif', fontSize: '1em', opacity: .5}}>IMDb API</h2>
        </Box>
      </Grid>
    </Grid>
  )
}

export default FormSearch;