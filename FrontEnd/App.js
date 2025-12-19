import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SearchBar from './app/components/SearchBar';
import Screen from './app/components/screen';

export default function App() {
  return (
    <Screen>
<View style={styles.container}>
      
      {/* The SearchBar floats independently */}
      <SearchBar />
    </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundText: {
    marginTop: 300,
    textAlign: 'center',
    color: '#ccc',
    fontSize: 18
  }
});