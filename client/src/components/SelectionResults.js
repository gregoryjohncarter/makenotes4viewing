import React, { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Icon from '@mui/material/Icon'

const SelectionResults = ({title, year, contentRating, genre, stars, plot, poster, director, runtime, loginStatus, bookmarkSelection, currentSelArr, bookmarksList, breadcrumbQuery}) => {
  const [openSummary, setOpenSummary] = useState(false);
  const [cooldownButton, setCooldownButton] = useState(false);

  useEffect(() => {
    if (cooldownButton) {
      setTimeout(() => {
        setCooldownButton(false)
      }, 1500);
    }
  }, [cooldownButton]);

  const handleBookmarks = (currentSel, selection) => {
    if (cooldownButton) {
      return;
    } else {
      bookmarkSelection(currentSel, selection);
      setCooldownButton(true);
    }
  }

  return ( <>
    <Grid container rowSpacing={4}>
      <Grid item xs={12} sm={7} md={7} lg={7} xl={7}>
        <h1 className='sel-title'>{title}</h1>
        <h3>Year: <span className='entry'>{year}</span></h3>
        <h3>Director: <span className='entry'>{director}</span></h3>
        <h3>Runtime: <span className='entry'>{runtime}</span></h3>
        <h3>Stars: <span className='entry'>{stars}</span></h3>
        <h3>Genres: <span className='entry'>{genre}</span></h3>
        <h3>Rating: <span className='entry-r'>{contentRating}</span></h3>
        <div style={{display: 'inline-flex', justifyContent: 'space-between'}}>
          <Button variant='contained' style={{marginLeft: '10px'}} onClick={() => setOpenSummary(true)}><span style={{fontSize:'12px'}}>Display plot summary</span></Button>
          {loginStatus &&    
            <Button 
              onClick={bookmarksList.some((bookmark) => bookmark.imdbID === currentSelArr.imdbID) ? () => handleBookmarks(currentSelArr, 'remove') : () => handleBookmarks(currentSelArr, 'add')} 
              variant='contained' color='inherit'
            >
              <Icon>bookmark</Icon><span style={{fontSize:'9px'}}>{bookmarksList.some((bookmark) => bookmark.imdbID === currentSelArr.imdbID) ? 'Unsave' : 'Save'}</span>
            </Button>
          }
        </div>
      </Grid>
      <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
      {breadcrumbQuery !== 'bookmarks' ? <img style={{marginTop: '-50px'}} src={poster} alt={title + 'img'}></img> : <img src={poster} alt={title + 'img'}></img>}
      </Grid>
    </Grid>
    <Modal
      open={openSummary}
      onClose={() => setOpenSummary(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    > 
      <Box display='flex' className='plot-modal mytbl' id='modal-modal-description'>
        <p>{plot}</p>
        <Button variant='text' style={{width: '50px', position: 'absolute', right: '0px', bottom:'0px'}} onClick={() => setOpenSummary(false)}>Close</Button>
      </Box>
    </Modal>
    </>
  )
}

export default SelectionResults;