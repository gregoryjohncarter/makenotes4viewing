import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Icon from '@mui/material/Icon';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const FormSearch = ({searchType, setSearchType, searchMode, JSONloading, setJSONloading, searchQuery, setSearchQuery, setBreadcrumbQuery}) => {
  const [togglePallet, setTogglePallet] = useState(false);

  const switchMode = (current, direction) => {
    if (direction === 'forwards') {
      if (current === searchMode[3]) {
        setSearchType(searchMode[0]);
      } else if (current === searchMode[0]) {
        setSearchType(searchMode[1]);
        setSearchQuery('');
      } else {
        let index = searchMode.indexOf(current);
        setSearchType(searchMode[index + 1]);
      }
    } else {
      if (current === searchMode[0]) {
        setSearchType(searchMode[3]);
      } else if (current === searchMode[2]) {
        setSearchType(searchMode[1]);
        setSearchQuery('');
      } else {
        let index = searchMode.indexOf(current);
        setSearchType(searchMode[index - 1]);
      }
    }
    if (!togglePallet) {
      setTogglePallet(true);
      setTimeout(() => {
        setTogglePallet(false);
      }, 1500)
    }
  }

  const handleSearchBtn = (searchType, searchQuery) => {
    if (searchType === searchMode[0]) {
      setBreadcrumbQuery(searchQuery);
    } else if (searchType === searchMode[1]) {
      let breadcrumbString = 'Action, Drama';
      setBreadcrumbQuery(breadcrumbString);
    } else if (searchType === searchMode[2]) {
      setBreadcrumbQuery('Top 100 - TV');
    } else {
      setBreadcrumbQuery('Top 100 - Film');
    }
    setSearchQuery('');
    setJSONloading(true);
  }

  const {desc, icon, disabledInput} = searchType;
  const [hoverBtn, setHoverBtn] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#d3d3d3dd',
    border: '2px solid #000',
    flexDirection: 'column',
    padding: '20px'
  };

  const [genreListCol1] = useState([
    'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'Film-Noir', 'Game-Show', 'History'
  ]);
  const [genreListCol2] = useState([
    'Horror', 'Music', 'Musical', 'Mystery', 'News', 'Reality-TV', 'Romance', 'Sci-Fi', 'Sport', 'Talk-Show', 'Thriller', 'War', 'Western'
  ]);
  const [genresAmt, setGenresAmt] = useState(0);

  const handleGenreList = (genre, currentInput) => {
    if (currentInput.length === 0) {
      let stringVar = currentInput;
      stringVar += genre;
      setSearchQuery(stringVar);
      setGenresAmt(1);
    } else {
      if (currentInput) {
        let stringVar = currentInput;
        if (currentInput.includes(genre)) {
          let stringInput = currentInput.split('');
          if (genresAmt === 1) {
            setSearchQuery('');
            setGenresAmt(0);
            return
          } else if (genresAmt === 2) {
            let indexStart = currentInput.indexOf(',');
            let stringMix = stringVar.split(',');
            let current = stringMix[0];
            if (current.includes(genre)) {
              stringInput = stringInput.splice(indexStart, stringInput.length - indexStart);
              for (let char of stringInput) {
                if (char === char.toUpperCase()) {
                  indexStart = stringInput.indexOf(char) + 2;
                  break;
                }
              }
              stringInput = stringInput.splice(indexStart, stringInput.length);
            } 
            indexStart = currentInput.indexOf(',');
            if (stringMix[1].includes(genre)) {
              stringInput = stringInput.splice(0, indexStart);
              for (let char of stringInput) {
                if (char === char.toUpperCase()) {
                  indexStart = stringInput.indexOf(char) + 2;
                  break;
                }
              }
            }
          } else {
            let indexStart = currentInput.indexOf(',');
            let stringMix = stringVar.split(',');
            let current = stringMix[0];
            if (current.includes(genre)) {
              stringInput = stringInput.splice(indexStart, stringInput.length - indexStart);
              for (let char of stringInput) {
                if (char === char.toUpperCase()) {
                  indexStart = stringInput.indexOf(char) + 2;
                  break;
                }
              }
            }
            indexStart = currentInput.indexOf(',');
            let nextIndex = currentInput.indexOf(',', indexStart);
            nextIndex = indexStart + nextIndex;
            if (stringMix[1].includes(genre)) {
              stringInput = stringInput.splice(indexStart, stringInput.length - nextIndex);
              for (let char of stringInput) {
                if (char === char.toUpperCase()) {
                  indexStart = stringInput.indexOf(char, indexStart) + 2;
                  break;
                }
              }
            } 
            indexStart = currentInput.indexOf(',');
            nextIndex = currentInput.indexOf(',', indexStart);
            nextIndex = indexStart + nextIndex;
            if (stringMix[2].includes(genre)) {
              stringInput = stringInput.splice(nextIndex, stringInput.length - nextIndex);

              // for (let char of stringInput) {
              //   if (char === char.toUpperCase()) {
              //     indexStart = stringInput.indexOf(char, indexStart) + 2;
              //     break;
              //   }
              // }
            }
          }
          stringInput = stringInput.join('');
          setSearchQuery(stringInput);
          setGenresAmt(genresAmt - 1);
          return 
        }
        stringVar += ', ';
        stringVar += genre;
        setSearchQuery(stringVar);
        setGenresAmt(genresAmt + 1);
      }
    }
  }
  console.log(searchQuery);
  console.log(genresAmt)

  return (
    <><Grid container spacing={4}>
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
        <Box className='request-container' onClick={()=> handleSearchBtn(searchType, searchQuery)} onMouseOver={() => setHoverBtn(true)} onMouseOut={() => setHoverBtn(false)}>
          {!JSONloading ? 
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
    <Modal
      open={openModal}
      onClose={()=>setOpenModal(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    > 
      <Box display='flex' style={modalStyle} className='modal-style' id='modal-modal-description'>
        <div>
          <p className='genres-label'>Choose up to three genres</p>
        </div>
        <div style={{display:'flex'}}>
          <div style={{flex: '1 50%'}}>
            <p className='center right'>
              {genreListCol1.map((genre, index) => {
                return <Button onClick={()=>handleGenreList(genre, searchQuery)} style={{width: '150px', marginTop: '10px'}} className={searchQuery.includes(genre) && 'select-btn-g'} variant='outlined' key={String(index) + 'gen'}>{genre}</Button> 
              })}
            </p>
          </div>
          <div style={{flex: '1 50%'}}>
            <p className='center left'>
              {genreListCol2.map((genre, index) => {
                return <Button onClick={()=>handleGenreList(genre, searchQuery)} style={{width: '150px', marginTop: '10px'}} className={searchQuery.includes(genre) && 'select-btn-g'} variant='outlined' key={String(index) + 'gen'}>{genre}</Button> 
              })}
            </p>
          </div>
        </div>
      </Box>
    </Modal></>
  )
}

export default FormSearch;