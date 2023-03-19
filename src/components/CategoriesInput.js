import React, { useState } from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const CategoriesInput = ({openModal, setOpenModal, handleGenreList, searchQuery}) => {
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

  return (
    <Modal
      open={openModal}
      onClose={()=>setOpenModal(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    > 
      <Box display='flex' style={modalStyle} className='modal-style mytbl' id='modal-modal-description'>
        <div>
          <p className='genres-label'>Choose up to three genres</p>
        </div>
        <div style={{display:'flex'}}>
          <div style={{flex: '1 50%'}}>
            <p className='center previ'>
              {genreListCol1.map((genre, index) => {
                return <Button onClick={() => handleGenreList(genre, searchQuery)} style={{width: '150px', marginTop: '10px'}} className={searchQuery.includes(genre) ? 'select-btn-g' : ''} variant='outlined' key={String(index) + 'gen'}>{genre}</Button> 
              })}
            </p>
          </div>
          <div style={{flex: '1 50%'}}>
            <p className='center next'>
              {genreListCol2.map((genre, index) => {
                return <Button onClick={() => handleGenreList(genre, searchQuery)} style={{width: '150px', marginTop: '10px'}} className={searchQuery.includes(genre) ? 'select-btn-g' : ''} variant='outlined' key={String(index) + 'gen'}>{genre}</Button> 
              })}
            </p>
          </div>
        </div>
      </Box>
    </Modal>
  )
}

export default CategoriesInput;