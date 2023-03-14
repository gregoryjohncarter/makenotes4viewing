import React, { useState } from 'react';

import FormSearch from '../components/FormSearch.js';
import ContainerResults from '../components/ContainerResults.js';

import Container from '@mui/material/Container';

const Home = () => {
  const [searchMode] = useState([
    {desc: 'Search by title', icon: '', disabledInput: false},
    {desc: 'Search by genre', icon: '', disabledInput: false}, 
    {desc: 'Search top 100 (TV)', icon: '', disabledInput: true}, 
    {desc: 'Search top 100 (Film)', icon: '', disabledInput: true}
  ]);

  const [searchType, setSearchType] = useState(searchMode[0]);
  const [JSONloading, setJSONloading] = useState(false);

  return (
    <Container maxWidth='md'>
      <FormSearch 
        searchType={searchType}
        setSearchType={setSearchType}
        searchMode={searchMode}
        JSONloading={JSONloading} 
        setJSONloading={setJSONloading}
      />
      <ContainerResults/>
    </Container>
  )
}

export default Home;