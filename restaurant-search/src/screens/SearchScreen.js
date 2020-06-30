import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import SearchBar from '../components/SearchBar';

import useResults from '../hooks/useResults';
import ResultsList from '../components/ResultsList';

const SearchScreen = () => {
  const [term, setTerm] = useState('');
  // extracting the data from another component to make the api request
  const [searchApi, results, errorMessage] = useResults();
  // extracting the data from another component to make the api request

  const filterResultsByPrice = (price) => {
    // price === '$' || '$$' || '$$$
    return results.filter(result => {
      return result.price === price
    })
  };

  return (
    // by defining a placeholder, we can not put a wrapping View to render
    // multiple components
    <>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)}
      />
      { errorMessage ? <Text>{errorMessage}</Text> : null }
      <ScrollView>
        <ResultsList
          results={filterResultsByPrice('$')}
          title="Cost Effective"
        />
        <ResultsList
          results={filterResultsByPrice('$$')}
          title="Bit Pricier"
        />
        <ResultsList
          results={filterResultsByPrice('$$$')}
          title="Big Spender"
        />
      </ScrollView>
    </>
  )
};

const styles = StyleSheet.create({

});

export default SearchScreen;
