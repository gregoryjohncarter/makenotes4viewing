import React, { useState, useEffect, useCallback } from 'react';

import FormSearch from '../components/FormSearch.js';
import ContainerResults from '../components/ContainerResults.js';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Icon from '@mui/material/Icon';
import { createTheme } from '@mui/material/styles';

const Home = () => {
  const [searchMode] = useState([
    {desc: 'Search by title', disabledInput: false},
    {desc: 'Search by genre', disabledInput: false}, 
    {desc: 'Search top 100 (TV)', disabledInput: true}, 
    {desc: 'Search top 100 (Film)', disabledInput: true}
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [breadcrumbQuery, setBreadcrumbQuery] = useState('');
  const [searchType, setSearchType] = useState(searchMode[0]);
  const [JSONloading, setJSONloading] = useState(false);

  const [currentResultsArr, setCurrentResultsArr] = useState(false);
  const [currentSel, setCurrentSel] = useState([]);
  const [currentSelArr, setCurrentSelArr] = useState(false);
  const [latentResultsArr, setLatentResultsArr] = useState([]);

  const [secondaryLoading, setSecondaryLoading] = useState(false);

  useEffect(() => {
    if (secondaryLoading) {
      setSecondaryLoading(false);
    }
  }, [currentResultsArr, latentResultsArr]);

  const [detailDisplay, setDetailDisplay] = useState('init');

  useEffect(() => {
    if (currentResultsArr.length > 0) {
      if (detailDisplay === 'init') {
        setDetailDisplay('home');
        setTimeout(() => {
          setDetailDisplay('search');
        }, 1250);
      } else {
        setDetailDisplay('search');
      }
    }
  }, [currentResultsArr]);

  const [currentPage, setCurrentPage] = useState(false);

  useEffect(() => {
    if (JSONloading) {
      setTimeout(() => {
        setJSONloading(false);
      }, 2200);
    }
  }, [JSONloading]);

  const [focusBar, setFocusBar] = useState(false);

  useEffect(() => {
    if (focusBar === 'toggle') {
      setTimeout(() => {
        setFocusBar('');
      }, 1000);
    }
  }, [focusBar])

  const [genresAmt, setGenresAmt] = useState(0);
  const [genresArr, setGenresArr] = useState([]);

  const handleSearchUtility = (e, searchQuery, searchType, loading) => {
    e.stopPropagation();
    e.preventDefault();

    const enterSearchUtility = (searchQuery, searchType, loading) => {
      if (loading) {
        return
      }
      if (searchQuery.trim().length || (searchType === searchMode[2] && searchQuery.length) || (searchType === searchMode[3] && searchQuery.length)) {
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
          setCurrentPage(1);
          setJSONloading(true);
          setCurrentSelArr(false);
          searchByInput(searchQuery);
          setCurrentSel('single-request');
        } else {
          return
        }
      } else if (searchType === searchMode[1]) {
        if (searchQuery) {
          const searchByLabel = async (searchQuery) => {
            let apiUrlGenre = "https://imdb-api.com/API/AdvancedSearch/" + process.env.REACT_APP_REQUESTACCKEY + "/?genres=" + searchQuery + "&count=150";
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
          setCurrentPage(1);
          setJSONloading(true);
          setCurrentSelArr(false);
          searchByLabel(searchQuery);
        } else {
          return
        }
      } else if (searchType === searchMode[2]) {
        if (searchQuery) {
          let filmString = 'TVs';
          searchQuery += filmString;
          const searchByChartT = async (searchQuery) => {
            let apiMostPopular = "https://imdb-api.com/en/API/" + searchQuery + "/" + process.env.REACT_APP_REQUESTACCKEY;
            try {
              let nearAcclaimResults = await fetch(apiMostPopular);
              let dataResults = await nearAcclaimResults.json();
              if (dataResults.errorMessage === '') {
                let transferResults = (data) => {
                  setLatentResultsArr(data.items);
                }
                setBreadcrumbQuery('Top 100 - TV');
                transferResults(dataResults);
              } else {
                setBreadcrumbQuery('Error from request');
                setCurrentResultsArr([]);
                return
              }
            } catch (error) {
              console.log(error);
              setBreadcrumbQuery('Request failed');
              setCurrentResultsArr([]);
            }
          }
          setCurrentPage(1);
          setJSONloading(true);
          setCurrentSelArr(false);
          searchByChartT(searchQuery);
        }
      } else {
        if (searchQuery) {
          let filmString = 'Movies';
          searchQuery += filmString;
          const searchByChartF = async (searchQuery) => {
            let apiMostPopular = "https://imdb-api.com/en/API/" + searchQuery + "/" + process.env.REACT_APP_REQUESTACCKEY;
            try {
              let nearAcclaimResults = await fetch(apiMostPopular);
              let dataResults = await nearAcclaimResults.json();
              if (dataResults.errorMessage === '') {
                let transferResults = (data) => {
                  setLatentResultsArr(data.items);
                }
                setBreadcrumbQuery('Top 100 - Film');
                transferResults(dataResults);
              } else {
                setBreadcrumbQuery('Error from request');
                setCurrentResultsArr([]);
                return
              }
            } catch (error) {
              console.log(error);
              setBreadcrumbQuery('Request failed');
              setCurrentResultsArr([]);
            }
          }
          setCurrentPage(1);
          setJSONloading(true);
          setCurrentSelArr(false);
          searchByChartF(searchQuery);
        }
      }
      setSearchQuery('');
    }
    enterSearchUtility(searchQuery, searchType, loading);
  }
  
  useEffect(() => {
    if (currentResultsArr.length > 0) {
      if (currentSelArr) {
        setTimeout(() => {
          setDetailDisplay('detail');
          setSecondaryLoading(false);
        }, 1750);
      } else {
        setDetailDisplay('search');
      }
    }
  }, [currentSelArr]);

  const requestSelectionInfo = useCallback(async (idIMDB) => {
    if (secondaryLoading) {
      return
    }
    setSecondaryLoading(true);
    setDetailDisplay(idIMDB);
    var apiUrlSelection = "https://www.omdbapi.com/?apikey=" + process.env.REACT_APP_REQUESTHOMEKEY + "&i=" + idIMDB + "&plot=full";
    try {
      let selectionRequest = await fetch(apiUrlSelection);
      let dataResults = await selectionRequest.json();
      let transferResults = (data) => {
        setCurrentSelArr(data);
      }
      transferResults(dataResults);
    } catch (error) {
      console.log(error);
      setBreadcrumbQuery('Request failed');
    }
  }, [setBreadcrumbQuery, setDetailDisplay, setCurrentSelArr, secondaryLoading, setSecondaryLoading]);

  const [pageCount, setPageCount] = useState(false);

  useEffect(() => {
    setCurrentSelArr(false);
    setGenresArr([]);
    setGenresAmt(0);
    setCurrentSel('pages-request');
    if (latentResultsArr.length < 30) {
      setPageCount(1);
      setCurrentResultsArr(latentResultsArr);
    } else {
      if (latentResultsArr.length % 30 === 0) {
        setPageCount(latentResultsArr.length / 30);
      } else {
        setPageCount((Math.floor(latentResultsArr.length / 30)) + 1);
      }
      setCurrentResultsArr(latentResultsArr.slice(0, 30));
    }
  }, [latentResultsArr]);

  useEffect(() => {
    if (currentSel !== 'single-request') {
      if (latentResultsArr.length) {
        let left = 0;
        let right = 30;
        
        right = currentPage * right;
        left = right - 30;
        let newSelection = latentResultsArr.slice(left, right);
        setCurrentResultsArr(newSelection);
      }
    }
  }, [currentPage]);

  const theme = createTheme({
    palette: {
      neutral: {
        main: '#64748B',
        contrastText: '#fff',
      },
      active: { 
        main: '#6b90ba',
        contrastText: '#fff',
      }
    },
  });

  return (
    <Container maxWidth='md' style={{marginBottom: '25px'}}>
      <FormSearch 
        searchType={searchType}
        setSearchType={setSearchType}
        searchMode={searchMode}
        JSONloading={JSONloading} 
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
        handleSearchUtility={handleSearchUtility}
        secondaryLoading={secondaryLoading}
        currentResultsArr={currentResultsArr}
        setFocusBar={setFocusBar}
        genresAmt={genresAmt}
        setGenresAmt={setGenresAmt}
        genresArr={genresArr}
        setGenresArr={setGenresArr}
      />
      <ContainerResults
        currentResultsArr={currentResultsArr}
        currentSel={currentSel}
        setCurrentSel={setCurrentSel}
        currentSelArr={currentSelArr}
        setCurrentSelArr={setCurrentSelArr}
        breadcrumbQuery={breadcrumbQuery}
        focusBar={focusBar}
        JSONloading={JSONloading}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageCount={pageCount}
        secondaryLoading={secondaryLoading}
        requestSelectionInfo={requestSelectionInfo}
        detailDisplay={detailDisplay}
        setDetailDisplay={setDetailDisplay}
      />
      {latentResultsArr.length && currentSel === 'pages-request' && pageCount > 1 && !currentSelArr ?
        <Box display='flex' justifyContent='center'>
          <div style={{display: 'flex'}}>
            <Button theme={theme} variant='contained' color={currentPage === 1 ? 'neutral' : 'active'} onClick={currentPage === 1 ? () => console.log('') : () => setCurrentPage(currentPage - 1)} style={{width: '65px', marginTop: '10px'}}><Icon>navigate_before</Icon></Button>
            <h2 style={{paddingTop: '20px', height: '40px', width: '65px', textAlign: 'center', backgroundColor: 'darkgrey'}}>{(currentPage * 30 - 30) + 1} - {currentPage === pageCount ? ((latentResultsArr.length - ((currentPage - 1) * 30)) + ((currentPage - 1) * 30)) : currentPage * 30}</h2>
            <Button theme={theme} variant='contained' color={currentPage === pageCount ? 'neutral' : 'active'} onClick={currentPage === pageCount ? () => console.log('') : () => setCurrentPage(currentPage + 1)} style={{width: '65px', marginTop: '10px'}}><Icon>navigate_next</Icon></Button>
          </div>
        </Box> : <></>}
    </Container>
  )
}

export default Home;