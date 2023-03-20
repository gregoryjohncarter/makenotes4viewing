import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

// import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Icon from '@mui/material/Icon';

const SelectionResults = ({title, year, contentRating, genre, stars, plot, poster, rating, type, director, runtime}) => {
  const [expandedScore, setExpandedScore] = useState(false);
  const [openSummary, setOpenSummary] = useState(false);

  const handleChange = (openState) => {
    if (openState) {
      setExpandedScore(false);
    } else {
      setExpandedScore(true);
    }
  }

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
        <h3>Year: <span className='entry'>{year}</span></h3>
        <h3>Director: <span className='entry'>{director}</span></h3>
        <h3>Runtime: <span className='entry'>{runtime}</span></h3>
        <h3>Stars: <span className='entry'>{stars}</span></h3>
        <h3>Genres: <span className='entry'>{genre}</span></h3>
        <h3>Rating: <span className='entry'>{contentRating}</span></h3>
        {rating.length && 
          <Accordion expanded={expandedScore} onChange={handleChange(expandedScore)}>
            <AccordionSummary aria-controls="panel-content" id="panel-header">
              <h2 style={{backgroundColor: 'darkgrey'}}>Critic score:</h2>
            </AccordionSummary>
            <AccordionDetails>
              {rating.map((score) => {
                return <p className='source-score'>{score.Source}: <span className='critic-score'>{score.Value}</span></p>
              })}
            </AccordionDetails>
          </Accordion>
        }
        <Button variant='contained' onClick={() => setOpenSummary(true)}>Display plot summary</Button>
      </Grid>
      <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
        <img src={poster} alt={title + 'img'}></img>
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