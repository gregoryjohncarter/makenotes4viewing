import React, { useState, useEffect } from 'react';

import SelectionResults from '../components/SelectionResults.js';
import MapResponse from '../components/MapResponse.js';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Icon from '@mui/material/Icon';
import Breadcrumbs from '@mui/joy/Breadcrumbs';

const ContainerResults = ({currentResultsArr, currentSel, setCurrentSel, currentSelArr, breadcrumbQuery, focusBar, JSONloading, currentPage, setCurrentPage, pageCount}) => {
  const [preDataFade, setPreDataFade] = useState(false);

  useEffect(() => {
    if (!currentResultsArr.length) {
      setPreDataFade(true);
    } else {
      setTimeout(() => {
        setPreDataFade(false);
      }, 1000);
    }
  }, [currentResultsArr]);

  return (
    <Grid container rowSpacing={2}>
      <Grid item xs={12}>
        {!currentResultsArr.length ? 
          <div className='results-div-e'>
            <div className='results-inner-div-e'>
              <Box display='flex' className={focusBar === 'toggle' ? 'wo-input' : ''} justifyContent='center' style={{paddingTop: '80px'}}>
                <Button size='small' variant='outlined' disabled>Begin by searching above</Button>
              </Box>
            </div>
          </div>
           :
          <div className='results-div'>
            <div className='results-inner-div'>
              {preDataFade ? 
                <Box display='flex' justifyContent='center' style={{paddingTop: '80px'}}>
                  <Button size='small' className='fade-scale' variant='outlined' disabled>Begin by searching above</Button>
                </Box> : <>
                <Breadcrumbs
                  separator='/'
                  size='md'
                >
                  <Link
                    href='/'
                    underline='hover'
                    color='neutral'
                    fontSize='inherit'
                  >
                    <span className='crumb-results'><Icon>search</Icon>{breadcrumbQuery}</span>
                  </Link>
                </Breadcrumbs>
                <MapResponse currentResultsArr={currentResultsArr} setCurrentSel={setCurrentSel} JSONloading={JSONloading} currentPage={currentPage} setCurrentPage={setCurrentPage} pageCount={pageCount}/>
              </>
              }
            </div>
          </div>
        }
      </Grid>
    </Grid>
  )
}

export default ContainerResults;