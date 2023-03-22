import React, { useState } from 'react';

import CategoriesInput from './CategoriesInput.js';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Icon from '@mui/material/Icon';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const FormSearch = ({
  searchType, 
  setSearchType, 
  searchMode, 
  JSONloading, 
  searchQuery, 
  setSearchQuery, 
  handleSearchUtility, 
  secondaryLoading, 
  currentResultsArr, 
  setFocusBar, 
  genresAmt, 
  setGenresAmt, 
  genresArr, 
  setGenresArr
}) => {
  const [togglePallet, setTogglePallet] = useState(false);

  const handleSwitchMode = (e, current, direction) => {
    e.stopPropagation();
    e.preventDefault();

    const switchMode = (current, direction) => {
      if (direction === 'forwards') {
        if (current === searchMode[3]) {
          setSearchType(searchMode[0]);
          setSearchQuery('');
        } else if (current === searchMode[2]) {
          setSearchQuery('MostPopular');
          setSearchType(searchMode[3]);
        } else if (current === searchMode[1]) {
          setSearchQuery('MostPopular');
          setSearchType(searchMode[2]);
          setGenresAmt(0);
          setGenresArr([]);
        } else {
          setSearchType(searchMode[1]);
          setSearchQuery('');
        }
      } else {
        if (current === searchMode[3]) {
          setSearchType(searchMode[2]);
          setSearchQuery('MostPopular');
        } else if (current === searchMode[2]) {
          setSearchQuery('');
          setSearchType(searchMode[1]);
        } else if (current === searchMode[1]) {
          setSearchQuery('');
          setSearchType(searchMode[0]);
          setGenresAmt(0);
          setGenresArr([]);
        } else {
          setSearchType(searchMode[3]);
          setSearchQuery('MostPopular');
        }
      }
      if (!togglePallet) {
        setTogglePallet(true);
        setTimeout(() => {
          setTogglePallet(false);
        }, 1500)
      }
    }
    switchMode(current, direction);
  }
  
  const {desc, disabledInput} = searchType;
  const [hoverBtn, setHoverBtn] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const handleGenreList = (genre, currentInput) => {
    if (genresAmt === 3) {
      if (!genresArr.includes(genre)) {
        return
      }
    }
    if (genresArr.length === 0) {
      let stringAddition = currentInput.slice(0);
      stringAddition += genre;
      setSearchQuery(stringAddition);
      setGenresAmt(1);
      setGenresArr([genre]);
    } else {
      if (currentInput) {
        let stringAddition = currentInput.slice(0);
        if (currentInput.includes(genre)) {
          let buildArr = [];
          if (genresAmt === 1) {
            setSearchQuery('');
            setGenresArr([]);
            setGenresAmt(0);
            return
          } else if (genresAmt === 2) {
            for (let genres of genresArr) {
              if (genres !== genre) {
                buildArr.push(genres);
              }
            }
            setSearchQuery(buildArr[0]);
            setGenresAmt(genresAmt - 1);
            setGenresArr(buildArr);
            return
          } else {
            for (let genres of genresArr) {
              if (genres !== genre) {
                buildArr.push(genres);
              }
            }
            let buildString = buildArr.join(' ');
            let breakPoint = buildString.indexOf(' ');
            buildString = buildString.split('');
            buildString.splice(breakPoint, 0, ',');
            setSearchQuery(buildString.join(''));
            setGenresAmt(genresAmt - 1);
            setGenresArr(buildArr);
            return
          }
        }
        if (genresArr.length === 0) {
          setGenresArr([genre]);
          stringAddition += ', ';
          stringAddition += genre;
          setSearchQuery(stringAddition);
          setGenresAmt(genresAmt + 1);
        } else {
          let buildArr = [];
          for (let i = 0; i < genresArr.length; i++) {
            buildArr.push(genresArr[i])
          }
          if (buildArr.length === 1) {
            let stringArr = buildArr.slice(0);
            stringArr.push(', ');
            buildArr.push(genre);
            setGenresArr(buildArr);
            stringArr.push(genre);
            let stringQuery = stringArr.join('');
            setSearchQuery(stringQuery);
            setGenresAmt(genresAmt + 1);
          } else {
            buildArr.pop();
            let stringArr = buildArr.slice(0);
            stringArr.push(', ');
            buildArr.push(genresArr[genresArr.length - 1]);
            stringArr.push(genresArr[genresArr.length - 1]);
            stringArr.push(', ');
            buildArr.push(genre);
            setGenresArr(buildArr);
            stringArr.push(genre);
            let stringQuery = stringArr.join('');
            setSearchQuery(stringQuery);
            setGenresAmt(genresAmt + 1);
          }
        }
      }
    }
  }

  const handleFocusBar = (e, toggle) => {
    e.stopPropagation();
    e.preventDefault();
    setFocusBar(toggle);
  }

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={8}>
          <div className={togglePallet ? 'search-container search-mode-change' : 'search-container'}>
            <h2>Make Notes 4 Viewing</h2>
            {searchType !== searchMode[1] ? 
            <TextField 
              id='filled-basic' 
              label={desc} 
              variant='filled' 
              disabled={disabledInput} 
              fullWidth 
              style={{backgroundColor:'whitesmoke'}}
              onChange={(e)=>setSearchQuery(e.target.value)}
              value={searchQuery}
            /> :
            <TextField 
              id='filled-basic' 
              label={desc}  
              onClick={()=>setOpenModal(true)}
              variant='filled' 
              disabled={disabledInput} 
              fullWidth 
              style={{backgroundColor:'whitesmoke'}}
              value={searchQuery}
            />}

            <div className='search-toggle-container'>
              <Button style={{cursor: 'pointer'}} onClick={(e)=> handleSwitchMode(e, searchType, 'backwards')} variant='secondary'>
                <Icon style={{color: '#222'}}>arrow_left</Icon>
              </Button>
              <span className='change-mode'>
                change mode
              </span>
              <Button style={{cursor: 'pointer'}} onClick={(e)=> handleSwitchMode(e, searchType, 'forwards')} variant='secondary'>
                <Icon style={{color: '#222'}}>arrow_right</Icon>
              </Button>
            </div>
          </div>
        </Grid>
        <Grid item xs={4} alignSelf='center'>
          <Box className='request-container' onClick={(!currentResultsArr.length && !searchQuery.length) ? (e) => handleFocusBar(e, 'toggle') : (e) => handleSearchUtility(e, searchQuery, searchType, secondaryLoading)}>
            {!JSONloading && !secondaryLoading ? 
              <>
                <div className='bg-0'></div>
                <div className='bg-0 bg2'></div>
                <div className='bg-0 bg3'></div>
              </> :
              <>
                <div className='bg'></div>
                <div className='bg bg2'></div>
                <div className='bg bg3'></div>
              </>
            }
            {hoverBtn ? 
              <Button color='secondary' variant='text' startIcon={<Icon>south_east</Icon>} size='large' className='req-btn'>
                <span style={{fontSize: '.85em', cursor: 'pointer'}}>
                  Search
                </span>
              </Button> : 
              <Button disabled color='secondary' variant='text' startIcon={<Icon>south_east</Icon>} size='large' className='req-btn'>
                <span style={{fontSize: '.85em', cursor: 'pointer'}}>
                  Search
                </span>
              </Button>
            }
            <h2 style={{fontFamily: 'serif', fontSize: '1em', opacity: .5, cursor: 'pointer'}}>IMDb API</h2>
          </Box>
        </Grid>
      </Grid>
      <CategoriesInput openModal={openModal} setOpenModal={setOpenModal} handleGenreList={handleGenreList} searchQuery={searchQuery}/>
    </>
  )
}

export default FormSearch;