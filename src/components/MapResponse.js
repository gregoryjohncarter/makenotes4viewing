import React, { useState, memo } from 'react';

import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';
import Button from '@mui/material/Button';

const MapResponse = memo(function MapResponse({currentResultsArr, JSONloading, secondaryLoading, currentPage, requestSelectionInfo, detailDisplay}) {
  const ResItem = ({title, altTitle, imdbID, altID, index, count, currentPage, detailDisplay}) => {
    const stylesWheel = ['#0b69b1', '#0277bd', '#0288d1', '#2a67cf', '#1976d2'];
    let alternation = 'grey';
    let textColor = 'lightgrey';
    if (count % 2 === 0) {
      alternation = 'aliceblue'
      textColor = 'grey'
    }
    const counterStyle = {
      borderRadius: '50%',
      width: '10px',
      height: '10px',
      padding: '8px',
      background: alternation,
      fontFamily: 'Perpetua',
      border: '2px solid #666',
      color: textColor,
      textAlign: 'center',
      cursor: 'default'
    }
    const spanStyle = {
      '--i': `${count}`
    };
    const [hideQueue, setHideQueue] = useState(true);
    let timeVal = count * 122;
    setTimeout(() => {
      setHideQueue(false);
    }, timeVal);
    let countAdj = (currentPage * 30 - 30) + count;

    return (
      !hideQueue && <>
        <div style={spanStyle} className='load-in'>
          {count === 0 && <hr></hr>}
          <span style={counterStyle}>
            {countAdj + 1}
          </span>
          <Button disabled variant='text'>
            <span style={{color: stylesWheel[index]}} className='trim'>
              {title !== null && title}
              {altTitle !== null && altTitle}
            </span>
          </Button>
          <Button variant='outlined' 
            disabled={JSONloading || secondaryLoading || detailDisplay === imdbID} 
            onClick={imdbID === undefined ? () => requestSelectionInfo(altID) : () => requestSelectionInfo(imdbID)} 
            style={{width:'85px'}}
          >
            {(detailDisplay === imdbID && altID === undefined) ? 
              <div style={{display: 'inline-flex', flexDirection: 'row', letterSpacing: '.2vh', fontSize:'14px'}}>
                <p className='DOTS1'>.</p>
                <p className='DOTS2'>.</p>
                <p className='DOTS3'>.</p>
              </div> : (imdbID === undefined && detailDisplay === altID) ? 
              <div style={{display: 'inline-flex', flexDirection: 'row', letterSpacing: '.2vh', fontSize:'14px'}}>
                <p className='DOTS1'>.</p>
                <p className='DOTS2'>.</p>
                <p className='DOTS3'>.</p>
              </div> : <Icon>arrow_right_alt</Icon>}
            </Button>
          <hr>
          </hr>
        </div>
      </>
    )
  }

  return (
    <Grid container spacing={0} flexDirection='column' alignItems='start'>
      {!JSONloading && !secondaryLoading ? currentResultsArr.map((item, index) => {
        let indexKey = index;
        if (index > 4) {
          index = index % 5;
        }
        return <ResItem 
          title={item.Title} 
          altTitle={item.title} 
          imdbID={item.imdbID} 
          altID={item.id} 
          index={index} 
          count={indexKey} 
          currentPage={currentPage} 
          detailDisplay={detailDisplay} 
          key={indexKey}
        />
      }) : <></>}
    </Grid>
  ) 
})

export default MapResponse;