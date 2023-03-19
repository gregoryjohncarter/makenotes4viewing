import React, { useState, useEffect } from 'react';

import FormSearch from '../components/FormSearch.js';
import ContainerResults from '../components/ContainerResults.js';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const Home = () => {
  const [searchMode] = useState([
    {desc: 'Search by title', icon: '', disabledInput: false},
    {desc: 'Search by genre', icon: '', disabledInput: false}, 
    {desc: 'Search top 100 (TV)', icon: '', disabledInput: true}, 
    {desc: 'Search top 100 (Film)', icon: '', disabledInput: true}
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [breadcrumbQuery, setBreadcrumbQuery] = useState('');
  const [searchType, setSearchType] = useState(searchMode[0]);
  const [JSONloading, setJSONloading] = useState(false);

  const [currentResultsArr, setCurrentResultsArr] = useState(false);
  const [currentSel, setCurrentSel] = useState([]);
  const [currentSelArr, setCurrentSelArr] = useState([]);
  const [latentResultsArr, setLatentResultsArr] = useState([]);

  useEffect(() => {
    if (secondaryLoading) {
      setSecondaryLoading(false);
    }
    setSearchQuery('');
  }, [currentResultsArr, latentResultsArr]);

  useEffect(() => {
    if (JSONloading) {
      setTimeout(() => {
        setJSONloading(false);
      }, 1800);
    }
  }, [JSONloading])

  const [focusBar, setFocusBar] = useState(false);

  useEffect(() => {
    if (focusBar === 'toggle') {
      setTimeout(() => {
        setFocusBar('');
      }, 1000);
    }
  }, [focusBar])

  const [secondaryLoading, setSecondaryLoading] = useState(false);

  const enterSearchUtility = (searchQuery, searchType, loading) => {
    if (loading) {
      return
    }
    if (searchQuery.trim().length) {
      setSecondaryLoading(true);
    }
    if (searchType === searchMode[0]) {
      searchQuery = searchQuery.trim('');
      if (searchQuery) {
        const searchByInput = async (searchQuery) => {
          let apiUrlTitle = "https://www.omdbapi.com/?apikey=" + process.env.REACT_APP_REQUESTHOMEKEY + "&s=" + searchQuery;
          try {
            let nearTermResults = await fetch(apiUrlTitle);
            let dataResults = await nearTermResults.json();
            if (dataResults.Response === 'True') {
              let transferResults = (data) => {
                setCurrentResultsArr(data.Search);
              }
              setBreadcrumbQuery(searchQuery);
              transferResults(dataResults);
            } else {
              setBreadcrumbQuery('No results found');
              setCurrentResultsArr([]);
              return
            }
          } catch (error) {
            console.log(error);
            setBreadcrumbQuery('Request failed');
            setCurrentResultsArr([]);
          }
        }
        setJSONloading(true);
        searchByInput(searchQuery);
      } else {
        return
      }
    } else if (searchType === searchMode[1]) {
      if (searchQuery) {
        const searchByLabel = async (searchQuery) => {
          var apiUrlGenre = "https://imdb-api.com/API/AdvancedSearch/" + process.env.REACT_APP_REQUESTACCKEY + "/?genres=" + searchQuery + "&count=150";
          apiUrlGenre = apiUrlGenre.replace(/ /g, '');
          try {
            let nearLabelsResults = await fetch(apiUrlGenre);
            let dataResults = await nearLabelsResults.json();
            if (dataResults.results.length > 0) {
              let transferResults = (data) => {
                setLatentResultsArr(data.results);
              }
              setBreadcrumbQuery(searchQuery);
              transferResults(dataResults);
            } else {
              setBreadcrumbQuery('No results found');
              setCurrentResultsArr([]);
              return
            }
          } catch (error) {
            console.log(error);
            setBreadcrumbQuery('Request failed');
            setCurrentResultsArr([]);
          }
        }
        setJSONloading(true);
        searchByLabel(searchQuery);
      } else {
        return
      }
    } else if (searchType === searchMode[2]) {
      const searchByChartT = async () => {

      }
      setJSONloading(true);
      setBreadcrumbQuery('Top 100 - TV');
    } else {
      const searchByChartF = async () => {

      }
      setJSONloading(true);
      setBreadcrumbQuery('Top 100 - Film');
    }
  }

  const [pageCount, setPageCount] = useState(false);
  const [currentPage, setCurrentPage] = useState(false);

  useEffect(() => {
    if (latentResultsArr.length < 30) {
      setPageCount(1);
      setCurrentPage(1);
      setCurrentResultsArr(latentResultsArr)
    } else {
      setPageCount(Math.floor(latentResultsArr.length / 30));
      setCurrentPage(1);
    }
  }, [latentResultsArr]);

  useEffect(() => {
    if (currentPage === 1) {
      setCurrentResultsArr(latentResultsArr.slice(0, 30));
    } else {
      let left = 0;
      let right = 30;
      
      right = currentPage * right;
      left = right - 30;
      setCurrentResultsArr(latentResultsArr.slice(left, right));
    }
  }, [currentPage]);

  return (
    <Container maxWidth='md' style={{marginBottom: '25px'}}>
      <FormSearch 
        searchType={searchType}
        setSearchType={setSearchType}
        searchMode={searchMode}
        JSONloading={JSONloading} 
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
        enterSearchUtility={enterSearchUtility}
        secondaryLoading={secondaryLoading}
        currentResultsArr={currentResultsArr}
        setFocusBar={setFocusBar}
      />
      <ContainerResults
        currentResultsArr={currentResultsArr}
        currentSel={currentSel}
        setCurrentSel={setCurrentSel}
        currentSelArr={currentSelArr}
        breadcrumbQuery={breadcrumbQuery}
        focusBar={focusBar}
        JSONloading={JSONloading}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageCount={pageCount}
      />
      {searchType !== searchMode[0] && 
        <Box display='flex'>
          <div style={{display: 'flex'}}>
            <Button variant='contained' disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} style={{width: '100px', marginTop: '10px'}}>Previous &lt; page</Button>
            <Button variant='contained' disabled={currentPage === pageCount} onClick={() => setCurrentPage(currentPage + 1)} style={{width: '100px', marginTop: '10px'}}>Next page &gt;</Button>
          </div>
        </Box>}
    </Container>
  )
}

export default Home;