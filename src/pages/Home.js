import React from 'react';

import FormSearch from '../components/FormSearch.js';
import ContainerResults from '../components/ContainerResults.js';

import Container from '@mui/material/Container';

const Home = () => {
  return (
    <Container maxWidth='md'>
      <FormSearch/>
      <ContainerResults/>
    </Container>
  )
}

export default Home;