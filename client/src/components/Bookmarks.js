import React, { useState, useEffect, memo } from 'react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material/styles';

const Bookmarks = memo(function Bookmarks({ bookmarksList, requestSelectionInfo, detailDisplay, secondaryLoading }) { 
  const DisplayBkmk = memo(function DisplayBkmk({ requestSelectionInfo, detailDisplay, secondaryLoading, indexKey, varColor, bookmark }) {
    const stylesWheelBkmk = ['#5bb0c5', '#89dcd0', '#2ab1cf', '#61d0a7'];
    const theme = createTheme({
      palette: {
        neutral: {
          main: '#64748B',
          contrastText: '#fff',
        },
        colorI: {
          main: stylesWheelBkmk[0],
          contrastText: '#fff',
        },
        colorII: { 
          main: stylesWheelBkmk[1],
          contrastText: '#fff',
        },
        colorIII: { 
          main: stylesWheelBkmk[2],
          contrastText: '#fff',
        },
        colorIV: { 
          main: stylesWheelBkmk[3],
          contrastText: '#fff',
        }
      },
    });

    const [showBkmk, setShowBkmk] = useState(false);
    const sturdyAnim = {
      '--i': `${indexKey+1}`
    };
    useEffect(() => {
      if (secondaryLoading) {
        setShowBkmk(true);
      } else {
        setTimeout(() => {
          setShowBkmk(true);
        }, 100 * indexKey);
      }
    }, []);

    return (
        showBkmk ? <div key={'box' + indexKey} className={!secondaryLoading ? 'box-bkmk anim-bkmk' : 'box-bkmk'} style={{sturdyAnim}}>
          <Button
            variant='contained'
            onClick={()=>requestSelectionInfo(bookmark.imdbID)}
            key={'bks' + indexKey}
            theme={theme}
            color={varColor}
            disabled={secondaryLoading}
            className='btn-bkmk'
          >
            {(detailDisplay && detailDisplay === bookmark.imdbID) ? 
              <div style={{display: 'inline-flex', flexDirection: 'row', letterSpacing: '.2vh', fontSize:'14px'}}>
                <p className='DOTS1'>.</p>
                <p className='DOTS2'>.</p>
                <p className='DOTS3'>.</p>
              </div> : <Icon>arrow_outward</Icon>}
          </Button>
          <Button 
            variant='contained'
            onClick={()=>requestSelectionInfo(bookmark.imdbID)}
            key={'txt' + indexKey}
            theme={theme}
            color='neutral'
            className='btn-bkmk'
            sx={{ minHeight: 50 }}
            disabled={secondaryLoading}
          >
            <span title={bookmark.title} className='text-bkmk'>
              {bookmark.title}
            </span>
          </Button>
        </div> : <></>
    )
  })
  
  return (
    <>
      <Grid container spacing={0} flexDirection='row' alignItems='start'>
        {bookmarksList.length > 0 ? bookmarksList.map((bookmark, index) => {
          let indexKey = index;
          if (index > 3) {
            index = index % 4;
          }
          let varColor = null;
          if (index === 0) {
            varColor = 'colorI';
          } else if (index === 1) {
            varColor = 'colorII';
          } else if (index === 2) {
            varColor = 'colorIII'; 
          } else {
            varColor = 'colorIV';
          }
          
          return <DisplayBkmk 
            indexKey={indexKey} 
            varColor={varColor} 
            key={indexKey}
            requestSelectionInfo={requestSelectionInfo}
            detailDisplay={detailDisplay}
            secondaryLoading={secondaryLoading}
            bookmark={bookmark}
          />}) : <Box 
              display='flex' 
              justifyContent='center' 
              style={{paddingTop: '80px', margin: '0 auto'}}
            >
              <Button 
                size='small' 
                variant='outlined' 
                disabled
              >
                Begin searching to save items!
              </Button>
            </Box>}
      </Grid>
    </>
  )
})

export default Bookmarks;