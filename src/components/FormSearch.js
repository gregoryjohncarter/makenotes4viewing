import React, { useState } from 'react';

import CategoriesInput from './CategoriesInput.js';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Icon from '@mui/material/Icon';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const FormSearch = ({searchType, setSearchType, searchMode, JSONloading, searchQuery, setSearchQuery, enterSearchUtility, secondaryLoading, currentResultsArr, setFocusBar}) => {
  const [togglePallet, setTogglePallet] = useState(false);
  const [genresAmt, setGenresAmt] = useState(0);
  const [genresArr, setGenresArr] = useState([]);

  const switchMode = (current, direction) => {
    if (direction === 'forwards') {
      if (current === searchMode[3]) {
        setSearchType(searchMode[0]);
      } else if (current === searchMode[0]) {
        setSearchType(searchMode[1]);
        setSearchQuery('');
      } else {
        let index = searchMode.indexOf(current);
        setSearchQuery('');
        setSearchType(searchMode[index + 1]);
        setGenresAmt(0);
        setGenresArr([]);
      }
    } else {
      if (current === searchMode[0]) {
        setSearchType(searchMode[3]);
        setSearchQuery('');
      } else if (current === searchMode[2]) {
        setSearchType(searchMode[1]);
        setSearchQuery('');
      } else {
        let index = searchMode.indexOf(current);
        setSearchType(searchMode[index - 1]);
        setGenresAmt(0);
        setGenresArr([]);
        setSearchQuery('');
      }
    }
    if (!togglePallet) {
      setTogglePallet(true);
      setTimeout(() => {
        setTogglePallet(false);
      }, 1500)
    }
  }

  const {desc, icon, disabledInput} = searchType;
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
              <Button onClick={()=> switchMode(searchType, 'backwards')} variant='secondary'>
                <Icon style={{color: '#222'}}>arrow_left</Icon>
              </Button>
              <span className='change-mode'>
                change mode
              </span>
              <Button onClick={()=> switchMode(searchType, 'forwards')} variant='secondary'>
                <Icon style={{color: '#222'}}>arrow_right</Icon>
              </Button>
            </div>
          </div>
        </Grid>
        <Grid item xs={4} alignSelf='center'>
          <Box className='request-container' onClick={!currentResultsArr.length && !searchQuery.length ? () => setFocusBar('toggle') : () => enterSearchUtility(searchQuery, searchType, secondaryLoading)} onMouseOver={() => setHoverBtn(true)} onMouseOut={() => setHoverBtn(false)}>
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