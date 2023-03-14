import React from 'react';

import FormSearch from '../components/FormSearch.js';
import ContainerResults from '../components/ContainerResults.js';
import MapResponse from '../components/MapResponse.js';

import Container from '@mui/material/Container';

const Home = () => {
  return (
    <Container maxWidth='md'>
      <FormSearch/>
      <MapResponse/>
      <ContainerResults/>
    </Container>
  )
}

export default Home;