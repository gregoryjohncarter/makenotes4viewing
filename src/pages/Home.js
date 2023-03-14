import React, { useState, useEffect } from 'react';

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

  const [currentResultsArr, setCurrentResultsArr] = useState(false);
  const [currentSel, setCurrentSel] = useState([]);
  const [currentSelArr, setCurrentSelArr] = useState([]);

  useEffect(() => {
    if (JSONloading) {
      setTimeout(() => {
        setCurrentResultsArr(true);
        setJSONloading(false);
      }, 1000);
    }
  }, [JSONloading]);

  return (
    <Container maxWidth='md' style={{marginBottom: '25px'}}>
      <FormSearch 
        searchType={searchType}
        setSearchType={setSearchType}
        searchMode={searchMode}
        JSONloading={JSONloading} 
        setJSONloading={setJSONloading}
      />
      <ContainerResults
        currentResultsArr={currentResultsArr}
        currentSel={currentSel}
        setCurrentSel={setCurrentSel}
        currentSelArr={currentSelArr}
      />
    </Container>
  )
}

export default Home;