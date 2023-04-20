import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const SelectionResults = ({title, year, contentRating, genre, stars, plot, poster, director, runtime}) => {
  const [openSummary, setOpenSummary] = useState(false);

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
        <Button variant='contained' style={{marginLeft: '10px'}} onClick={() => setOpenSummary(true)}>Display plot summary</Button>
      </Grid>
      <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
        <img src={poster} alt={title + 'img'}></img>
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