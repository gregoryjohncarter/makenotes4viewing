import React, { useState, memo } from 'react';

import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';
import Button from '@mui/material/Button';

const MapResponse = memo(function MapResponse({currentResultsArr, setCurrentSel, JSONloading, currentPage}) {
  const ResItem = ({title, altTitle, imdbID, type, index, count, currentPage}) => {
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
          <hr>
          </hr>
        </div>
      </>
    )
  }

  return (
    <Grid container spacing={0} flexDirection='column' alignItems='start'>
      {!JSONloading && currentResultsArr.map((item, index) => {
        let indexKey = index;
        if (index > 4) {
          index = index % 5;
        }
        return <ResItem title={item.Title} altTitle={item.title} index={index} count={indexKey} key={indexKey} currentPage={currentPage}/>
      })}
    </Grid>
  ) 
})

export default MapResponse;