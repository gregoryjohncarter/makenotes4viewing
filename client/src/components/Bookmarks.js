import React from 'react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material/styles';

const Bookmarks = ({ bookmarksList, requestSelectionInfo, detailDisplay, secondaryLoading }) => { 
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

  return (
    <>
      <Grid container spacing={0} flexDirection='row' alignItems='start'>
        {bookmarksList.length > 0 ? bookmarksList.map((bookmark, index) => {
          let indexKey = index;
          if (index > 4) {
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
          return <div key={'box' + indexKey} className='box-bkmk'>
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
              <span className='text-bkmk'>
                {bookmark.title}
              </span>
            </Button>
          </div>
        }) : <Box 
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
}

export default Bookmarks;