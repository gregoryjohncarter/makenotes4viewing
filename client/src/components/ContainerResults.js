import React from 'react';

import SelectionResults from '../components/SelectionResults.js';
import MapResponse from '../components/MapResponse.js';
import Bookmarks from '../components/Bookmarks.js';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Icon from '@mui/material/Icon';
import Breadcrumbs from '@mui/joy/Breadcrumbs';

const ContainerResults = ({
  currentResultsArr,
  setCurrentSel, 
  currentSelArr, 
  setCurrentSelArr, 
  breadcrumbQuery, 
  setBreadcrumbQuery,
  focusBar, 
  JSONloading, 
  currentPage, 
  setCurrentPage, 
  pageCount, 
  requestSelectionInfo, 
  detailDisplay, 
  setDetailDisplay,
  secondaryLoading,
  loginStatus,
  bookmarkSelection,
  bookmarksList
}) => {

  const handleBack = () => {
    setCurrentSelArr(false);
    setDetailDisplay('search');
  }

  const handleBookmarks = () => {
    if (secondaryLoading) {
      return
    }
    setBreadcrumbQuery('bookmarks');
    setCurrentSelArr(false);
    setDetailDisplay('bookmarks');
  }

  return (
    <Grid container rowSpacing={2}>
      <Grid item xs={12}>
        {detailDisplay === 'init' ? 
          <div className='results-div-e'>
            {loginStatus && 
              <div className='tab-bkmk'>
                <Button onClick={()=>handleBookmarks()} variant='contained' color='inherit'><Icon>pending</Icon>Bookmarks</Button>
              </div>
            }
            <div className='results-inner-div-e'>
              <Box display='flex' className={focusBar === 'toggle' ? 'wo-input' : ''} justifyContent='center' style={{paddingTop: '80px'}}>
                <Button size='small' variant='outlined' disabled>{!breadcrumbQuery ? 'Begin by searching above' : breadcrumbQuery}</Button>
              </Box>
            </div>
          </div>
           :
          <div className='results-div'>
            {loginStatus && 
              <div className='tab-bkmk'>
                <Button onClick={()=>handleBookmarks()} variant='contained' color='inherit'><Icon>pending</Icon>Bookmarks</Button>
              </div>
            }
            <div className='results-inner-div'>
              {detailDisplay === 'home' ? 
                <Box display='flex' justifyContent='center' style={{paddingTop: '80px'}}>
                  <Button size='small' className='fade-scale' variant='outlined' disabled>Begin by searching above</Button>
                </Box> : (detailDisplay === 'search' && breadcrumbQuery !== 'bookmarks') || (detailDisplay === currentSelArr.imdbID && breadcrumbQuery !== 'bookmarks') ? <>
                <Breadcrumbs
                  separator='/'
                  size='md'
                >
                  <Link
                    underline='hover'
                    color='neutral'
                    fontSize='inherit'
                  >
                    <span className='crumb-results'><Icon>search</Icon>{breadcrumbQuery}</span>
                  </Link>
                </Breadcrumbs>
                <MapResponse
                  currentResultsArr={currentResultsArr} 
                  setCurrentSel={setCurrentSel} 
                  JSONloading={JSONloading} 
                  currentPage={currentPage} 
                  setCurrentPage={setCurrentPage} 
                  pageCount={pageCount}
                  requestSelectionInfo={requestSelectionInfo}
                  setDetailDisplay={setDetailDisplay}
                  detailDisplay={detailDisplay}
                  secondaryLoading={secondaryLoading}
                />
              </> : detailDisplay === 'bookmarks' || detailDisplay === currentSelArr.imdbID ? <>
                  <Breadcrumbs
                    separator='/'
                    size='md'
                  >
                    <Link
                      underline='hover'
                      color='neutral'
                      fontSize='inherit'
                    >
                      <span className='crumb-results'><Icon>apps</Icon>{breadcrumbQuery}</span>
                    </Link>
                  </Breadcrumbs>
                  <Bookmarks requestSelectionInfo={requestSelectionInfo} bookmarksList={bookmarksList} secondaryLoading={secondaryLoading} detailDisplay={detailDisplay}/>
                </> : <>
                {breadcrumbQuery !== 'bookmarks' ? <Breadcrumbs
                  separator='/'
                  size='md'
                  aria-label='breadcrumb'
                >
                  <Link
                    underline='hover'
                    color='neutral'
                    fontSize='inherit'
                  >
                    <Button variant='text' onClick={() => handleBack()}><span className='crumb-results'><Icon>search</Icon>{breadcrumbQuery}</span></Button>
                  </Link>
                  <Link
                    underline='hover'
                    color='neutral'
                    fontSize='inherit'
                  >
                    <span className='crumb-results'>{currentSelArr.Title}</span>
                  </Link>
                </Breadcrumbs> : <div style={{marginBottom: '20px', width: '100%'}}></div>}
                <SelectionResults 
                  title={currentSelArr.Title} 
                  year={currentSelArr.Year} 
                  contentRating={currentSelArr.Rated} 
                  genre={currentSelArr.Genre} 
                  stars={currentSelArr.Actors} 
                  plot={currentSelArr.Plot} 
                  poster={currentSelArr.Poster} 
                  rating={currentSelArr.Ratings} 
                  director={currentSelArr.Director}
                  runtime={currentSelArr.Runtime}
                  loginStatus={loginStatus}
                  bookmarkSelection={bookmarkSelection}
                  currentSelArr={currentSelArr}
                  bookmarksList={bookmarksList}
                  breadcrumbQuery={breadcrumbQuery}
                />
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