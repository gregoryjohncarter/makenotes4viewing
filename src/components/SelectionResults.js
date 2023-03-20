import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const SelectionResults = ({title, year, contentRating, genre, stars, plot, poster, score, type, awards, director, runtime}) => {
  const [openSummary, setOpenSummary] = useState(false);

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#d3d3d3dd',
    borderTop: '10px solid black',
    borderLeft: '10px solid black',
    flexDirection: 'column',
    padding: '20px'
  };

  return ( <>
    <Grid container rowSpacing={4}>
      <Grid item xs={12} sm={7} md={7} lg={7} xl={7}>
        <h1 className='sel-title'>{title}</h1>
        <h3>Year: {year}</h3>
        <h3>Director: <span className='entry'>{director}</span></h3>
        <h3>Runtime: <span className='entry'>{runtime}</span></h3>
        <h3>Stars: <span className='entry'>{stars}</span></h3>
        <h3>Genres: <span className='entry'>{genre}</span></h3>
        <h3>Content Rating: <span className='entry'>{contentRating}</span></h3>
        <h3>Awards: <span className='entry'>{awards}</span></h3>
        <h3>Rotten Tomatoes: <span className='entry'></span></h3>
        <Button variant='contained' onClick={() => setOpenSummary(true)}>Display plot summary</Button>
      </Grid>
      <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
        <img src={poster}></img>
      </Grid>
    </Grid>
    <Modal
      open={openSummary}
      onClose={()=>setOpenSummary(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    > 
      <Box display='flex' style={modalStyle} className='modal-style mytbl' id='modal-modal-description'>
        <p style={{fontFamily: 'Lucida Sans', fontSize: '15px'}}>{plot}</p>
        <Button variant='text' style={{width: '50px', position: 'absolute', right: '0px', bottom:'0px'}} onClick={() => setOpenSummary(false)}>Close</Button>
      </Box>
    </Modal>
    </>
  )
}

export default SelectionResults;